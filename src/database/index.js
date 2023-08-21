const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://myAtlasDBUser:atlas123@myatlasclusteredu.p3jpgqa.mongodb.net/expressjs?retryWrites=true&w=majority')
.then(()=>console.log('Connected to DB'))
.catch((err)=> console.log(err));

