const express = require("express");
const app = express();

const PORT = 3004;

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("landing");
})

app.get("/campgrounds", (req, res)=>{
    let campgrounds = [
        {name: "Campsite 1", image:"https://photosforclass.com/download/flickr-321487195"},
        {name: "Campsite 2", image:"https://photosforclass.com/download/flickr-5641024448"},
        {name: "Campsite 3", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(PORT, ()=>{
    console.log("Server is listening on port: " + PORT);
} )