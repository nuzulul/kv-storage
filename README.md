# kv-storage
💾 Create data storage that uses a simple key-value method for Node, Browser, Deno, Bun, Cloudflare Workers

[![NPM](https://nodei.co/npm/kv-storage.png?mini=true)](https://www.npmjs.com/package/kv-storage)
[![npm version](https://badge.fury.io/js/kv-storage.svg)](https://www.npmjs.com/package/kv-storage)

[Demo](https://codesandbox.io/p/devbox/simple-kv-storage-pzr9ld)

## Features

* ✅ 0 Dependencies
* ✅ NoSQL Database
* ✅ Lightwight

## Installation

NPM (node, browser, deno, bun, cloudflare)
```javascript
npm install kv-storage
```
CDN (browser)
```javascript
<script src="https://cdn.jsdelivr.net/npm/kv-storage@0.0.9/dist/umd/kv-storage.js"></script>
```

## Initialization

NPM

```javascript
//Node & Bun CommonJS import style
const {KVStorage} = require('kv-storage')

//Node, Browser, Deno, Bun & Cloudflare ES Modules import style
import {KVStorage} from 'kv-storage'

//Deno import style
import {KVStorage} from 'npm:kv-storage@0.0.9'

//Node, Browser, Deno & Bun Initialization
const db = await KVStorage({
	runtime:'node', //node | browser | deno | bun
	storageName:'storage'
})

//Cloudflare Initialization
const db = await KVStorage({
	runtime:'cloudflare',
	storageName:'storage', //Cloudflare D1 database name
	databaseBinding:env.D1 //Cloudflare D1 database binding env
})
```
CDN
```javascript
//Browser initialization if using CDN

const db = await KVStorage({
	runtime:'browser',
	storageName:'storage'
})
```

## Example Usage

```javascript
//Node & Bun CommonJS example
const {KVStorage} = require('kv-storage')

void async function main() {
	const db = await KVStorage({
		runtime:'node',//node | bun
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
	console.log(await db.clear())
}()
```

```javascript
//Node, Deno & Bun ES Modules example
import {KVStorage} from 'kv-storage'

void async function main() {
	const db = await KVStorage({
		runtime:'node',//node | deno | bun
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
	console.log(await db.clear())
}()
```
```javascript
<script src="https://cdn.jsdelivr.net/npm/kv-storage@0.0.9/dist/umd/kv-storage.js"></script>
<script>
//Browser using CDN example

void async function main() {
	const db = await KVStorage({
		runtime:'browser',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
	console.log(await db.clear())
}()
</script>
```

```javascript
<script type="module">
//Browser ES Modules example
import {KVStorage} from 'https://cdn.jsdelivr.net/npm/kv-storage@0.0.9/dist/mjs/kv-storage.js'

void async function main() {
	const db = await KVStorage({
		runtime:'browser',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
	console.log(await db.clear())
}()
</script>
```
```javascript
//Deno example
import {KVStorage} from 'npm:kv-storage@0.0.9'

void async function main() {
	const db = await KVStorage({
		runtime:'deno',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
	console.log(await db.clear())
}()
```

```javascript
//Cloudflare workers example
import {KVStorage} from 'kv-storage'

export default { 
	async fetch(request, env) { 

		const db = await KVStorage({
			runtime:'cloudflare',
			storageName:'storage', //Cloudflare D1 database name
			databaseBinding:env.D1 //Cloudflare D1 database binding env
		})
		
		let data = []		
		data.push(await db.put('key','value'))
		data.push(await db.get('key'))
		data.push(await db.has('key'))
		data.push(await db.list())
		data.push(await db.delete('key'))
		data.push(await db.clear())
		return new Response(JSON.stringify(data, null, 2)) 
	} 
}
```

## API Reference

### Documentation

[https://nuzulul.github.io/kv-storage/](https://nuzulul.github.io/kv-storage/)

### Initialization parameters

```javascript
await init({
	runtime,
	storageName,
	databaseBinding
})
```
```
runtime =  Javascript runtime 
storageName = Alphanumeric storage name
databaseBinding = Cloudflare only D1 database binding env
```
Supported runtime :
- [x] `node` use File System
- [x] `deno` use File System need `--allow-read --allow-write`
- [x] `browser` use [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [x] `bun` use File System
- [x] `cloudflare` workers use D1 Database [docs](https://developers.cloudflare.com/d1/get-started/#4-bind-your-worker-to-your-d1-database) example [wrangler.toml](https://github.com/nuzulul/kv-storage/blob/main/wrangler.toml)

### Write key-value pairs

```javascript
await put(key,value)
```
The put() method returns a Promise that you should await on to verify a successful update, resolve to `true` or `false`
### Read key-value pairs

```javascript
await get(key)
```
The get() method returns a promise you can await on to get the value, resolve to the value or `false`

### List keys

```javascript
await list()
```
Use a list operation to view all the keys that live in a given storage, return a promise which resolves with an object consist of:
* keys = Array of keys
* complete = true if operation complete

### Delete key-value pairs

```javascript
await delete(key)
```

To delete a key-value pair, call the delete() method, resolve to `true` or `false`

### Has key-value pairs

```javascript
await has(key)
```
To check for the existence of a key, resolve to `true` or `false`

### Clear storage

```javascript
await clear()
```
To delete all key value pairs, resolve to `true` or `false`


## License

[MIT](https://github.com/nuzulul/kv-storage/blob/main/LICENSE)