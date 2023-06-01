const mongoose = require('mongoose')
const monoUrl = "mongodb://localhost:27017/event_app"

module.exports.myDb = () => {
    try {
        mongoose.connect(monoUrl)
            .then(() => [
                console.log("DB CONNECTED")
            ])
    } catch (error) {
        console.log(error)
    }

}
