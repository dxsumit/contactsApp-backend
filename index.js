
const ContactSchema = require('./models/contact')
const express = require("express");
const {connectToDB} = require('./DB/connect')
require("dotenv").config();
const authorize = require('./middleware/authorization')
const cors = require('cors');
const User = require('./models/user')

const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// handle all the route related to auth
const auth = require('./routes/auth');

// is used to read the requested data from web in FORM .. middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "60mb"}));   // allows express to use json in body..
app.use(cors());    // allow cross origin resource sharing..


app.use("/auth", auth);


( async () => {

    try {

        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is active on port ${PORT}..`);
        });
    }
    catch(err){
        console.log("Error in server loading");
        console.log(err);
    }

})();


app.get('/', (req, res) => {

    // here login and registers button page will lie...

    res.status(200).send(`<h2> This is Base URL, server is active.. </h2>`);
});


// add conatct in table...

app.post('/add/:tableID', authorize, async (req, res) => {

    try{

        const {tableID} = req.params

        const {firstName, lastName, age, gender, email} = req.body

        if( !(firstName && lastName && age && gender && email))
            return res.status(400).json({status: "error", msg: "All fields are required.."});


        // check if table exist or not
        try{
            const isTabel = await User.findOne({_id: tableID});
            if(!isTabel){
                return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
            }

        }
        catch(err){
            return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
        }

         // access the unique table of the user
         const UserContact = mongoose.model(tableID, ContactSchema);

         const newData = new UserContact({
             firstName : firstName,
             lastName: lastName,
             age: age,
             gender: gender,
             email: email
         })
 
         // save user in database..
         await newData.save()

         res.status(201).json({status: 'successful', msg: newData});

    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})

// get all contacts of the table..
app.get('/:id', authorize, async (req, res) => {

    try{

        const {id} = req.params
        // access the unique table of the user
        const UserContacts = mongoose.model(id, ContactSchema);
        // console.log(UserContacts);

        const allContacts = await UserContacts.find();
        res.status(200).json({status: 'successful', msg: allContacts});

    }
    catch(err) {

        res.status(500).json({status: 'failed', msg: err});
    }

})


// find a contact in table..
app.get('/find/:tableId/:itemId', authorize, async (req, res) => {

    try{

        const {tableId, itemId} = req.params;

        // access the unique table of the user
        const UserContacts = mongoose.model(tableId, ContactSchema);
        const foundContact = await UserContacts.findOne({_id:itemId});

        if(!foundContact)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: foundContact});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// delete a contact in table
app.delete('/delete/:tableId/:itemId', authorize, async (req, res)=>{

    try{
        const {tableId, itemId} = req.params

        // check if table exist or not
        try{
            const isTabel = await User.findOne({_id: tableId});
            if(!isTabel){
                return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
            }
        }
        catch(err){
            return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
        }

        // access the unique table of the user
        const UserContacts = mongoose.model(tableId, ContactSchema);
        const foundTask = await UserContacts.findOneAndDelete({_id:itemId});

        if(!foundTask)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: foundTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
});


// patch perticular fields..
app.patch('/update/:tableId/:itemId', authorize, async (req, res)=>{

    try{
        
        const {tableId, itemId} = req.params;

        // check if table exist or not
        try{
            const isTabel = await User.findOne({_id: tableId});
            if(!isTabel){
                return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
            }
        }
        catch(err){
            return res.status(404).json({status: 'failed', msg: 'Table does not exist'});
        }

        // access the unique table of the user
        const UserContacts = mongoose.model(tableId, ContactSchema);
        const updatedTask = await UserContacts.findOneAndUpdate({_id:itemId }, req.body, {
            new: true,
            runValidators: true
        });

        if(!updatedTask)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: updatedTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }

});



// default route
app.all('*', (req, res) => {

    res.status(404).send('<h1> Resourse not found </h1> <p> Probably wrong URL </p>');

})


