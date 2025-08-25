let express = require('express')
require('dotenv').config()
let morgan = require('morgan')
let mongoose = require('mongoose')
let servicesRoute = require('./routes/services')
let adminRoute = require ('./routes/admin')
let PublicRoute = require ('./routes/Publicservices')
let newsRoute = require('./routes/news')
let ContactusRoute = require('./routes/contactus')
let PublicsnewsRoute = require('./routes/publicnews')
let cors = require('cors')
let cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kaungzinthu:test1234@cluster0.rdmhdpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let app = express()

// MongoDB connection
mongoose.connect(MONGO_URI).then(()=>{
    console.log("connect to db ")
    app.listen(PORT,()=>{
    console.log("server is running"+PORT)
})
})
// Middlewares
app.use(cors({
  origin:'http://localhost:5173', // update to your frontend URL later
  credentials:true
}))
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

// Root route to avoid 404
app.get('/', (req, res) => {
  res.send("Backend is running!")
})

// Routes
app.get('/services',(req,res)=> res.json({msg:"hello"}))
app.use(servicesRoute)
app.use('/api/admins',adminRoute)
app.use(PublicRoute)
app.use(PublicsnewsRoute)
app.use(newsRoute)
app.use(ContactusRoute)

// Cookies
app.get('/set-cookie',(req,res)=>{
  res.cookie('name','aungaung')
  res.cookie('important-key','value',{httpOnly: true})
  return res.send("Cookie set")
})
app.get('/get-cookie',(req,res)=>{
  return res.send(req.cookies)
})

// Start server
