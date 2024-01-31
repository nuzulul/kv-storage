export async function KVStorage({
	runtime = 'node',
	storageName = 'storage',
	databaseName = 'kvstorage'
	}:{
		runtime?:string,
		storageName?:string,
		databaseName?:string
	}): Promise<any> {

	function isAlphanumeric(str:string) {
	  return /^[a-zA-Z0-9]+$/.test(str);
	}
	
	function showError(msg:string = 'Error'){
		throw new Error(msg)
	}

	if(!isAlphanumeric(runtime))showError('Runtime must be Alphanumeric')
	if(!isAlphanumeric(storageName))showError('storageName must be Alphanumeric')

	switch(runtime.toLowerCase()){
		case 'node':
			const runtime = await import('./node-kv-storage')
			const db = await runtime.NodeKVStorage.init({
				storageName,
				dataDirName:databaseName
			})
			return db
			break
		case 'deno':
			const rundeno = await import('./deno-kv-storage.ts')
			const dbdeno = await rundeno.DenoKVStorage.init({
				storageName,
				dataDirName:databaseName
			})
			return dbdeno
			break
		default:
			showError('Runtime unknown')
	}

}
