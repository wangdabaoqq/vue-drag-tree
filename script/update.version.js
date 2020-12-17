const fs = require('fs')
const pkg = require('../package.json')

const argvs = process.argv.slice(2)
const __LARGE__ = argvs.indexOf('l') !== -1
const __MIDDLE__ = argvs.indexOf('m') !== -1

let vs = pkg.version.split('.')

if (__LARGE__) {
  vs[0]++
  vs[1] = 0
  vs[2] = 0
} else if (__MIDDLE__) {
  vs[1]++
  vs[2] = 0
} else {
  vs[2]++
}

pkg.version = vs.join('.')

fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), { encoding: 'utf8' })
console.log('  version: ' + pkg.version + '\n')
