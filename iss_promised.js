const request = require("request-promise-native");

const fetchMyIpPRo = () => {
  return request("https://api.ipify.org?format=json")
};

const fetchCoordsByIPPro = (body) => {
  let ip = JSON.parse(body).ip
 return request(`http://ipwho.is/${ip}`)
};

const fetchISSFlyOverTimes = (data) => {
  let location = JSON.parse(data)
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`)
}
const nextISSTimesForMyLocationPro =() => {
  return fetchMyIpPRo()
  .then(fetchCoordsByIPPro)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const {response} = JSON.parse(data);
    return response
  })
};

module.exports = {fetchMyIpPRo, fetchCoordsByIPPro, fetchISSFlyOverTimes, nextISSTimesForMyLocationPro};