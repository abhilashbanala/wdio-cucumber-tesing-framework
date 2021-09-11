const { config } = require('./wdio.shared.conf')

exports.config = {
    ...config,
    ...{
    services: [
      [
        "lambdatest",
        {
          tunnel: true,
          lambdatestOpts: {
            logFile: "tunnel.log",
          },
        },
      ],
    ],
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    exclude: [],
  
    maxInstances: 10,
    commonCapabilities: {},
    capabilities: [
      {
      "LT:Options":
        {
        name: "test",
        build: "LambdaTest Tunnel",
        platform : "Windows 10",
        browserName: "chrome",
        version: "90.0", 
        },
    }
    ],
  
    waitforTimeout: 100000,
    connectionRetryTimeout: 900000,
    connectionRetryCount: 3,
    path: "/wd/hub",
    hostname: "hub.lambdatest.com",
    port: 80,
  }};
  
  // Code to support common capabilities
  exports.config.capabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities)
      caps[i] = caps[i] || exports.config.commonCapabilities[i];
  });
  
