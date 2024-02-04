import { spawnSync } from 'child_process'

const node = spawnSync("node", ["public/cjs/test/server-node.js"])

console.log("node = "+node.stdout.toString())

const bun = spawnSync("bun", ["run","test/server-node.ts"])

console.log("bun = "+bun.stdout.toString())

const deno = spawnSync("deno", ["run","--allow-read","--allow-write","test/test-deno/server-deno.ts"])

console.log("deno = "+deno.stdout.toString())



for(const [runtime,test] of [["node",node.stdout.toString()],["bun",bun.stdout.toString()],["deno",deno.stdout.toString()]]){
  
  let passed = "passed all"
  for(const input of JSON.parse(test)){
    if(input.passed = false)passed = "failed"
  }
  console.log(runtime+" = "+passed)
  
}
