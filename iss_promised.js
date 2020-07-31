const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyoverTimes = (body) => {
  let lat = JSON.parse(body).data.latitude;
  let lon = JSON.parse(body).data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};