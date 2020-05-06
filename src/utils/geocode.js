const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?&limit=1&access_token=pk.eyJ1IjoiY3Jpc3RpbmFzaXRhIiwiYSI6ImNrOXNlZmN0aDAxc3ozbmxqY2Z3eGl6eGUifQ.7hp0Q-_9-eB5B7MdNv_ndg'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode