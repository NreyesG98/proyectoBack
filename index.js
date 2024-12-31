const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Colegio Alicante :D')
})
app.get('/hello', (req, res) => {
  res.send('Hello World')
})


app.listen(3000)
console.log(`Server on port ${3000}`)