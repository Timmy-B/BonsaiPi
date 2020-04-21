const express = require('express');
const fs = require('fs');
const ini = require('ini');
const app = express();
const ip = require('ip');
const myIP = ip.address();
var config = {};
const iniFile = './config.ini'
const defaultConfig = {
    general: { name: 'My Bonsai', species: 'Giant sequoia', unitSystem: 'metric', firstRun: true, configVersion: 1, },
    network: { 
        port: 8686, 
        uniqueKey: '', //true identifier of this device. should be generated on first run. allows for name change without data loss.
        serverIP: '', //IP of the server this device will report to.
        mode: 'master', // master, slave - slave will not log historical data.
    },
    sensorCalibration: { 
        lowTemp: 0,
        highTemp: 32,
        lowMoisture: 0,
        highMoisture: 100,
        lowHumidity : 0,
        highHumidity: 100,
        lowLux: 0,
        highLux: 100
    },
    sensorTargets: {
        targetTemp: 24,
        targetMoisture: 80,
        targetHumidity: 80,
        targetLux: 80
    }
};
try {
    if (fs.existsSync(iniFile)) {
        config = ini.parse(fs.readFileSync(iniFile, 'utf-8'));
    }else{
       const newINI = ini.stringify(defaultConfig)
       config = defaultConfig;
        fs.writeFileSync(iniFile, ini.stringify(defaultConfig), function (err) {
            if (err) throw err;
            console.log('BonsaiPi config created successfully.');
        }); 
    }
} catch (err) {
    console.error(err);
}

const port = config.network.port;

app.listen(port, () => console.log(`BonasiPi listening at http://${myIP}:${port}`))

app.get("/", function (req, res) {
    res.json(config.general);
});

app.route('/config')
    .get(function (req, res) {
        res.json(defaultConfig)
    })
    .put(function (req, res) {

        res.send(`Updated Config - ${req.params}`)
    })


app.get("/sensors", function (req, res) {
    const readings = {temp:30, lux:13, humidity:72,moisture:50}  //place holder readings
    res.json(readings);
});