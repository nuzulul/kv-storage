import typescript from '@rollup/plugin-typescript';

export default [
{
  input: 'test/umd.ts',
  output: [
    {
      file: 'public/umd/kv-storage.umd.js',
      format: 'umd',
      name: 'KVStorage',
	  inlineDynamicImports:true,
    },
    {
      file: 'public/umd/kv-storage.ems.js',
      format: 'es',
      //name: 'kvstorage',
	  inlineDynamicImports:true,
    },
  ],
  plugins: [typescript()]
}
]