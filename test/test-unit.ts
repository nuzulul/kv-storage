export async function test(db:any){
		let data:Array<any> = []
		let obj:any = {}
		
		//test for create new kv
		obj={put:await db.put('yes','no'),expected: true}
		if(obj.put == obj.expected){obj.passed = true}else{obj.passed = false}
		data.push(obj)

		//test for get existed kv
		obj={get:await db.get('yes'),expected: 'no'}
		if(obj.get == obj.expected){obj.passed = true}else{obj.passed = false}		
		data.push(obj)

		//test for get non existed kv
		obj={get:await db.get('yesyes'),expected: false}
		if(obj.get == obj.expected){obj.passed = true}else{obj.passed = false}			
		data.push(obj)

		//test for check existed kv
		obj={has:await db.has('yes'),expected: true}
		if(obj.has == obj.expected){obj.passed = true}else{obj.passed = false}			
		data.push(obj)

		//test for check non existed kv
		obj={has:await db.has('yesyes'),expected: false}
		if(obj.has == obj.expected){obj.passed = true}else{obj.passed = false}			
		data.push(obj)

		//test list all kv
		obj={list:await db.list(),expected:{keys:["yes"],complete:true}}
		if(JSON.stringify(obj.list) == JSON.stringify(obj.expected)){obj.passed = true}else{obj.passed = false}		
		data.push(obj)

		//test delete existed kv
		obj={delete:await db.delete('yes'),expected: true}
		if(obj.delete == obj.expected){obj.passed = true}else{obj.passed = false}		
		data.push(obj)

		//test delete non existed kv
		obj={delete:await db.delete('yesyes'),expected: true}
		if(obj.delete == obj.expected){obj.passed = true}else{obj.passed = false}				
		data.push(obj)
		
		return JSON.stringify(data, null, 2)
}
