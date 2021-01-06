const express = require('express');
const mongoose = require('mongoose');
const Exigir = require('../Medio/exigir');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(Exigir);

router.get('/tracks', async (req, res) => {
    try {
        const tracks = await Track.aggregate({ userId: req.user._id });
        res.send(tracks);
    } catch (err) {
        res.status(422).send(console.log(err));
    }
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ error: 'Debe proporcionar un nombre y ubicacion' });
    }

    try {
        const track = new Track({ locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;