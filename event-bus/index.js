const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4005;

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    console.log(event);
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log("error agya 4000 ka ", err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log("error agya 4001 ka ", err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log("error agya 4002 ka ", err.message);
    });
    axios.post("http://localhost:4003/events", event).catch((err) => {
        console.log(err.message);
    });
    res.send({ status: 'OK' });

});

app.get('/events', (req, res) => {
    res.send(events);
})

// console.log("jo");
app.listen(PORT, () => {
    console.log('Server is listening on 4005');
})


