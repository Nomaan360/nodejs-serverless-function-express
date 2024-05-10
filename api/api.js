import nodemailer from 'nodemailer';
import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors({origin: 'https://sendmailreact-p69o.vercel.app'}));

export default function handler(req, res) {
    console.log(req.body); // Log the text fields
    //@ts-ignore
    console.log(req.files); // Log file info if any files are uploaded

    const { sender, to, subject, text,uname,unumber,uemail,uexperience } = req.body;
    //@ts-ignore
    const attachments = req.files.map(file => ({
        filename: file.originalname,
        content: file.buffer
    }));
    const transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        auth: {
            user: 'info@vitnixx.com',
            pass: 'Vtc@@7899'
        }
    });

    const mailOptions = {
        from: sender,
        to: to,
        subject: subject,
        html: `<p>You have received a new message from your website contact form.</p>Here are the details:<br><br> Name: ${uname}<br> Email: ${uemail}<br> Phone: ${unumber}<br> Experience: ${uexperience}<br> Message: ${text}`,
        attachments: attachments
    };
    res.setHeader('Access-Control-Allow-Origin', 'https://sendmailreact-p69o.vercel.app');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    try {
        // Simulate email sending logic
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Send Mail Error:', error);
               return res.status(500).json({ error: 'Email not sent' });
            } else {
                console.log('Email sent:', info.response);
               return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
   
        
        // For demonstration assuming success:
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return res.status(500).json({ error: 'Failed to process your request' });
    }
}
