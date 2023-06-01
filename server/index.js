const express = require('express')
const cors = require('cors')
const authroutes = require('./routes/auth')
const eventroutes = require('./routes/event')

const myDb = require('./db')
const app = express()
app.use(express.json())
app.use(cors())



const port = 4000 || 6000



app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})

myDb.myDb();

app.use('/api/auth', authroutes)
app.use('/api/event', eventroutes)



