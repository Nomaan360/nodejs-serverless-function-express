const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    secure: false,
    auth: {
        user: 'info@vitnixx.com',
        pass: 'Vtc@@7899'
    }
});

app.post('/send',upload.any(), (req, res) => {
    console.log(req.body); // Log the text fields
    console.log(req.files); // Log file info if any files are uploaded

    const { sender, to, subject, text,uname,unumber,uemail,uexperience } = req.body;
    const attachments = req.files.map(file => ({
        filename: file.originalname,
        content: file.buffer
    }));

    const mailOptions = {
        from: sender,
        to: to,
        subject: subject,
        html: `<p>You have received a new message from your website contact form.</p>Here are the details:<br><br> Name: ${uname}<br> Email: ${uemail}<br> Phone: ${unumber}<br> Experience: ${uexperience}<br> Message: ${text}`,
        attachments: attachments
    };
    try {
        // Simulate email sending logic
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Send Mail Error:', error);
                res.status(500).json({ error: 'Email not sent' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
   
        
        // For demonstration assuming success:
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to process your request' });
    }

  
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
