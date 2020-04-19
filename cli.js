#!/usr/bin/env node
const api = require('./index.js')

const args = process.argv.slice(2)
let targetPath = process.cwd()
const commandOptions = ['-r']
const options = []

for (let i = 0; i < args.length; i += 2) {
    if(commandOptions.includes(args[i])) {
        if(args[i + 1]) {
            options.push({
                key: args[i],
                value: args[i + 1]
            })
        } else {
            console.log(`选项${args[i]}缺少参数`)
            return
        }
    } else {
        console.log(`错误的选项：${args[i]}`)
        return
    }
}
console.log('options')
console.log(options)
for (let i = 0; i < options.length; i++) {
    switch (options[i].key) {
        case '-r':
            targetPath = options[i].value
            break
    }
}

api.start(targetPath)