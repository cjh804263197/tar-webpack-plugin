import { Compiler } from 'webpack'
import tar from 'tar'
import path from 'path';
import rimraf from 'rimraf';
import chalk from 'chalk';

interface BaseOptions 
{
    action: 'create' | 'extract' | 'c' | 'x';
    fileList?: string[];
    delSource?: boolean;
}

type Options = (tar.CreateOptions | tar.ExtractOptions) & tar.FileOptions & BaseOptions

export default class TarWebpackPlugin {
    options: Options
  
    constructor(options: Options) {
      this.options = options
    }
  
    apply(compiler: Compiler) {
      compiler.hooks.afterEmit.tapPromise('TarWebpackPlugin', () => new Promise((resolve, reject) => {
          console.log(chalk.blue('[TarWebpackPlugin] was start'))
          const { action, fileList, ...others } = this.options
          if (action === 'c' || action === 'create')
          {
              tar.c({...others}, fileList, (err?: Error) =>
              {
                  err ? reject(err) : resolve(true)
              })
          }
          else if (action === 'x' || action === 'extract')
          {
            return tar.x({...others}, fileList, (err?: Error) =>
            {
                err ? reject(err) : resolve(true)
            })
          }
          else
          {
            reject(new Error(`${action} is unsupported action`))
          }
      }).then(_ =>
        {
          const { action, fileList, cwd, file, delSource } = this.options
          if (!delSource) return console.log(chalk.blue('[TarWebpackPlugin] was end'))
          if (action === 'c' || action === 'create')
          {
            if (Array.isArray(fileList))
            {
              for (const file of fileList)
              {
                const filepath = path.resolve(cwd || process.cwd(), file)
                rimraf.sync(filepath)
              }
            }
            else
            {
              const filepath = path.resolve(cwd || process.cwd(), file)
              rimraf.sync(filepath)
            }
          }
          console.log(chalk.blue('[TarWebpackPlugin] was end'))
        }))
    }
  }