const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/StaffDB', {
    useNewUrlParser: true,
},
err =>{
    if (!err){
        console.log('Connection Succeeded')
    }else{
        console.log('Error in connection' + err)

    }
});
require('./staff.model')