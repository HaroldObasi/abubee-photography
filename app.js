const express = require("express")
const dotenv = require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')

const port = process.env.PORT
mongoURI = process.env.MONGO_URI
const app = express()

const adminRoutes = require('./routes/adminRoute')
const photoRoutes = require('./routes/photoRoutes')

mongoose.connect(mongoURI, { useUnifiedTopology: true,  useNewUrlParser: true })
.then(() => {console.log("DATABASE CONNECTION SUCCESSFUL",)})

//MIDDLE WARES
// app.use(bodyParser.json())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())
app.use(morgan('tiny'))

app.use('/admin', adminRoutes)
app.use('/photos', photoRoutes)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log("Server started on port ", port)
})