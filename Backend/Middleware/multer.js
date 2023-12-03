const multer = require('multer');
const Datemod = require("../Modals/Date");
const path = require('path');

const directory_postPhotos = '../../src/Component/Images/postimages';

let storage_postphotos = multer.diskStorage({
  destination: directory_postPhotos,
  filename: (req, file, cb) => {
      const fileName = new Date().toISOString().replace(/[\s:-]+/g, '_') + file.originalname;
      // const filePath = path.join(__dirname, directory_postPhotos, fileName);
      req.fileName = fileName;
      console.log(req.fileName,'filename');
      cb(null, fileName);
      // console.log('File stored at:', filePath);
  }
});

let storage_profilepics = multer.diskStorage({
  destination:'./private/images/ProfilePhotos',
   filename:(req,file,cb)=>{
    const fileName = new Date().toISOString().replace(/[\s:-]+/g, '_') + file.originalname;
    // const filePath = path.join(__dirname, directory_postPhotos, fileName);
    req.filename = fileName;
    cb(null, fileName);
   }
})

let storage_coverphotos = multer.diskStorage({
  destination:'./private/images/CoverPhotos',
   filename:(req,file,cb)=>{
    const fileName = new Date().toISOString().replace(/[\s:-]+/g, '_') + file.originalname;
    // const filePath = path.join(__dirname, directory_postPhotos, fileName);
    req.postImage.fileName = fileName;
    cb(null, fileName);
   }
})

module.exports.uploadprofilepic =multer({
  storage:storage_profilepics,
  fileFilter:(req,file,cb)=>{
      if(
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/gif'
      ){
             cb(null,true);
      }else{
          cb(null,false);
          cb(new Error('ONLY IMAGES ARE ALLOWED TO BE UPLOADED'));
      }

  }
})

module.exports.uploadcoverphoto =multer({
  storage:storage_coverphotos,
  fileFilter:(req,file,cb)=>{
      if(
          file.mimetype == 'image/jpeg' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/gif'
      ){
             cb(null,true);
      }else{
          cb(null,false);
          cb(new Error('ONLY IMAGES ARE ALLOWED TO BE UPLOADED'));
      }

  }
})

module.exports.upload =multer({
  storage:storage_postphotos,
  fileFilter:(req,file,cb)=>{
      if(
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/gif'
      ){
        console.log('file uploaded');
             cb(null,true);
      }else{
        console.log('file not uploaded');
          cb(null,false);
          cb(new Error('ONLY IMAGES ARE ALLOWED TO BE UPLOADED'));
      }

  }
})
