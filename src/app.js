const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
console.log(publicDirectoryPath)
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Cristina Sita'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Cristina Sita'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'this is some helpful test',
        name: 'Cristina Sita'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "You must provide an address"
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                "error": error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    "error": error
                })
            }
            res.send({
                location: location,
                forecast: forecastData.weather_descriptions
            })

        })
    })

   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            "error": "You must provide a search term"
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cristina',
        errorMessage: 'Help article not foud'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cristina',
        errorMessage: 'Page not foud'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})