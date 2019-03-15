const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;
// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather app", name: "Vivian" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Vivian" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Vivian" });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "error",
    name: "Vivian",
    errorMessage: "Help not found"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  const address = req.query.address;
  geocode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forcastData: forcastData,
        address: req.query.address
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "error",
    name: "Vivian",
    errorMessage: "Page not found"
  });
});
// app.get("/help", (req, res) => {
//   res.send("help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<p>about</p>");
// });
app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Taipei"
  });
});

app.listen(port, () => {
  console.log("server is running on port + " + port);
});
