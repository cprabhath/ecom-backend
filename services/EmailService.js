// Configure email
const nodeMailer = require('nodemailer');

//------------------ Send Email ------------------//
const sendEmail = async (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
//----------------------------------------------//


//------------------ Export Module--------------//
module.exports = {
    sendEmail
};
//----------------------------------------------//