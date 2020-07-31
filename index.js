const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (let time of passTimes) {
    let date = new Date(time.risetime * 1000);
    date.setHours(date.getHours() - 8);
    let pass = date.toUTCString() + '-0700 (Pacific Daylight Time)';
    console.log(`Next pass at ${pass} for ${time.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});