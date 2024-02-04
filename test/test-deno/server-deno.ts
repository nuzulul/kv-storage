	import {KVStorage} from './../../src/kv-storage.ts'
	import {test} from './../test-unit.ts'

	void async function main() {

		const db = await KVStorage({
			runtime:'deno',
			storageName:'storage'
		})
		
		console.log(await test(db)) 
	}()
