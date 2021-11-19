const express = require ('express');
const {createPhoto, deletePhoto, editPhoto} = require('../controllers/photoControllers')
const {signup, signin, signout} = require('../controllers/adminControllers')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const route = express.Router()

route.get('/', upload.single('image'), (req, res) => {
    res.send('top of the morning')
})

route.get('/signout', signout)
route.post('/signup', signup)
route.post('/signin', signin)
route.post('/createPhoto', createPhoto)
route.delete('/deletePhoto/:photoId', deletePhoto)

route.patch('/editPhoto/:photoId', editPhoto)

module.exports = route