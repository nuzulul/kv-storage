import {KVStorage} from './../../public/src/kv-storage'

export default { 
	async fetch(request: Request, env: Env): Promise<Response> { 

		const db = await KVStorage({
			runtime:'cloudflare',
			storageName:'storage',
			databaseBindings:env.D1
		})
		
		let data = []
		
		data.push(await db.put('yes','no'))
		
		data.push(await db.get('yes'))
		
		data.push(await db.has('yes'))
		
		data.push(await db.put('yes1','no1'))
		
		data.push(await db.list())
		
		data.push(await db.delete('yes'))
		
		data.push(await db.list())
		
		return new Response(JSON.stringify(data, null, 2)) 
	} 
}
