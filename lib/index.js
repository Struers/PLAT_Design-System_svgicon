#!/usr/bin/env node
'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value)
                      }).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1]
                    return t[1]
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                    return this
                }),
            g
        )
        function verb(n) {
            return function(v) {
                return step([n, v])
            }
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.')
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t
                    if (((y = 0), t)) op = [op[0] & 2, t.value]
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op
                            break
                        case 4:
                            _.label++
                            return { value: op[1], done: false }
                        case 5:
                            _.label++
                            y = op[1]
                            op = [0]
                            continue
                        case 7:
                            op = _.ops.pop()
                            _.trys.pop()
                            continue
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0
                                continue
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1]
                                break
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1]
                                t = op
                                break
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2]
                                _.ops.push(op)
                                break
                            }
                            if (t[2]) _.ops.pop()
                            _.trys.pop()
                            continue
                    }
                    op = body.call(thisArg, _)
                } catch (e) {
                    op = [6, e]
                    y = 0
                } finally {
                    f = t = 0
                }
            if (op[0] & 5) throw op[1]
            return { value: op[0] ? op[1] : void 0, done: true }
        }
    }
exports.__esModule = true
var yargs = require('yargs')
var path = require('path')
var build_1 = require('./build')
var colors = require('colors')
var args = yargs
    .usage('Usage: $0 -s svgSourcePath -t targetPath')
    .demandOption(['s', 't'])
    .describe('s', 'Svg source path')
    .describe('t', 'Generate icon path')
    .describe('ext', "Generated file's extension")
    ['default']('ext', 'js')
    .describe('tpl', 'The template file which to generate icon files')
    .describe('export', 'Should the templates export icons individually')
    .describe('es6', 'Use ES6 module')
    .describe('svgo', 'Svgo config file')
    .help('help')
    .alias('h', 'help').argv
// svg file path
var sourcePath = path.isAbsolute(args.s)
    ? args.s
    : path.join(process.cwd(), args.s)
// generated icon path
var targetPath = path.isAbsolute(args.t)
    ? args.t
    : path.join(process.cwd(), args.t)
;(function() {
    return __awaiter(this, void 0, void 0, function() {
        var err_1
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3])
                    return [
                        4 /*yield*/,
                        build_1['default']({
                            sourcePath: sourcePath,
                            targetPath: targetPath,
                            tpl: args.tpl,
                            export: args['export'],
                            ext: args.ext,
                            es6: args.es6,
                            svgo: args.svgo
                        })
                    ]
                case 1:
                    _a.sent()
                    return [3 /*break*/, 3]
                case 2:
                    err_1 = _a.sent()
                    console.log(colors.red(err_1))
                    return [3 /*break*/, 3]
                case 3:
                    return [2 /*return*/]
            }
        })
    })
})()
