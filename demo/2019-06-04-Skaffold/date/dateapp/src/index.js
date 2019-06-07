const express = require('express')
const app = express()
app.use(express.json())
const http = require('http')
const port = 3000

app.get('/:id', function (req, res) {
    const id = req.params.id;

    http.get('http://persist:8080/' + id, (response) => {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => {rawData += chunk;});
        response.on('end', () => {
            const parsedData = JSON.parse(rawData);
            console.log('Response from persist:' + parsedData);
            parsedData.ageInWeeks = Date.dateDiff('w', new Date(parsedData.time).getTime(), Date.now())
            res.send(parsedData);
        });
    })
})


app.post('/', function (req, res) {
    let payload = req.body;
    console.log('Incoming Post: ' + payload)
    payload.time = new Date().toISOString();

    const options = {
        host: 'persist',
        port: 8080,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const httpreq = http.request(options, function (response) {
        console.log(`Response from persist: ${response.statusCode}`);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("Response from persist:" + chunk);
        });
        response.on('end', function () {
            res.send('ok');
        })
    });
    httpreq.write(JSON.stringify(payload));
    httpreq.end();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)
)

Date.dateDiff = function (datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    };

    return Math.floor(diff / divideBy[datepart]);
}