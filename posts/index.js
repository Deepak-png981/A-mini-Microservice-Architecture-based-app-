const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes/router');
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/posts', router);
app.post('/events', (req, res) => {
    console.log('Recieved event ', req.body.type);
    res.send({});
})
app.listen(PORT, () => {
    console.log(`Server is running fine on ${PORT}`);
})