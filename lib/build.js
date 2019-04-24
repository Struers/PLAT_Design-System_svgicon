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
var path = require('path')
var fs = require('fs-plus')
var colors = require('colors')
var glob = require('glob')
var Svgo = require('svgo')
var camelcase_1 = require('camelcase')
/**
 * build svg icon
 */
function build(options) {
    return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
            return [
                2 /*return*/,
                new Promise(function(resolve, reject) {
                    // delete previous icons
                    fs.removeSync(options.targetPath)
                    // the template file which to generate icon files
                    var tplPath = options.tpl
                        ? path.join(process.cwd(), options.tpl)
                        : path.join(
                              __dirname,
                              '../../default/icon.tpl' +
                                  (options.es6 ? '.es6' : '') +
                                  '.txt'
                          )
                    var tpl = fs.readFileSync(tplPath, 'utf8')
                    var svgo = new Svgo(getSvgoConfig(options.svgo))
                    glob(path.join(options.sourcePath, '**/*.svg'), function(
                        err,
                        files
                    ) {
                        var _this = this
                        if (err) {
                            reject(err)
                            return
                        }
                        files = files.map(function(f) {
                            return path.normalize(f)
                        })
                        files.forEach(function(filename, ix) {
                            return __awaiter(_this, void 0, void 0, function() {
                                var name,
                                    svgContent,
                                    filePath,
                                    result,
                                    data,
                                    viewBox,
                                    status,
                                    version,
                                    content
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            name = path
                                                .basename(filename)
                                                .split('.')[0]
                                            svgContent = fs.readFileSync(
                                                filename,
                                                'utf-8'
                                            )
                                            filePath = getFilePath(
                                                options.sourcePath,
                                                filename
                                            )
                                            return [
                                                4 /*yield*/,
                                                svgo.optimize(svgContent)
                                            ]
                                        case 1:
                                            result = _a.sent()
                                            data = result.data
                                                .replace(/<svg[^>]+>/gi, '')
                                                .replace(/<\/svg>/gi, '')
                                            viewBox = getViewBox(result)
                                            status = getStruersStatus(result)
                                            version = getStruersVersion(result)
                                            // add pid attr, for css
                                            data = addPid(data)
                                            // rename fill and stroke. (It can restroe in vue-svgicon)
                                            data = renameStyle(data)
                                            // replace element id, make sure ID is unique. fix #16
                                            data = changeId(
                                                data,
                                                filePath,
                                                name,
                                                options.idSP
                                            )
                                            // escape single quotes
                                            data = data.replace(/\'/g, "\\'")
                                            content = compile(tpl, {
                                                name: '' + filePath + name,
                                                width:
                                                    parseFloat(
                                                        result.info.width
                                                    ) || 16,
                                                height:
                                                    parseFloat(
                                                        result.info.height
                                                    ) || 16,
                                                viewBox: "'" + viewBox + "'",
                                                data: data,
                                                status: status,
                                                version: version
                                            })
                                            try {
                                                fs.writeFileSync(
                                                    path.join(
                                                        options.targetPath,
                                                        filePath,
                                                        name +
                                                            ('.' + options.ext)
                                                    ),
                                                    content,
                                                    'utf-8'
                                                )
                                                console.log(
                                                    colors.yellow(
                                                        'Generated icon: ' +
                                                            filePath +
                                                            name
                                                    )
                                                )
                                                if (ix === files.length - 1) {
                                                    generateIndex(
                                                        options,
                                                        files
                                                    )
                                                    resolve()
                                                }
                                            } catch (err) {
                                                reject(err)
                                            }
                                            return [2 /*return*/]
                                    }
                                })
                            })
                        })
                    })
                })
            ]
        })
    })
}
exports['default'] = build
// simple template compile
function compile(content, data) {
    return content.replace(/\${(\w+)}/gi, function(match, name) {
        return data[name] ? data[name] : ''
    })
}
// get file path by filename
function getFilePath(sourcePath, filename, subDir) {
    if (subDir === void 0) {
        subDir = ''
    }
    var filePath = filename
        .replace(path.resolve(sourcePath), '')
        .replace(path.basename(filename), '')
    if (subDir) {
        filePath = filePath.replace(subDir + path.sep, '')
    }
    if (/^[\/\\]/.test(filePath)) {
        filePath = filePath.substr(1)
    }
    return filePath.replace(/\\/g, '/')
}
// generate index.js, which import all icons
function generateIndex(opts, files, subDir) {
    if (subDir === void 0) {
        subDir = ''
    }
    var shouldExport = opts['export']
    var isES6 = opts.es6
    var content = ''
    var dirMap = {}
    switch (opts.ext) {
        case 'js':
            content += '/* eslint-disable */\n'
            break
        case 'ts':
            content += '/* tslint:disable */\n'
            break
    }
    files.forEach(function(file) {
        var name = path.basename(file).split('.')[0]
        var filePath = getFilePath(opts.sourcePath, file, subDir)
        var dir = filePath.split('/')[0]
        if (dir) {
            if (!dirMap[dir]) {
                dirMap[dir] = []
                if (shouldExport) {
                    var dirName = camelcase_1['default'](dir, {
                        pascalCase: true
                    })
                    content += isES6
                        ? 'export * as  ' + dirName + " from './" + dir + "'\n"
                        : 'module.exports.' +
                          dirName +
                          " = require('./" +
                          dir +
                          "')\n"
                } else {
                    content += isES6
                        ? "import './" + dir + "'\n"
                        : "require('./" + dir + "')\n"
                }
            }
            dirMap[dir].push(file)
        } else {
            if (shouldExport) {
                var fileName = camelcase_1['default'](name, {
                    pascalCase: true
                })
                content += isES6
                    ? 'export ' +
                      fileName +
                      " from './" +
                      filePath +
                      name +
                      "'\n"
                    : 'module.exports.' +
                      fileName +
                      " = require('./" +
                      filePath +
                      name +
                      "')\n"
            } else {
                content += isES6
                    ? "import './" + filePath + name + "'\n"
                    : "require('./" + filePath + name + "')\n"
            }
        }
    })
    fs.writeFileSync(
        path.join(opts.targetPath, subDir, 'index.' + opts.ext),
        content,
        'utf-8'
    )
    console.log(
        colors.green(
            'Generated ' +
                (subDir ? subDir + path.sep : '') +
                'index.' +
                opts.ext
        )
    )
    // generate subDir index.js
    for (var dir in dirMap) {
        generateIndex(opts, dirMap[dir], path.join(subDir, dir))
    }
}
// get svgo config
function getSvgoConfig(svgo) {
    if (!svgo) {
        return require('../../default/svgo')
    } else if (typeof svgo === 'string') {
        return require(path.join(process.cwd(), svgo))
    } else {
        return svgo
    }
}
// get svg viewbox
function getViewBox(svgoResult) {
    var viewBoxMatch = svgoResult.data.match(
        /viewBox="([-\d\.]+\s[-\d\.]+\s[-\d\.]+\s[-\d\.]+)"/
    )
    var viewBox = '0 0 200 200'
    if (viewBoxMatch && viewBoxMatch.length > 1) {
        viewBox = viewBoxMatch[1]
    } else if (svgoResult.info.height && svgoResult.info.width) {
        viewBox = '0 0 ' + svgoResult.info.width + ' ' + svgoResult.info.height
    }
    return viewBox
}
/**
 * get Struers version
 **/
