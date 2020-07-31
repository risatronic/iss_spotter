const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    } else {

      let data = JSON.parse(body);
      return callback(null, data.ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).data;

    let coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  let lat = coords.data.latitude;
  let lon = coords.data.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).response;

    let ISSFlyOverTimes = [];
    for (let pass of data) {
      ISSFlyOverTimes.push(pass);
    }

    return callback(null, ISSFlyOverTimes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return console.log(error);
      }
      fetchISSFlyOverTimes({ data }, (error, data) => {
        if (error) {
          return console.log(error);
        }
        return callback(null, data);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};