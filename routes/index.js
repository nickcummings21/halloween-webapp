const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/getinfo', function (req, res, next) {

    const fileName = '/text-files' + req.query.file;
    console.log("Getting symbol info: " + fileName);

    require('fs').readFile(__dirname + fileName, function (err, data) {
        if (err) return;

        let symbolName = fileName.substr(12).replace('.txt', '');
        console.log(fileName);
        console.log(symbolName);

        let info = data.toString().replace(/\r?\n|\r/g, ' ').split('breakhere');
        console.log(info);

        res.status(200).json({name: symbolName, info: info});
    });
});

const infoFiles = [
    '/frankenstein.txt', '/ghosts.txt', '/moon.txt', '/mummy.txt', '/pumpkins.txt', '/reaper.txt',
    '/trick-or-treat.txt', '/vampire.txt', '/witch.txt'
];

let symbolInfo = {};

router.get('/getinfo1',function(req, res, next) {
    console.log("Getting symbol info");

    require('async').eachSeries(infoFiles,
        function (fileName, callback) {

            require('fs').readFile(__dirname + fileName, function (err, data) {
                if (err) return;

                let symbolName = fileName.substr(1,fileName.length-5);
                console.log(fileName);
                console.log(symbolName);

                let info = data.toString().replace(/\r?\n|\r/g, ' ').split('breakhere');
                console.log(info);

                // res.write(JSON.stringify({name: symbolName, info: info}));
                symbolInfo[symbolName] = info;
            });
        },
        function (err) {
            console.log('Done');
            // res.end();
            res.status(200).json(symbolInfo);
        }
    );

    res.status(200).json(symbolInfo);
});


module.exports = router;
