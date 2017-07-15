/* jshint esversion: 6, asi: true */
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'

import butternut from 'rollup-plugin-butternut'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

import re from 'rollup-plugin-re'
import gitVersion from 'rollup-plugin-git-version'

const plugins = [
  alias({
    vue$: 'vue/dist/vue.common.js'
  }),
  vue({
    css: './public/assets/css/app.css'
  }),
  buble({
    objectAssign: 'Object.assign'
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  }),
    replace({
        //include: 'minimatch or array of minimatch (all files processed if omitted)',
        //exclude: 'same deal',
        patterns: [
            //{
                ////include: 'include & exclude available for rule scope also',
                ////exclude: '',
                ////match: /re goes here/,
                ////test: 'not sure of difference in effect between this and match',
                ////replace: 'what gets replaced in'
                ////text: 'exports = "content"', // i don't know what this does
                ////file: './filename.js' // replace with given relative file?
                ////transform: (code, id) {} // return value is replacement
            //},

        ],
        //defines: {},
        replaces: {
            $API_ENDPOINT: "api-endpoint"
        },
    }),
  commonjs(),
  nodeGlobals()
]

const config = {
  entry: './src/app.js',
  dest: './public/assets/js/app.js',
  format: 'umd',
  sourceMap: true,
  plugins: plugins
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
  config.sourceMap = false
  config.plugins.push(butternut)
}

if (isDevelopment) {
  config.plugins.push(livereload())
  config.plugins.push(serve({
    contentBase: './public/',
    port: 8080,
    open: true
  }))
}

export default config
