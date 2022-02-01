const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Staff = mongoose.model('Staff');

router.get('/', (req, res) =>{
    res.render('layouts/addOrEdit', {
        viewTitle: 'Insert Staff',
    });
});

router.post('/', (req, res)=>{
    if (req.body._id == ""){
        insertRecord(req, res);
    }else{
        updateRecord(req, res);
    }
});

function insertRecord(req, res){
    const staff = new Staff();
    staff.fullName = req.body.fullName;
    staff.email = req.body.email;
    staff.mobile = req.body.mobile;
    staff.position = req.body.position;
    staff.save((err, doc)=>{
        if (!err){
            res.redirect('layouts/list')
        }else{
            console.log('Error during insert: ' + err)
        }
    })
}

function updateRecord(req, res){
    Staff.findOneAndUpdate({_id: req.body._id},
        req.body,
        {
            new: true
        }, 
        (err, doc) =>{
            if (!err){
                res.redirect('layouts/list');
            }else{
                console.log("Error during update: " + err);
            }
        }
        );
}

router.get('/list', (req, res)=>{
    Staff.find((err, docs)=>{
        if(!err){
            res.render('layouts/main', {
                list: docs,
            });
        }else{
            console.log('Error in retrieval: ' + err)
        }
    });
});

router.get('/: id', (req, res)=>{
    Staff.findByID(req.params.id, (err, doc)=>{
        if (!err){
            res.render('layouts/addOrEdit', {
                viewTitle: "Update Staff",
                staff: doc,
            });
            console.log(doc);
        }
    })
})

router.get('delete/:id', (req,res)=>{
    Staff.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            res.render('layouts/list')
        }else{
            console.log('Error in deletion: ' + err);
        }
    })
})
module.exports = router