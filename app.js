const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3004;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
    {name: "Campsite 1", image:"https://photosforclass.com/download/flickr-321487195"},
    {name: "Campsite 2", image:"https://photosforclass.com/download/flickr-5641024448"},
    {name: "Campsite 3", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
];

app.get("/", (req, res)=>{
    res.render("landing");
})

app.get("/campgrounds", (req, res)=>{
    
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.get("/campgrounds/new", (req, res)=>{
    res.render("new");
})


app.post("/campgrounds", (req, res)=>{
    let name = req.body.name;
    let image = req.body.image;

    campgrounds.push({name: name, image: image});

    res.redirect("/campgrounds");
})

app.get("*", (req, res)=>{
    res.send("Incorrect url");
})

app.listen(PORT, ()=>{
    console.log("Server is listening on port: " + PORT);
} )