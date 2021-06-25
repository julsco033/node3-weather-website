
const express = require('express')
const path = require('path')
const hbs = require('hbs')
// const geo = require('./utils/geocode')
// const forecase = require('./utils/forecast')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname);
//defins paths express config
const publicDIR = path.join(__dirname, '../public');
const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up direcotry to serve
app.use(express.static(publicDIR))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Juls'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Juls'
    })

})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'This is a Help Page',
        name: ' Ryan Fucking Gang!'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must have an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'Its raining',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juls Co',
        errorMsgs: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juls Co',
        errorMsgs: 'Page not found.'
    })
})
//app.com - /help - /about

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
})