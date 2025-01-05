const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://CS_HOSPITALS:Gq1ixBRGVMb8BdH7@cluster0.tt3fg.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(err => console.error('MongoDB Atlas connection error:', err));

// Routes
app.use('/appointments', appointmentRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
