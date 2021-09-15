const dotenv = require('dotenv')
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');


const mongoose = require('mongoose');
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const postRouter=require('./routes/post')
const CategoryRouter=require('./routes/category')
const multer = require("multer")


const server = http.createServer(app);
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));


//Database connection
mongoose
    .connect(process.env.MONGO_URL, { 
     useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true, 
     useFindAndModify: true 
    });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/blogposts',postRouter)
app.use('/api/category',CategoryRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})
