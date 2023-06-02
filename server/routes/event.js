const express = require('express')
const router = express.Router();
const { addEvent, deleteEvent, getEvents, updateEvents, getOneEvents, getUserEvents, searchEvents } = require('../controllers/eventcontrollers')
const { verifytoken } = require('../middleware/verifytoken')


router.post('/add', verifytoken, addEvent)
router.delete('/delete/:id', verifytoken, deleteEvent)
router.get('/get', verifytoken, getEvents)
router.get('/get/:id', verifytoken, getOneEvents)
router.get('/getuser/:userId', verifytoken, getUserEvents)
router.put('/update/:id', verifytoken, updateEvents)
router.get('/search/:search', verifytoken, searchEvents)

module.exports = router;
