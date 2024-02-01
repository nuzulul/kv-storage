import typescript from '@rollup/plugin-typescript';

export default [
{
  input: 'src/kv-storage.ts',
  exclude:["test","src","**/*.d.ts"],
  output: [
    {
      file: 'public/umd/kv-storage.umd.js',
      format: 'umd',
      name: 'kvstorage',
	  inlineDynamicImports:true,
    },
    {
      file: 'public/umd/kv-storage.ems.js',
      format: 'es',
      //name: 'kvstorage',
	  inlineDynamicImports:true,
    },
  ],
  plugins: [typescript()],
},
{
  input: 'src/browser-kv-storage.ts',
  exclude:["test","src","**/*.d.ts"],
  output: [
    {
      file: 'public/umd/browser-kv-storage.js',
      format: 'es',
    },
  ],
  plugins: [typescript()],
}
]