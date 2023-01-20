const {fetchMyIpPRo, fetchCoordsByIPPro, fetchISSFlyOverTimes, nextISSTimesForMyLocationPro} = require("./iss_promised");

// fetchMyIpPRo()
// .then(fetchCoordsByIPPro)
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));


const printFLyoverTimes = (passTimes) => {
  for (let time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocationPro()
.then((passTimes) => {
  printFLyoverTimes(passTimes);
})
.catch((error) => {
  console.log("We got stuck on the printing passtimes",error.message)
})
