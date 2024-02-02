import {KVStorage} from './../src/kv-storage'

void async function main() {

	const db = await KVStorage({
		runtime:'node',
		storageName:'storage'
	})
	
	console.log(await db.put('yes','no'))
	console.log(await db.get('yes'))
	console.log(await db.delete('yes'))
	console.log(await db.get('yes'))
	console.log(await db.put('yes1','no1'))
	console.log(await db.list())
	console.log(await db.has('key'))
	console.log(typeof window)
	if (typeof window !== "undefined" && typeof window.document !== "undefined") {
	  // browser
	}	
}()

/*const {KVStorage} = require('./../src/kv-storage')

void async function main() {
	const db = await KVStorage({
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
}()*/
