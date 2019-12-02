const express = require('express')
const chaos = require('./ChaosJS/index')

const app = express()
const port = 3000

app.use(chaos)

app.get('/', function (req, res) {
  res.send('Hello Matlab!')
})

app.listen(port, function () {
  console.log(`ChaosJS app listening on port ${port}!`)
})
