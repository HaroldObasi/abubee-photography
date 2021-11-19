const Photo = require('../models/photo')
const { cloudinary } = require('../utils/cloudinary')

const getPhotos = async(req, res) => {

    try{
        const photos = await Photo.find()
        res.json({photoList: photos})
    }
    catch(err){
        res.json({ message: err})
    }

}

const createPhoto = async(req, res) => {
    const img = req.body.img

    try{
        const uploadedImg = await cloudinary.uploader.upload(img, {
            upload_preset: 'abubee'
        })
        console.log("uploaded image: ", uploadedImg)

        var photo = new Photo({
            title: req.body.title, 
            description: req.body.description, 
            shotDate: req.body.shotDate, 
            cameraInfo: req.body.cameraInfo, 
            shotLocation: req.body.shotLocation,
            img: uploadedImg.url
        })

        const savedPhoto = await photo.save()
        console.log("saved image: ", savedPhoto)
        return res.status(200).send(savedPhoto) 

    }
    catch(err){
        // res.json({message: err})
        return res.send({message: err})
    }

    // try{
    //     const savedPhoto = await photo.save()
    //     console.log("saved image: ", savedPhoto)
    //     return res.status(200).send(savedPhoto) 
    // }
    // catch(err){
    //     console.log(err)
    // }
}

const deletePhoto = async(req, res) => {
    const photoId = req.params.photoId

    try{
        var photo = await Photo.findById(photoId)
        const photoUrl = photo.img

        // res.json({photo: photo, url: photoUrl})
        var urlToDelete = photoUrl.slice(photoUrl.indexOf('abubee'), photoUrl.length)
        urlToDelete = urlToDelete.substring(urlToDelete.indexOf('.'), 0)

        const deletedImg = await cloudinary.api
                            .delete_resources(urlToDelete)
                            .then( async() => {
                                const deletedPhoto = await Photo.deleteOne({_id: photoId})
                                console.log(deletedPhoto)
                                res.json({deletedPhoto: deletedPhoto})

                            })


        // const deletedPhoto = await Photo.deleteOne({_id: photoId})
        // console.log('deleted img: ', deletedImg)
        // res.status(200).send(deletedImg)

    }
    catch(err){
        res.json({message: err})
        // console.log(err)
    }

    // try{
    //     const deletedPhoto = await Photo.deleteOne({_id: photoId})
    //     //res.json({deleted: deletedPhoto})
    //     console.log({deleted: deletedPhoto})
    // }
    // catch(err){
    //     // res.json({message: err})
    //     console.log({message: err})
        
    // }
}

const editPhoto = async(req, res) => {

    try{
        const photoId = req.params.photoId
        const updatedPhoto = await Photo.updateOne(
            {_id: photoId},
            {
                title: req.body.title, 
                description: req.body.description, 
                shotDate: req.body.shotDate,
                cameraInfo: req.body.cameraInfo,
                shotLocation: req.body.shotLocation,
            }
            
        )
        res.json(updatedPhoto)
    }
    catch(err){
        res.json( {error} )
    }
}



module.exports = {
    createPhoto, 
    getPhotos,
    deletePhoto, 
    editPhoto
}