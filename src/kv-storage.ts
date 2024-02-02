export async function KVStorage({
	runtime = 'node',
	databaseName = 'kvstorage',
	storageName = 'storage',
	databaseBindings
	}:{
		runtime?:string,
		storageName?:string,
		databaseName?:string,
		databaseBindings?:any
	}): Promise<any> {

	function isAlphanumeric(str:string) {
	  return /^[a-zA-Z0-9]+$/.test(str);
	}
	
	function showError(msg:string = 'Error'){
		throw new Error(msg)
	}

	if(!isAlphanumeric(runtime))showError('Runtime must be Alphanumeric')
	if(!isAlphanumeric(databaseName))showError('storageName must be Alphanumeric')
	if(!isAlphanumeric(storageName))showError('storageName must be Alphanumeric')

	switch(runtime.toLowerCase()){
		case 'node':
			let nodepkg = './node-kv-storage'
		    if(typeof caches !== "undefined" && typeof global === "undefined" && typeof window === "undefined")nodepkg = ''
			const runnode = await import(nodepkg)
			const dbnode = await runnode.NodeKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbnode
			break
		case 'deno':
			let denopkg = './deno-kv-storage.ts'
			const rundeno = await import(denopkg)
			const dbdeno = await rundeno.DenoKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbdeno
			break
		case 'bun':
			let bunpkg = './bun-kv-storage'
			const runbun = await import(bunpkg)
			const dbbun = await runbun.BunKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbbun
			break
		case 'browser':
			if(typeof window !== "undefined" && typeof window.document !== "undefined"){
				const dbbrowser = BrowserKVStorage.init({
					databaseName,
					storageName
				})
				return dbbrowser
			}
			break
		case 'cloudflare':
			if(typeof caches !== "undefined" && typeof global === "undefined" && typeof window === "undefined")console.log('cloudflare')
			const dbcloudflare = await CloudflareKVStorage.init({
				databaseBindings,
				storageName
			})
			return dbcloudflare
			break
		default:
			showError('Runtime unknown')
	}

}

class CloudflareKVStorage{

	private _storageName:string
	private _databaseBindings:any
	
	private constructor({
		databaseBindings,
		storageName
	}:{
		databaseBindings:any,
		storageName:string
	}){

		this._databaseBindings = databaseBindings
		this._storageName = storageName
	}

	private isAlphanumeric(str:string) {
	  return /^[a-zA-Z0-9]+$/.test(str);
	}
	
	private showError(msg:string = 'Error'){
		throw new Error(msg)
	}
	
	public static async init({
		databaseBindings,
		storageName,
	}:{
		databaseBindings:any,
		storageName:string
	}): Promise<CloudflareKVStorage>{
	
		function isAlphanumeric(str:string) {
		  return /^[a-zA-Z0-9]+$/.test(str);
		}
		
		function showError(msg:string = 'Error'){
			throw new Error(msg)
		}

		if(!isAlphanumeric(storageName))showError('storageName must be Alphanumeric')		
		
		const stmt = databaseBindings.prepare('CREATE TABLE IF NOT EXISTS '+storageName+' (key text NOT NULL PRIMARY KEY,value text NOT NULL)')
		
		const values = await stmt.run()
		
		return new CloudflareKVStorage({databaseBindings,storageName})
	}	
	
	public async put(key:string,value:string){
		
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			
			const stmt = this._databaseBindings.prepare('SELECT value FROM '+this._storageName+' WHERE key = ?1').bind(key);
			const values = await stmt.first()
			if(values == null){
			  const stmt = this._databaseBindings.prepare('INSERT INTO '+this._storageName+' (key,value) VALUES (?1,?2)').bind(key,value);
			  const values = await stmt.run()
			  return values.success
			}else{
			  const stmt = this._databaseBindings.prepare('UPDATE '+this._storageName+' SET value = ?2 WHERE key = ?1').bind(key,value);
			  const values = await stmt.run()
			  return values.success
			}

	}
	
	public async get(key:string){
		
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')

			const stmt = this._databaseBindings.prepare('SELECT value FROM '+this._storageName+' WHERE key = ?1').bind(key);
			const values = await stmt.first();
			let output
			if(values == null){
			  output = false
			} else {
			  output = values.value
			}
			return output				
		
	}

	public async delete(key:string){
		
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			
			const stmt = this._databaseBindings.prepare('DELETE FROM '+this._storageName+' WHERE key = ?1').bind(key);
			const values = await stmt.run();
			return values.success				
		
	}

