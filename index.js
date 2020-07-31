const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (let time of passTimes) {
    let date = new Date(time.risetime * 1000);
    date.setHours(date.getHours() - 7);
    let pass = date.toUTCString() + '-0700 (Pacific Daylight Time)';
    let duration = time.duration;
    console.log(`Next pass at ${pass} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});