require('dotenv').config()

const express = require('express')

const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// middleware
// Manipuler facilement les données JSON envoyées par le client
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Utilisation des routes de 'workoutRoutes' sur la route 'api/workouts'
app.use('/api/workouts', workoutRoutes)

// Connexion à la BDD Mongo avec mongoose
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
      })
    })
    .catch((error) => {
        console.log(error)
    })




