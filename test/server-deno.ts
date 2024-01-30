import {KVStorage} from './../src/kv-storage.ts'

void async function main() {

	const db = await KVStorage({
		runtime:'deno',
		storageName:'storage'
	})
	
	console.log(await db.put('yes','no'))
	console.log(await db.get('yes'))
	console.log(await db.delete('yes'))
	console.log(await db.get('yes'))
	console.log(await db.put('yes1','no1'))
	console.log(await db.list())
	console.log(await db.has('key'))
}()
