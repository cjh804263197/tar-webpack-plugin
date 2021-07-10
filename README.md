# tar-webpack-plugin
[![npm version](https://badge.fury.io/js/tar-webpack-plugin.svg)](https://badge.fury.io/js/tar-webpack-plugin)

A webpack plugin to create an archive or extract an archive to disk, packaged from [node-tar](https://github.com/npm/node-tar)

### Install

```shell
npm install -d tar-webpack-plugin
or
yarn add -D tar-webpack-plugin
```
### Usage

```javascript
const TarWebpackPlugin = require('tar-webpack-plugin').default;

module.exports = {

  ...

  plugins: [
    new TarWebpackPlugin(options)
  ]
}
```
**options**
* `action` 
  * `'c' or 'create'` Create an archive
  * `'x' or 'extract'` Extract an archive to disk
* `delSource` whether to delete the source file
* `fileList` an array of paths
  * when `action='c' or 'create'`, The fileList is an array of paths to add to the tarball. Adding a directory also adds its children recursively.
  * when `action='x' or 'extract'`, The fileList is an array of paths to extract from the tarball. If no paths are provided, then all the entries are extracted.
* `file` a filename
  * when `action='c' or 'create'`, Write the tarball archive to the specified filename.
  * when `action='x' or 'extract'`, The archive file to extract. If not specified, then a Writable stream is returned where the archive data should be written.
* `cwd` working directory, efaults to process.cwd().
  * when `action='c' or 'create'`, The current working directory for creating the archive.
  * when `action='x' or 'extract'`, Extract files relative to the specified directory.
* `gzip` Set to any truthy value to create a gzipped archive, or an object with settings for zlib.Gzip(). **Only `action='c' or 'create'`**

More options can see [tar.create options](https://github.com/npm/node-tar#tarcoptions-filelist-callback-alias-tarcreate) and [tar.extract options](https://github.com/npm/node-tar#tarxoptions-filelist-callback-alias-tarextract)
### Examples

To replicate `tar czf my-tarball.tgz files folders`, you'd do:
```javascript
new TarWebpackPlugin({
  action: 'c',
  gzip: true,
  file: 'my-tarball.tgz',
  fileList: ['files', 'folders']
})
```

To replicate `tar xf my-tarball.tgz` you'd do:
```javascript
new TarWebpackPlugin({
  action: 'x',
  file: 'my-tarball.tgz'
})
```
