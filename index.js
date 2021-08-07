const dotenv = require('dotenv')
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const server = http.createServer(app);
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
const mongoose = require('mongoose');
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const postRouter=require('./routes/post')

//Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})
