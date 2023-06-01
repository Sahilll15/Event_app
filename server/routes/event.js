const express = require('express')
const router = express.Router();
const { addEvent, deleteEvent, getEvents, updateEvents, getOneEvents, getUserEvents } = require('../controllers/eventcontrollers')
const { verifytoken } = require('../middleware/verifytoken')


router.post('/add', verifytoken, addEvent)
router.delete('/delete/:id', verifytoken, deleteEvent)
router.get('/get', verifytoken, getEvents)
router.get('/get/:id', verifytoken, getOneEvents)
router.get('/get/:userId', verifytoken, getUserEvents)
router.put('/update/:id', verifytoken, updateEvents)

module.exports = router;
