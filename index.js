const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose')
// IMPORT ROUTES
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

app.use(bodyParser.json());

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

