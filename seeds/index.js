const mongoose = require("mongoose");
const cities = require("./cities");
const { places, decriptors, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // my user id
      author: "64025a7ed7d2709deb2d4de6",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "blah blah blah blah blah blah blah blah blah blah blah blah",
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331,47.0202] 
      },
      images: [
        {
          url: "https://res.cloudinary.com/duws7fze5/image/upload/v1678444271/yelpCamp/y7xitwnmiuhdpxvwv6ut.jpg",
          filename: "yelpCamp/y7xitwnmiuhdpxvwv6ut",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
