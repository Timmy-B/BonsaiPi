const express = require("express");
// const crypto = require("crypto");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const Database = require("better-sqlite3");
const _ = require("lodash");
const fs = require('fs');
const path = require("path");
const bonsaiDB = "./bonsai.db";
const ini = require('ini');
const app = express();
const ip = require('ip');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const sensor = require("node-dht-sensor").promises;
//'https://github.com/jperkin/node-rpio'
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
        baseURL:''
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
    },
    sensors:{
        humidTemp:{type: 11, pin: 4, enabled:true}
    }
};

initDatabase(function (response) {
    console.log(response);
});
try {
    if (fs.existsSync(iniFile)) {
        config = ini.parse(fs.readFileSync(iniFile, 'utf-8'));
    } else {
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
const baseURL = config.network.baseURL;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, () => console.log(`BonasiPi listening at http://${myIP}:${port}${baseURL}`))

app.get(baseURL+"/", function (req, res) {
    res.json(config.general);
});

app.route(baseURL+"/config")
    .get(function (req, res) {
        res.json(defaultConfig)
    })
    .put(function (req, res) {

        res.send(`Updated Config - ${req.params}`)
    })


app.get(baseURL + "/sensors", function (req, res) {
    // const htType = config.sensors.humidTemp.type;
    // const htPin =  config.sensors.humidTemp.pin;
    // var humidTemp = sensor.readSync(htType, htPin);
    console.log(humidTemp)
    // const readings = { temp: humidTemp.temperature, lux: 13, humidity: humidTemp.humidity, moisture:50}  //place holder readings
    const readings = "stfu"
    res.json(readings);
});



function initDatabase(callback) {
    const db = new Database(bonsaiDB);
    const qry = db.prepare(`SELECT name
    FROM sqlite_master
    WHERE
        type='table' and name='items'
    ;`);
    var row = qry.get();
    if (row === undefined) {
        //https://dbdesigner.page.link/jCtkSRXd2afzjD5K8
        console.log("WARNING: Settings database appears empty; initializing it.");
        const sqlInit = `
        BEGIN TRANSACTION;
        CREATE TABLE IF NOT EXISTS gardens (
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
            type text,
            soilType text,
            waterInterval numeric,
            lastWatered datetime,
            nextWater datetime,
            age datetime,
            size text,
            fertilizerType text,
            fertilizerInterval text,
            image blob
        );

        CREATE TABLE IF NOT EXISTS plants (
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
            plantType text,
            subType text,
            count numeric,
            soilType text,
            lighting text,
            waterInterval numeric,
            lastWatered datetime,
            gardenId integer,
            nextWater datetime,
            image blob
        );

        CREATE TABLE IF NOT EXISTS inventory (
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
            type blob,
            qty numeric,
            packAmt numeric,
            lowLevel numeric,
            image blob
        );

        CREATE TABLE IF NOT EXISTS waterLog (
            id integer PRIMARY KEY AUTOINCREMENT,
            itemId datetime,
            itemType datetime,
            dateLog datetime
        );

        CREATE TABLE IF NOT EXISTS inventoryLog (
            id integer PRIMARY KEY AUTOINCREMENT,
            itemId integer,
            used numeric,
            usedDate datetime
        );

        CREATE TABLE IF NOT EXISTS gardenTypes (
            id integer PRIMARY KEY AUTOINCREMENT,
            gardenType integer,
            size numeric
        );

        CREATE TABLE IF NOT EXISTS plantTypes (
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
            type text,
            comment text,
            link text,
            image blob,
            lighting text,
            waterInterval numeric,
            zone text
        );

        CREATE TABLE IF NOT EXISTS gardenJournal (
            id integer PRIMARY KEY AUTOINCREMENT,
            gardenId integer,
            note text,
            image blob,
            noteDate datetime
        );

        CREATE TABLE IF NOT EXISTS plantJournal (
            id integer PRIMARY KEY AUTOINCREMENT,
            plantId integer,
            note text,
            image blob,
            noteDate datetime
        );
        COMMIT;
    `;

        db.exec(sqlInit);

        callback("Settings DB initialized.");
    } else {
        callback("Settings DB exists");
    }
    db.close();
}