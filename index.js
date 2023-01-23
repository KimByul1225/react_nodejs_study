const express = require('express')
const app = express()
const port = 4000
const config = require('./config/key');
const {User} = require('./models/User')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {})
.then(() => console.log("MongoDb Connected"))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!22')
})

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그 정보를 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({succes: false, err})
    return res.status(200).json({
      succes: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

