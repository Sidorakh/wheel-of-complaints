const admin = require('firebase-admin');
const wheel_data = require('./wheel-data.js');
const express = require('express');
const app = express();
module.exports = app;

app.get('*/wheel-data',async(req,res)=>{
    res.json({
        status:'success',
        wheel: {
            entities:wheel_data.entities,
            problems:wheel_data.problems,
            reasons:wheel_data.reasons
        
        }
    });
})

app.post('*/wheel/:e/:p/:r',async(req,res)=>{
    await admin.firestore().collection('spinners').doc('statistics').update({
        entities: {
            [req.params.e]: admin.firestore.FieldValue.increment(1),
        },
        problems: {
            [req.params.p]: admin.firestore.FieldValue.increment(1),
        },
        reasons: {
            [req.params.r]: admin.firestore.FieldValue.increment(1),
        },
    });
    res.json({
        status:'success'
    })
})