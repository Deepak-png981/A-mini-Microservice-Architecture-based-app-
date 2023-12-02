const express = require('express');
const router = express.Router();
const {
    postThePost, getAllPost
} = require('../controllers/controller');
router.post('/', postThePost);
router.get('/', getAllPost);
module.exports = router;