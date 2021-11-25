const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Defines path
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// set up server
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Van Nguyen',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Van Nguyen',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful',
    title: 'Help',
    name: 'Van Nguyen',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide location',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast: 'forecast',
  //   location: 'New York',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Van Nguyen',
    errorMessage: 'Help article is not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Van Nguyen',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Connect to port!');
});
