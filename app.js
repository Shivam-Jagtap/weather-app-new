const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const { config } = require("process");

const app = express();              // create an express server
app.use(express.static('public'));  // it gives our express server access to static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
app.get("",(req,res)=>{
    const fileName = path.join(__dirname,'public/index.html'); // construct a path to serve static files on get request
    res.sendFile(fileName);                                    // send our html file
})

app.post("",(req,res)=>{
    const cityName = req.body.city;
    const apiKey = "0393c7e441dad6701a78ddb255a6c7d5";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unit //this is our created url which will be searched as api to get result

    axios.get(url,config).then((response) =>{ //axios fetches the given api using its get method to collect data as a javascript promise
        const temp = response.data.main.temp;
        const weatherDescription = response.data.weather[0].description;       
        const humidity = response.data.main.humidity;
        const windSpeed = response.data.wind.speed;
        const iconCode = response.data.weather[0].icon;

        res.render('weather', { temp, weatherDescription ,humidity,windSpeed,iconCode});
       
    }).catch((error) => {  // catch method is used to catch any errors produced during api processing
        // it will produce error when user enters invalid cityname
        res.send("Enter a valid city name")
    })

})


const port = 3000;
app.listen(port,()=>{
    console.log("App started running on port :"+port)
});