export async function KVStorage({
	runtime = 'node',
	databaseName = 'kvstorage',
	storageName = 'storage'
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
			const runnode = await import('./node-kv-storage')
			const dbnode = await runnode.NodeKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbnode
			break
		case 'deno':
			const rundeno = await import('./deno-kv-storage')
			const dbdeno = await rundeno.DenoKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbdeno
			break
		case 'bun':
			const runbun = await import('./bun-kv-storage')
			const dbbun = await runbun.BunKVStorage.init({
				dataDirName:databaseName,
				storageName
			})
			return dbbun
			break
		case 'browser':
			let browserpkg = './browser-kv-storage'
			if(window)browserpkg = './browser-kv-storage.js'
			const runbrowser = await import(browserpkg)
			//const runbrowser = await import('./browser-kv-storage')
			const dbbrowser = await runbrowser.BrowserKVStorage.init({
				databaseName,
				storageName
			})
			return dbbrowser
			break
		default:
			showError('Runtime unknown')
	}

}
