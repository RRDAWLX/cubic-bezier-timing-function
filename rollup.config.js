import { terser } from "rollup-plugin-terser"

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/cbtf.common.js',
      format: 'cjs',
      exports: 'auto',
      plugins: [
        terser(),
      ],
    },
    {
      file: 'dist/cbtf.esm.js',
      format: 'esm',
      plugins: [
        terser(),
      ],
    },
    // 测试用
    {
      file: 'test/cbtf.js',
      format: 'iife',
      name: 'cubicBezierTimingFunction',
      sourcemap: true,
    },
  ],
}