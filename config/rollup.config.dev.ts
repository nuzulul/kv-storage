import typescript from '@rollup/plugin-typescript';

export default [
{
  input: 'src/kv-storage.ts',
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
  plugins: [typescript()]
}
]