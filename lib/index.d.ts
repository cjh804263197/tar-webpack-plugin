import { Compiler } from 'webpack';
import * as tar from 'tar';
interface BaseOptions {
    action: 'create' | 'extract' | 'c' | 'x';
    fileList?: string[];
}
declare type Options = (tar.CreateOptions | tar.ExtractOptions) & tar.FileOptions & BaseOptions;
export default class TarWebpackPlugin {
    options: Options;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
export {};
