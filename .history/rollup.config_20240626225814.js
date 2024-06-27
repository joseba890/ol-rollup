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
import json from '@rollup/plugin-json';
// import bundleStats from 'rollup-plugin-bundle-stats';

const production = process.env.ROLLUP_WATCH;
// const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'main.js',
	output: [
		{
			file: 'bundle.js',
			format: 'cjs',
			sourcemap: true,
			inlineDynamicImports: false,
		},
		{
			file: 'bundle.min.js',
			format: 'iife',
			name: 'version',
			plugins: [terser()],
		},
	],
	plugins: [
		node({ browser: true }),
		cjs({}),
		css({ minify: true }),
		serve({ minify: true, open: false }),
		production && terser({ maxWorkers: 4 }),
		summary({ showGzippedSize: true }),
		gzipPlugin(),
		json(),
		// bundleStats(),
	],
};
