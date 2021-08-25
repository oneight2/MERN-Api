const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
// IMPORT ROUTES
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// konfigurasi lokasi simpen file dan namefile
const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'images')
  },
  filename:(req,file,cb)=>{
    cb(null, new Date().getTime()+'-'+file.originalname)
  }
})
// konfigurasi filter type file
const filterFile = (req, file, cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')))
app.use(multer({storage:fileStorage,fileFilter: filterFile}).single('image'))

// SEETING CORS POLICY UNTUK  PENGAKSESAAN API DARI LUAR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next)=>{
  const status = error.errorStatus || 500
  const message = error.message
  const data = error.data

  res.status(status).json({
    message : message,
    data: data
  })
})

mongoose.connect('mongodb+srv://syarif:7september@cluster0.u1jzv.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>{
  app.listen(4000, ()=>console.log('Connection Success'));
})
.catch(err => console.log(err))

