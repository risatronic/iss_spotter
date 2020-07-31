const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
  }

  fetchCoordsByIP(ip, (error, data) => {
  if(error){
    console.log(error);
  }else{
    console.log(data);
  
  }
})
});
