

const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const bucketListItemRoutes = require('./routes/api/bucketListItem')
const path = require("path")

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

const { PORT, mongoUri } = require('./config')

mongoose.connect(mongoUri, {

    useUnifiedTopology: true,

}).then(() => console.log('MongoDB database Connected ...')).catch(err => console.error(err))
app.use('/api/bucketListItems', bucketListItemRoutes)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}
app.listen(PORT, () => {
    console.log(`  Listening on http://localhost:${PORT}`);
});



