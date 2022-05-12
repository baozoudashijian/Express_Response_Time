const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log(-1)
    next()
    console.log(3)
})

app.use((req, res, next) => {
    let startTime = Date.now()
    console.log(0)
    next()
    let time = Date.now() - startTime
    console.log('响应时间 => ' + time)
    console.log(2)
})

app.use((req, res, next) => {
    for(let i=0; i<100000; i++) {
        res.write('123456')
    }
    res.end()
    console.log(1)
})

app.listen(3000, () => {
    console.log('监听3000端口！')
})