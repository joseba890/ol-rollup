import cjs from '@rollup/plugin-commonjs';
import node from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'main.js',
	output: [
		{
			file: 'dist/bundle.js',
			format: 'iife',
			sourcemap: true,
			inlineDynamicImports: true,
		},
	],
	plugins: [
		node({ browser: true }),
		cjs(),
		css(),
		serve('dist'),
		production && terser({ maxWorkers: 8 }),
	],
};
