const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const axios = require('axios')

app.use(express.json());
app.use(cors());
const commentsByPOSTID = {};
app.get('/posts/:id/comments', (req, res) => {
    res.status(201).send(commentsByPOSTID[req.params.id] || []);
})
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPOSTID[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    commentsByPOSTID[req.params.id] = comments;
    res.status(201).send(comments);
});


app.post('/events', async (req, res) => {
    console.log('Recieved event ', req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPOSTID[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                content,
                postId,
            }
        })
    }
    res.send({});
})

app.listen(PORT, () => {
    console.log(`Server is running fine on ${PORT}`);
})