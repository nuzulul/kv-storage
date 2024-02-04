import {KVStorage} from './../src/kv-storage'
import {test} from './test-unit'

void async function main() {

	const db = await KVStorage({
		runtime:'node',
		storageName:'storage'
	}) 
	
	console.log(await test(db))
	
}()