function getStruersVersion(svgoResult) {
    var match = svgoResult.data.match(
        /(?<=struers:version=")(?:(\d+)\.){0,2}(\*|\d+)(?=")/
    )
    if (match && match.length > 0) {
        return match[0]
    }
    return ''
}
/**
 * get Struers status
 **/
function getStruersStatus(svgoResult) {
    var match = svgoResult.data.match(/(?<=struers:status=")[a-zA-Z]{1,}(?=")/)
    if (match && match.length > 0) {
        return match[0]
    }
    return ''
}
// add pid attr, for css
function addPid(content) {
    var shapeReg = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi
    var id = 0
    content = content.replace(shapeReg, function(match) {
        return match + ('pid="' + id++ + '" ')
    })
    return content
}
// rename fill and stroke. (It can restroe in vue-svgicon)
function renameStyle(content) {
    var styleShaeReg = /<(path|rect|circle|polygon|line|polyline|g|ellipse).+>/gi
    var styleReg = /fill=\"|stroke="/gi
    content = content.replace(styleShaeReg, function(shape) {
        return shape.replace(styleReg, function(styleName) {
            return '_' + styleName
        })
    })
    return content
}
// replace element id, make sure ID is unique. fix #16
function changeId(content, filePath, name, idSep) {
    if (idSep === void 0) {
        idSep = '_'
    }
    var idReg = /svgicon(\w+)/g
    content = content.replace(idReg, function(match, elId) {
        return (
            'svgicon' +
            idSep +
            filePath.replace(/[\\\/]/g, idSep) +
            name +
            idSep +
            elId
        )
    })
    return content
}
