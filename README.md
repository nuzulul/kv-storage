# kv-storage
Create data storage that uses a simple key-value method for Node, Browser, Deno, Bun, Cloudflare Workers

## Features

* ✅ 0 Dependencies
* ✅ NoSQL Database
* ✅ Lightwight

## Demo

[https://codesandbox.io/p/devbox/simple-kv-storage-pzr9ld](https://codesandbox.io/p/devbox/simple-kv-storage-pzr9ld)

## Installation

```javascript
npm install kv-storage
```

## Initialization

```javascript
//Node CommonJS import style
const {KVStorage} = require('kv-storage')

//Node ES Modules import style
import {KVStorage} from 'kv-storage'

//Deno import style
import {KVStorage} from 'npm:kv-storage'

const db = await KVStorage({
	runtime:'node', //node | deno 
	storageName:'storage'
})
```

## Example Usage

```javascript
//Node CommonJS example
const {KVStorage} = require('kv-storage')

void async function main() {
	const db = await KVStorage({
		runtime:'node',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
}()
```

```javascript
//Node ES Modules example
import {KVStorage} from 'kv-storage'

void async function main() {
	const db = await KVStorage({
		runtime:'node',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
}()
```

```javascript
//Deno example
import {KVStorage} from 'npm:kv-storage'

void async function main() {
	const db = await KVStorage({
		runtime:'node',
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
	console.log(await db.has('key'))
}()
```

## API Reference

### Documentation

[https://nuzulul.github.io/kv-storage/](https://nuzulul.github.io/kv-storage/)

### Init Parameters

```javascript
await init({
	runtime?:string,
	storageName?:string 
})
```
```
runtime =  Javascript runtime 
storageName = Alphanumeric name of storage
```
Supported runtime :
- [x] `node`
- [x] `deno` need `--allow-read --allow-write`
- [ ] `browser`
- [ ] `bun`
- [ ] `cloudflare-workers`
- [ ] `memory`
### Write key-value pairs

```javascript
await put(key:string,value:string)
```
The put() method returns a Promise that you should await on to verify a successful update which resolves with:
* true = Update successful
* false = Update failed
### Read key-value pairs

```javascript
await get(key:string)
```
The get() method returns a promise you can await on to get the value which resolves with:
* data = Get data successful
* false = Get data failed

### List keys

```javascript
await list()
```
Use a list operation to view all the keys that live in a given storage, return a promise which resolves with an object consist of:
* keys = Array of keys
* complete = True if operation complete

### Delete key-value pairs

```javascript
await delete(key:string)
```

To delete a key-value pair, call the delete() method, return a promise which resolves with:
* true = Delete successful
* false = Delete failed

### Has key-value pairs

```javascript
await has(key:string)
```

Has key-value pairs method, return a promise which resolves with:
* true = Key exist
* false = Key does not exist

## License

MIT