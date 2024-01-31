import fs from 'fs'

export class NodeKVStorage{

	_storageDir:string
	
	private constructor({
		storageDir
	}:{

		storageDir:string
	}){

		this._storageDir = storageDir
	}

	private isAlphanumeric(str:string) {
	  return /^[a-zA-Z0-9]+$/.test(str);
	}
	
	private showError(msg:string = 'Error'){
		throw new Error(msg)
	}
	
	public static async init({
		dataDirName = "data",
		storageName
	}:{
		dataDirName?:string,
		storageName:string
	}): Promise<NodeKVStorage>{
	
		function isAlphanumeric(str:string) {
		  return /^[a-zA-Z0-9]+$/.test(str);
		}
		
		function showError(msg:string = 'Error'){
			throw new Error(msg)
		}

		async function makeDir(dir:string): Promise<boolean>{
			return new Promise((resolve) => {
				fs.stat(dir, (err)=>{
					if (err) {
						fs.mkdir(dir, { recursive: true }, (err,path) => {
							if (err) {throw err}else{resolve(true)}
						})
					}else{resolve(true)}
				})
			})
		}

		if(!isAlphanumeric(dataDirName))showError('dataDirName must be Alphanumeric')
		if(!isAlphanumeric(storageName))showError('storageName must be Alphanumeric')
		let _dataDirName = "./"+dataDirName
		let storageDir = _dataDirName+'/'+storageName
		await makeDir(storageDir)
		return new NodeKVStorage({storageDir})
	}
	
	public async put(key:string,value:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			const keyFilePath = this._storageDir+'/'+key
			fs.writeFile(keyFilePath, value,(err)=>{
				if (err) {resolve(false)}else{resolve(true)}
			});
		})
	}
	
	public async get(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			const keyFilePath = this._storageDir+'/'+key


				  fs.readFile(keyFilePath,(err,data)=>{
					if (err) {resolve(false)}else{resolve(data.toString('utf8', 0, data.length))}
				  });
				
		})
	}

	public async delete(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			const keyFilePath = this._storageDir+'/'+key
			
				  fs.unlink(keyFilePath,(err)=>{
					if (err) {resolve(false)}else{resolve(true)}
				  });
				
		})
	}

	public async has(key:string){
		return new Promise((resolve) => {
			if(!this.isAlphanumeric(key))this.showError('Key must be Alphanumeric')
			const keyFilePath = this._storageDir+'/'+key
			
				  fs.stat(keyFilePath, (err)=>{
					if (err) {resolve(false)}else{resolve(true)}
				  });
				
		})
	}
	
	public async list(){
		return new Promise((resolve) => {
			  fs.readdir(this._storageDir,(err,files)=>{
				if (err) {resolve(false)}else{
					let result = {
						keys:files,
						complete:true
					}
					resolve(result)
				}
			  });
		})
	}
}
