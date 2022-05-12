const express = require('express')

const app = express()

app.use((req, res, next) => {
    next()
    console.log(3)
})

app.use((req, res, next) => {
    app.locals.responseTime = Date.now()
    next()
    console.log(2)
})

app.use((req, res, next) => {
    for(let i=0; i<100000; i++) {
        console.log(123456)
    }
    let time = Date.now() - app.locals.responseTime
    console.log('响应时间 => ' + time)
    res.send('响应完成')
    console.log(1)
})

app.listen(3000, () => {
    console.log('监听3000端口！')
})