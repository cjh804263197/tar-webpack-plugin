import { Compiler } from 'webpack'
import * as tar from 'tar'

interface BaseOptions 
{
    action: 'create' | 'extract' | 'c' | 'x';
    fileList?: string[];
}

type Options = (tar.CreateOptions | tar.ExtractOptions) & tar.FileOptions & BaseOptions

export default class TarWebpackPlugin {
    options: Options
  
    constructor(options: Options) {
      this.options = options
    }
  
    apply(compiler: Compiler) {
      compiler.hooks.afterEmit.tapPromise('TarWebpackPlugin', () => new Promise((resolve, reject) => {
          const { action, fileList, ...others } = this.options
          if (action === 'c' || action === 'create')
          {
              tar.c({...others}, fileList, (err?: Error) =>
              {
                  err ? reject(err) : resolve()
              })
          }
          else
          {
            return tar.x({...others}, fileList, (err?: Error) =>
            {
                err ? reject(err) : resolve()
            })
          }
      }))
    }
  }