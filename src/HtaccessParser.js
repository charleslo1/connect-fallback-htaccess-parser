var fs = require('fs')

/**
 * HtaccessParser 类
 */
class HtaccessParser {
  /**
   * 构造函数
   */
  constructor () {
    // body...
  }

  /**
   * 从.htaccess文件读取
   * @param  {String} filePath .htaccess文件路径
   * @return {Array}      parsed 对象数组
   */
  fromFile (filePath) {
    if (!fs.existsSync(filePath)) throw new Error('请输入正确的文件路径')
    // 读取.htaccess配置内容
    var content = fs.readFileSync(filePath).toString()
    // 转换
    return this.parse(content)
  }

  /**
   * 转换多行.htaccess配置
   * @param  {String} line 多行配置字符串
   * @return {Array}      parsed 对象数组
   */
  parse (text) {
    var rewrites = []
    if (!text) return rewrites

    // 获取配置行
    var lines = textToLines(text)

    // 批量转换
    lines.forEach((line) => {
       rewrites.push(parseLine(line))
    })

    return rewrites
  }
}

/**
 * 将.htaccess文本配置内容转换为数组行
 * @param  {String} text .htaccess 文本
 * @return {Array}  rewrites 字符串数组
 */
function textToLines (text) {
  return text.replace(/(#.*)/ig,'').replace(/\s+/ig,' ').replace(/^\s*rewrite\s*/ig,'').split(/\s*rewrite\s*/ig)
}

/**
 * 转换单行.htaccess配置
 * @param  {String} line 单行配置字符串
 * @return {Object}      parsed 对象
 */
function parseLine (line) {
  var lineParsed = line.split(/\s+/ig)
  var fromReg = new RegExp(lineParsed[0], 'ig')
  var toPath = lineParsed[1]
  return {
    from: fromReg,
    to: function (context) {
      var returnPath = toPath
      var matches = fromReg.exec(context.parsedUrl.path)
      matches.forEach(function(str, index) {
        returnPath = returnPath.replace(new RegExp('\\$' + index, 'g'), str)
      })
      return returnPath
    }
  }
}

// 返回单例
module.exports = new HtaccessParser()
