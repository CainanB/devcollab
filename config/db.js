const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')

const connectDB = async () =>{
    try{
       await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
       })
       console.log('MongoDB connected...')
    }
    catch(err){
        console.log(err.message)
        // exit proces with failure
        process.exit(1)
    }
}


module.exports = connectDB;
