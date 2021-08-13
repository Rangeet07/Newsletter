const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

client.setConfig({
  apiKey: "4a8cfd100c0342f7aab5058cd7551889",
  server: "us5",
  });

app.get("/", function(req, res){

		res.sendFile(__dirname + "/signup.html");
})

  app.post("/", function(req, res){

	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

//	console.log(firstName, lastName, email);

	const subscribingUser  = {

		firstName: firstName,
		lastName: lastName,
		email: email
	};
	const run = async () =>  {
	try	{
    const response = await client.lists.addListMember("8808ee9052i", {
    email_address: subscribingUser.email,
    status: "subscribed",

    merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }

      });

     res.sendFile(__dirname + "/success.html")
     console.log("Successfully added contact as an audience member.");
 /*  console.log(response); */
  }
  catch(err) {

  	  

  	  res.sendFile(__dirname + "/failure.html")
      console.log("====== ERROR ======");
      console.log(JSON.parse(err.response.error.text).detail);
    }

	};  

run();


});
 
 app.post("/failure", function(req, res){
 	res.redirect("/")
 })


app.listen(process.env.PORT || 3000, function(){

console.log("Sever is running on port 3000.");


});

//API key
//4a8cfd100c0342f7aab5058cd7551889-us5

// Audience id
// 8808ee9052s