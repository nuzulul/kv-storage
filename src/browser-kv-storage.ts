interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

export class BrowserKVStorage{

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
