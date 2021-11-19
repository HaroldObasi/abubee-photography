const express = require ('express');
const {getPhotos} = require('../controllers/photoControllers')
const route = express.Router()

route.get('/', getPhotos)


module.exports = route