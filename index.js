const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require("./iss");


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
  
  
})

fetchCoordsByIP("72.140.178.141", (error, data) => {
  if (error) {
    console.log("Something went wrong with", error);
    return;
  }
  console.log("Data is:", data);

  
})

fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, data) => {
  if (error) {
    console.log("Flyover schedule error:", error);
    return;
  }
  console.log("The flyover times are:", data);
})

