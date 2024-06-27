/**
 * @type {import('rollup').RollupOptions}
 */

import cjs from '@rollup/plugin-commonjs';
import node from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
import serve from 'rollup-plugin-serve';
import summary from 'rollup-plugin-summary';
import gzipPlugin from 'rollup-plugin-gzip';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'main.js',
	output: [
		{
			file: 'bundle.js',
			format: 'iife',
			sourcemap: true,
			inlineDynamicImports: true,
		},
	],
	plugins: [
		node({ browser: true }),
		cjs(),
		css({ minify: true }),
		serve({ minify: true }),
		production && terser({ maxWorkers: 8 }),
		//summary({ showGzippedSize: true }),
		gzipPlugin({
			customCompression: (content) => brotliPromise(Buffer.from(content)),
			fileName: '.br',
		}),
	],
};
