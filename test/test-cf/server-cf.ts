import {KVStorage} from './../../src/kv-storage'
import {test} from './../test-unit'

export default { 
	async fetch(request: Request, env: Env): Promise<Response> { 

		const db = await KVStorage({
			runtime:'cloudflare',
			storageName:'storage',
			databaseBinding:env.D1
		})
		
		return new Response(await test(db)) 
	} 
}
