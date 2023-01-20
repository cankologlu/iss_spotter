request = require("request");
const urlIp = "https://api.ipify.org?format=json"



const fetchMyIP = (callback) => {
request(urlIp, (error, response, body) => {
  
  if(error) {
    callback(error,null);
  } 
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  let parsed = JSON.parse(body); 
  callback(null, parsed.ip);
})
}
const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    let parsed = JSON.parse(body); 
    if(error) {
      callback(error,null);
    } 
    if (!parsed.success) {
      const msg = `Success is"" ${parsed.success}`;
      callback(Error(msg), null);
      return;
    }
    // console.log(parsed.success)
    
    let data = {latitude: parsed.latitude, longitude: parsed.longitude};
    callback(null, data);
  })
}

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    let parsed = JSON.parse(body); 
    if(error) {
      callback(error,null);
    } 
    callback(null, parsed.response)
    // console.log("Body is",body)
    // console.log("Parsed body is", parsed)
    // console.log(parsed.response)

  })
}

const nextISSTimesForMyLocation = (callback) =>{
  
  fetchMyIP((error,ip) => {
   if (error) {
     return callback(error, null);
   
   }
   fetchCoordsByIP(ip, (error, data) => {
     if (error) {
       return callback(error, null);
     }
     fetchISSFlyOverTimes(data, (error, flyOver ) =>{
       if (error) {
         callback (error);
         } 
 
         callback(null, flyOver)
     })
   })
 })
 }
module.exports = {nextISSTimesForMyLocation};