const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up connection
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

const PORT = 3004;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));


// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// var campgrounds = [
//     {name: "Campsite 1", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 2", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 3", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 4", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 5", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 6", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
//     {name: "Campsite 7", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", description: "This is description"},
// ];

// campgrounds.forEach(function(element){
//     Campground.create(element, function(err, campground){
//         if(err) throw err
//         else {
//             console.log("Data added");
//         }
//     })
// })



app.get("/", (req, res)=>{
    res.render("landing");
})

app.get("/campgrounds", (req, res)=>{
    //get all campground from database
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            console.log(allCampgrounds);
            res.render("index", {campgrounds: allCampgrounds})    
        }
    })
})

app.get("/campgrounds/new", (req, res)=>{
    res.render("new");
})

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampGround){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampGround);
            res.render("show", {campgrounds: foundCampGround});
        }
    })
})


app.post("/campgrounds", (req, res)=>{
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, data){
        if(err) {
            console.log(err);
        } else {
            // console.log(data);
            res.redirect("/campgrounds");
        }
    })

})

app.get("*", (req, res)=>{
    res.send("Incorrect url");
})

app.listen(PORT, ()=>{
    console.log("Server is listening on port: " + PORT);
} )