	public async has(key:string){
		
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			
			const stmt = this._databaseBindings.prepare('SELECT value FROM '+this._storageName+' WHERE key = ?1').bind(key);
			const values = await stmt.run();
			let output
			if(values.results == 0){
			  output = false
			} else {
			  output = true
			}
			return output				
		
	}
	
	public async list(){
		
			const stmt = this._databaseBindings.prepare('SELECT key FROM '+this._storageName).bind();
			const values = await stmt.all();
			let output
			if(values.success){
				let keys:Array<string> = []
				values.results.forEach((obj:any)=>{
					keys.push(obj.key)
				})
				let result = {
					keys:keys,
					complete:true
				}

				output = result
			} else {
			  output = false
			}
			return output
	}
}

class BrowserKVStorage{

	private _databaseName:string
	private _storageName:string
	private _dbVersion:number
	private _iDB:IDBDatabase
	
	private constructor({
		databaseName,
		storageName,
		dbVersion,
		iDB
	}:{
		databaseName:string,
		storageName:string,
		dbVersion:number,
		iDB:IDBDatabase
	}){

		this._databaseName = databaseName
		this._storageName = storageName
		this._dbVersion = 1
		this._iDB = iDB
	}

	private isAlphanumeric(str:string) {
	  return /^[a-zA-Z0-9]+$/.test(str);
	}
	
	private showError(msg:string = 'Error'){
		throw new Error(msg)
	}
	
	public static async init({
		databaseName = "data",
		storageName,
	}:{
		databaseName?:string,
		storageName:string
	}): Promise<BrowserKVStorage>{
	
		function isAlphanumeric(str:string) {
		  return /^[a-zA-Z0-9]+$/.test(str);
		}
		
		function showError(msg:string = 'Error'){
			throw new Error(msg)
		}

		function indexedDBStuff () {
		  // Check for IndexedDB support
		  if (!('indexedDB' in window)) {
			// Can't use IndexedDB
			showError("This browser doesn't support IndexedDB")
			return
		  } else {
			// Do IndexedDB stuff here
		  }
		}

		// Run IndexedDB code
		indexedDBStuff()
		
		const dbVersion = 1

		if(!isAlphanumeric(databaseName))showError('dataDirName must be Alphanumeric')
		if(!isAlphanumeric(storageName))showError('storageName must be Alphanumeric')
		const createdb:Promise<IDBDatabase> = new Promise((resolve) => {
			let request = window.indexedDB.open(databaseName,dbVersion)
			request.onerror = function(){
				console.error("Error", request.error)
			}
			request.onsuccess = function(){
				let db = request.result
				resolve(db)
			}
			request.onupgradeneeded = function(event){
				let db = request.result
				if (!db.objectStoreNames.contains(storageName)) {
					db.createObjectStore(storageName, {keyPath: 'key'});
				}
			}
			request.onblocked = function(){
				console.error("Error, conflict")
			}
		})
		
		const iDB = await createdb
		
		return new BrowserKVStorage({databaseName,storageName,dbVersion,iDB})
	}	
	
	public async put(key:string,value:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			let transaction = this._iDB.transaction(this._storageName, "readwrite")
			let request = transaction.objectStore(this._storageName).put({key: key, value: value})
			request.onsuccess = function() {
				resolve(true)
			}
			request.onerror = function() {
				resolve(false)
			}
		})
	}
	
	public async get(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			let transaction = this._iDB.transaction(this._storageName, "readonly")
			let request = transaction.objectStore(this._storageName).get(key)
			request.onsuccess = function(event) {
				if(request.result != undefined){resolve(request.result.value)}else{resolve(false)}
			}
			request.onerror = function() {
				resolve(false)
			}
				
		})
	}

	public async delete(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			let transaction = this._iDB.transaction(this._storageName, "readwrite")
			let request = transaction.objectStore(this._storageName).delete(key)
			request.onsuccess = function(event) {
				resolve(true)
			}
			request.onerror = function() {
				resolve(false)
			}
				
		})
	}

	public async has(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			let transaction = this._iDB.transaction(this._storageName, "readonly")
			let request = transaction.objectStore(this._storageName).get(key)
			request.onsuccess = function(event) {
				if(request.result != undefined){resolve(true)}else{resolve(false)}
			}
			request.onerror = function() {
				resolve(false)
			}				
		})
	}
	
	public async list(){
		return new Promise((resolve) => {
			let transaction = this._iDB.transaction(this._storageName, "readonly")
			let request = transaction.objectStore(this._storageName).getAllKeys()
			request.onsuccess = function(event) {
				let result = {
					keys:request.result,
					complete:true
				}
				resolve(result)
			}
			request.onerror = function() {
				resolve(false)
			}
		})
	}
}
