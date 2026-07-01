const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


if (process.env.VERCEL !== '1') {
    app.use(express.static(__dirname + '/../frontend'));
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));


const activitySchema = new mongoose.Schema({
    date: String,
    category: String,
    activityType: String,
    quantity: Number,
    co2: Number
});

const Activity = mongoose.model('Activity', activitySchema);

app.get('/api/activities', async function(req, res) {
    try {
        var activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.json([]);
    }
});

app.post('/api/activities', async function(req, res) {
    var date = req.body.date;
    var category = req.body.category;
    var activityType = req.body.activityType;
    var quantity = req.body.quantity;
    var co2 = req.body.co2;
    
    if (date != "" && category != "" && activityType != "" && quantity > 0 && co2 > 0) {
        var newEntry = {
            date: date,
            category: category,
            activityType: activityType,
            quantity: Number(quantity),
            co2: Number(co2)
        };

        try {
            var createdActivity = await Activity.create(newEntry);
            res.status(201).json(createdActivity);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save to database.' });
        }
    } else {
        res.status(400).json({ error: 'Woops, missing some required fields! Make sure everything is filled out correctly.' });
    }
});

app.delete('/api/activities', async function(req, res) {
    try {
        await Activity.deleteMany({});
        res.json({ message: 'All activities wiped. A fresh start! 🌍' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to wipe database.' });
    }
});


if (process.env.VERCEL !== '1') {
    app.listen(PORT, function() {
        console.log("Server running on port " + PORT);
    });
}


module.exports = app;
