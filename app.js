var express=require("express"); 
var bodyParser=require("body-parser"); 
var path = require('path')



const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg' ,  { useNewUrlParser: true , useUnifiedTopology: true }); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = req.body.password; 
	var phone =req.body.phone; 

	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
		"phone":phone 
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.sendFile(__dirname + '/success.html'); 
}) 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
	return res.sendFile(__dirname + '/index.html');
//return res.redirect('index.html'); 
}).listen(3000) ;


console.log("server listening at port 3000"); 


//define the route for "/"
// app.get("/", function (request, response){
// 	//show this file when the "/" is requested
// 	response.sendFile(__dirname+"/index.html");
// });

//start the server
// app.listen(8080);

// console.log("Something awesome to happen at http://localhost:8080");


// console.log("server listening at port 8080"); 
