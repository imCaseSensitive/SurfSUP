const axios = require('axios');
var parseString = require('react-native-xml2js').parseString;


const locations = [
    {
        "id": 0,
        "name": 'Yuigahama',
        "coords": {
            "latitude": 35.30,
            "longitude": 139.55
        },
        "swellHeight_m": 12,
        "swellPeriod_secs": 11.5,
        "WindGustKmph": 28,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 1,
        "name": 'Shonanhama',
        "coords": {
            "latitude": 35.31,
            "longitude": 139.36
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 2,
        "name": 'Hasunuma',
        "coords": {
            "latitude": 35.114796,
            "longitude": 140.121461
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 3,
        "name": 'Tojo Beach',
        "coords": {
            "latitude": 35.117318,
            "longitude": 140.125097
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 4,
        "name": 'Aoshima',
        "coords": {
            "latitude": 31.807631,
            "longitude": 131.462595
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 5,
        "name": 'Torami Beach',
        "coords": {
            "latitude": 35.365841,
            "longitude": 140.393435
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 6,
        "name": 'Aoshima',
        "coords": {
            "latitude": 35.181721,
            "longitude": 140.352854
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 7,
        "name": 'Kaifu Rivermouth',
        "coords": {
            "latitude": 33.603534,
            "longitude": 134.365918
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 8,
        "name": 'Takegashima',
        "coords": {
            "latitude": 33.543445,
            "longitude": 134.322441
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 9,
        "name": 'Kochi',
        "coords": {
            "latitude": 33.483407,
            "longitude": 133.545788
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    },
    {
        "id": 10,
        "name": 'Kochi',
        "coords": {
            "latitude": 30.740536,
            "longitude": 131.072925
        },
        "swellHeight_m": 0.5,
        "swellPeriod_secs": 7.5,
        "WindGustKmph": 35,
        "moon_phase": 'Waxing Gibbeous'
    }
]

const parseStringPromise = (data) => {
    return new Promise((resolve, reject) => {
        parseString(data, function(err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const loggerFunc = (latitude, longitude) => {
    return axios.get(`https://api.worldweatheronline.com/premium/v1/marine.ashx?key=acb6d04831a449d997191551191308&q=${latitude},${longitude}`)
    .then(res => {
        return parseStringPromise(res.data);
    })
    .then(res => {
        const dataObj = {
            "swellHeight": res.data.weather[0].hourly[0].swellHeight_m[0],
            "swellPeriod": res.data.weather[0].hourly[0].swellPeriod_secs[0],
            "windGustKmph": res.data.weather[0].hourly[0].WindGustKmph[0],
            "waterTemp": res.data.weather[0].hourly[0].waterTemp_C[0]
        };
        console.log("here", dataObj);
        return dataObj;
    })
};

module.exports = { loggerFunc, locations };