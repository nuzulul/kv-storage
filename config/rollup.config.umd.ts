import typescript from '@rollup/plugin-typescript';

export default [
{
  input: 'src/kv-storage.ts',
  //exclude:["test","src","**/*.d.ts"],
  output: [
    {
      file: 'dist/umd/kv-storage.js',
      format: 'umd',
      name: 'kvstorage',
	  inlineDynamicImports:true,
    }
  ],
  plugins: [typescript()],
}
]