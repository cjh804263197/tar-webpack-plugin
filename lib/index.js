"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var tar = require("tar");
var TarWebpackPlugin = (function () {
    function TarWebpackPlugin(options) {
        this.options = options;
    }
    TarWebpackPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.done.tapPromise('TarWebpackPlugin', function () { return new Promise(function (resolve, reject) {
            var _a = _this.options, action = _a.action, fileList = _a.fileList, others = __rest(_a, ["action", "fileList"]);
            if (action === 'c' || action === 'create') {
                tar.c(__assign({}, others), fileList, function (err) {
                    err ? reject(err) : resolve();
                });
            }
            else {
                return tar.x(__assign({}, others), fileList, function (err) {
                    err ? reject(err) : resolve();
                });
            }
        }); });
    };
    return TarWebpackPlugin;
}());
exports["default"] = TarWebpackPlugin;
