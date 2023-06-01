const mongoose = require('mongoose')
const Event = require('../models/eventModel')

module.exports.addEvent = async (req, res, next) => {
    const { title, description, location, time, pricing, organizer } = req.body;


    try {
        const event = await Event.create({
            title,
            description,
            location,
            time,
            pricing,
            organizer,
        });
        res.status(200).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(400).json({ message: "Event creation failed", error });
    }
};

module.exports.deleteEvent = async (req, res, next) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ mssg: "Event does not exist" });
        }

        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ mssg: "Event deleted successfully", event });
    } catch (error) {
        res.status(400).json({ mssg: "Event deletion failed", error });
    }
};

module.exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().populate('organizer', 'name email');
        res.status(200).json({ message: "Events fetched successfully", events })

    } catch (error) {
        res.status(400).json({ message: "Events fetching failed", error })

    }
}

module.exports.getOneEvents = async (req, res, next) => {
    const id = req.params.id;
    try {

        const event = await Event.findById(id).populate('organizer', 'name email');
        res.status(200).json({ message: "Events fetched successfully", event })

    } catch (error) {
        res.status(400).json({ message: "Events fetching failed", error })

    }
}

module.exports.getUserEvents = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const events = await Event.find({ organizer: userId });
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve events" });
    }
}

module.exports.updateEvents = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, location, time, pricing, organizer } = req.body;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(400).json({ mssg: "Event does not exist" });
        }
        await Event.findByIdAndUpdate(id, {
            title,
            description,
            location,
            time,
            pricing,
            organizer,
        });
        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(400).json({ message: "Event updation failed", error });

    }
}
