const express = require('express')
const responseTime = require('./middleware/index')

const app = express()

app.use((req, res, next) => {
  console.log('开始处理')
  next()
})

app.use(responseTime())

app.use((req, res, next) => {
  for(let i=0; i<100000; i++) {
    res.write('123456')
  }
  res.end()
})

app.listen(3000, () => {
  console.log('我在监听3000端口!')
})
