// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Configure Nodemailer (replace with your actual email credentials)
let transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail or other email services
    auth: {
        user: 'jatinchoudhary54741@gmail.com', // Your email
        pass: 'nydz dmkd ytsa bjux'   // Your email password
    }
});

// Define an email-sending route
app.post('/send-email', (req, res) => {
    const { email, turf, slot, date } = req.body;  // Get booking details from the request

    const mailOptions = {
        from: 'jatinchoudhary54741@gmail.com',
        to: email,  // Send the email to the user's provided email address
        subject: 'Turf Booking Confirmation',
        text: `Your slot is booked successfully!\n\nGround: ${turf}\nDate: ${date}\nSlot: ${slot}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment port or 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
