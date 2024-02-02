import {KVStorage} from './../../public/src/kv-storage'

export default { 
	async fetch(request: Request, env: Env): Promise<Response> { 

		const db = await KVStorage({
			runtime:'cloudflare',
			storageName:'storage',
			databaseBinding:env.D1
		})
		
		let data = []
		
		data.push({put:await db.put('yes','no')})
		
		data.push({get:await db.get('yes')})
		
		data.push({has:await db.has('yes')})
		
		data.push({put:await db.put('yes1','no1')})
		
		data.push({list:await db.list()})
		
		data.push({delete:await db.delete('yes')})
		
		data.push({list:await db.list()})
		
		data.push({delete:await db.delete('yes2')})
		
		data.push({get:await db.get('yes2')})
		
		return new Response(JSON.stringify(data, null, 2)) 
	} 
}
