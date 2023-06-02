const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('./api/thoughts').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions
router.route('/api/thoughts/:thoughtId/reactions').get(getOneThought);

module.exports = router;