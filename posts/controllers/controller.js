const { randomBytes } = require('crypto');
const axios = require('axios');

const posts = {};
const getAllPost = (req, res) => {
    res.status(200).send(posts);
}
const postThePost = async (req, res) => {
    //generating some random id
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    if (!title) {
        return res.send("No title");
    }
    posts[id] = { id, title };
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    })
    console.log(posts[id]);
    res.status(201).send(posts[id]);

}

module.exports = {
    postThePost, getAllPost
}