var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const bcrypt = require('bcrypt');

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Login',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/signup",(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    db.collection('user_details').findOne({ "username": username }, (err, result) => {
        if (err) {
            throw err;
        }
        if (result) {
            // Username already exists
            res.redirect('signup_1.html')
            // return res.status(400).json({ message: "User already exists" });
            // return res.status(400).send("User already exists");
            // return res.send("User already exists");
        } else {
            // Username doesn't exist
            var data = {
                "username": username,
                "password" : password,
                "email" : email
            }
            db.collection('user_details').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("Record Inserted Successfully");
                return res.redirect('login.html');
            });
        }
    });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        db.collection('user_details').findOne({ username }, (err, result) => 
        {
            // console.log(result);
            if (!result) {
                // User not found
                return res.redirect('login_1.html') 
            }
            else if (password!==result.password) {
                // Incorect password
                return res.redirect('login_2.html')
            }
            else {
                res.cookie('username', username);
                return res.redirect('home.html');
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Message = mongoose.model('Message', messageSchema);

app.post("/contact", (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // Creating new message instance
    const newMessage = new Message({
        name: name,
        email: email,
        message: message
    });

    // Saving message to the database
    newMessage.save()
        .then(result => {
            // console.log("Message Inserted Successfully");
            return res.redirect('message_sent.html');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error saving message to the database");
        });
});

app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.redirect('index.html');

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on PORT 3000");
});
