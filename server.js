// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

/* eslint-disable */
require('dotenv').config()
//console.log(process.env)

var ttn = require("ttn");
var http = require("http");
var request = require("request");


var appID = process.env.TTN_APPID;
var accessKey = process.env.TTN_ACCESSKEY;


ttn
  .data(appID, accessKey)
  .then(function(client) {
    client.on("uplink", function(devID, payload) {
      console.log("Received uplink from ", devID);
      console.log("Program running");

      // body.value = payload.payload_fields
      // body.devID = payload.hardware_serial
      body = {
        value: payload.payload_fields.temperature,
        unit: 'C',
        Device_id: 1
      }


      console.log(JSON.stringify(body));


      var options = {
        url:
        process.env.HTTP_HTTP + "://" + process.env.HTTP_HOST + ":" + process.env.HTTP_PORT +  process.env.HTTP_PATH,
        method: "POST",
        json: true,
        body: body
      };
      request(options, function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        // console.log('Upload successful!');
        console.log(response.statusCode);
        console.log(response.statusMessage);

      });
    });
  })
  .catch(function(error) {
    console.error("Error", error);
    process.exit(1);
  });

