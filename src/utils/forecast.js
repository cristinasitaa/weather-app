const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=84920e1d94f9e3d9c4910333ee9c854f&query=' + latitude +','+ longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees out and it feels like '+ body.current.feelslike + ' degrees.',
                temperature : body.current.temperature,
                feelslike : body.current.feelslike 
            })
        }
    })
}

module.exports = forecast