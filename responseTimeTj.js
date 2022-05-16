const express = require('express')
const responseTime = require('./middleware/index')

const app = express()

app.use((req, res, next) => {
  console.log('开始处理')
  next()
})

// 传递参数第一种方式
// app.use(responseTime())

// 传递参数第二种方式
// app.use(responseTime(1))

// 传递参数第三种方式
// app.use(responseTime({digits: 2, suffix: false}))

// 传递参数第四种方式
app.use(responseTime((req, res, time) => {
  res.setHeader('X-Zrj-Time', time)
}))

app.use((req, res, next) => {
  for(let i=0; i<100000; i++) {
    res.write('123456')
  }
  res.end()
})

app.listen(3000, () => {
  console.log('我在监听3000端口!')
})
