const express = require('express')
const app = express()
const port = 4000
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')

//application/x-www-form-urlencoded 이런식으로 된 데이터를 가져와서 분석해주는 코드
app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.urlencoded({extended: true}));

//application/json 으로된 데이터를 가져와서 분석할수있게 하는 코드
app.use(express.json());
//app.use(bodyParser.json());

//cookieParser 사용을 위함.
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {})
.then(() => console.log("MongoDb Connected"))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!22')
})

app.post('/api/user/register', (req, res) =>{
    //회원가입 할때 필요한 정보들을 Clinent 에서 가져오면
    //그것들을 데이터베이스에 넣어준다 

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.post('/api/user/login', (req, res) => {
  //요청된 이메일을 DB에서 해당 이메일이 존재하는지 확인
  //findOne()mongoose제공 메서드
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false, 
        message: "해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){ 
        return res.json({ 
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다." 
        })
      }

      //비밀번호까지 맞다면 Token생성
      user.generateToken( (err, user) => {
        if(err) return res.status(400).send(err);
        
        //토큰을 쿠키, 로컬스토리지, 세션 등에 저장한다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
})


app.get('/api/user/auth', auth, (req, res) => {
  // 미들웨어 즉 auth를 거쳐서 여기까지 왔다는 이야기는 authentication이 true라는 말임.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: ""}, (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    })
  })
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

