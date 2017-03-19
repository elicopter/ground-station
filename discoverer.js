// HTTP
var http = require("http"),  
    winston = require("winston");
// SSDP
var SSDPClient = require("node-ssdp").Client,
    ssdpClient = new SSDPClient();

var elicopters = [];

ssdpClient.on("response", function (headers, statusCode, rinfo) {
  if (headers["ST"] !== "elicopter") { return; }
  foundElicopter = elicopters.find(function (elicopter) {
    return elicopter.name === headers["USN"];
  });
  if (!foundElicopter) {
    elicopter = {
      name: headers["USN"],
      address: rinfo["address"]
    }
    elicopters.push(elicopter);
    winston.info("Found 1 new Elicopter.");
  }
});

var searchElicopters = function() {
  ssdpClient.search("ssdp:all");
}

setInterval(searchElicopters, 5000);
searchElicopters();

winston.info("Starting Web Server...");
var server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.end(JSON.stringify(elicopters));
}).listen(4201);
