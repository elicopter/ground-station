var http       = require("http"),
    winston    = require("winston");
var SSDPClient = require("node-ssdp").Client,
    ssdpClient = new SSDPClient();
var elicopters = [
  // {
  //       name: "FIXED Elicopter",
  //       address: "192.168.88.200",
  //       port: "80"
  //       // address: "localhost",
  //       // port: "4000"
  // }
];
const ipc      = require("electron").ipcMain

module.exports = {
  start: function() {
    ssdpClient.on("response", function (headers, statusCode, rinfo) {
      if (headers["ST"] !== "elicopter") { return; }
      elicopter = {
        name: headers["USN"],
        address: rinfo["address"],
        port: headers["PORT"]
      }
      foundElicopterIndex = elicopters.findIndex(function (elicopter) {
        return elicopter.name === headers["USN"];
      });
      if (foundElicopterIndex < 0) {
        elicopters.push(elicopter);
        winston.info("Found " + elicopter.name + ". " + "Address: " + elicopter.address + " Port: " + elicopter.port);
      } else if (elicopters[foundElicopterIndex].address != elicopter.address && elicopters[foundElicopterIndex].port != elicopter.port) {
        elicopters[foundElicopterIndex] = elicopter;
        winston.info("Update " + elicopter.name + ". " + "Address: " + elicopter.address + " Port: " + elicopter.port);
      }
    });

    setInterval(function() {
      ssdpClient.search("ssdp:all");
    }, 5000);
  },
  getAvailableElicopters: function () {
    return elicopters;
  }
}
