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
//ES Modules import style
import {KVStorage} from 'kv-storage'

	or

//CommonJS import style
const {KVStorage} = require('kv-storage')

const db = await KVStorage.init({
	runtime:'node',
	storageName:'storage'
})
```

## Example Usage

```javascript
import {KVStorage} from 'kv-storage'

void async function main() {
	const db = await KVStorage.init({
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
}()
```

```javascript
const {KVStorage} = require('kv-storage')

void async function main() {
	const db = await KVStorage.init({
		storageName:'storage'
	})
	
	console.log(await db.put('key','value'))
	console.log(await db.get('key'))
	console.log(await db.list())
	console.log(await db.delete('key'))
}()
```

## API Reference

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
- [ ] `browser`
- [ ] `deno`
- [ ] `bun`
- [ ] `cloudflare-workers`
- [ ] `memory`
### Write key-value pairs

```javascript
await put(key:string,value:string)
```
The put() method returns a Promise that you should await on to verify a successful update which resolves with a boolean :
* true = Update successful
* false = Update failed
### Read key-value pairs

```javascript
await get(key:string)
```
The get() method returns a promise you can await on to get the value which resolves with:
* null = The key is not found
* data = Get the value successful
* false = Get the value failed

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
* null = The key is not found
* true = Delete successful
* false = Delete failed

## License

MIT