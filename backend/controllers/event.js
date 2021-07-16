const router = require("express").Router();
const Event = require('../models/event');

//add event
exports.addEvent = (req, res) => {
    const {
      title, date, description,venue,time
    } =req.body;
 
    const event = new Event({
        title,
        date,
        description,
        venue,
        time,
  
    });
  event.save(((error, event) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error });
        }
        if (event) {
            res.status(201).json({event});
        }
    }));
  };