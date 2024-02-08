import typescript from '@rollup/plugin-typescript';

export default [
{
  input: 'test/umd.ts',
  output: [
    {
      file: 'dist/umd/kv-storage.js',
      format: 'umd',
      name: 'KVStorage',
	  inlineDynamicImports:true,
    }
  ],
  plugins: [typescript()],
}
]