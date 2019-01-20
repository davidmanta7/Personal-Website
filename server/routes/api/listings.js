const express = require('express');
const router = express.Router();

//Item model
const Listing = require('../../Models/Listing');

// @route GET api/listings
// @desc Get all listings
// @access Public

router.get('/', (req,res) => {
  Listing.find()
    .sort({day: 1})
    .then(listings => res.json(listings))
});

// @route POST api/listings
// @desc Create a listing
// @access Public

router.post('/', (req,res) => {
  const newListing = new Listing({
    day: req.body.day,
    time: req.body.time,
    building: req.body.building,
    room: req.body.room,
    name: req.body.name,
    duration: req.body.duration,
    category: req.body.category
  });
  newListing.save().then(listing => res.json(listing));

});

// @route DELETE api/listings
// @desc Delete a listings
// @access Public

router.delete('/:id', (req,res) => {
  Listing.findById(req.params.id)
    .then(listings => Listing.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
