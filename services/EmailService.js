// Configure email
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

//------------------ Send Email ------------------//
const sendEmail = async (to, subject, data) => {

    const templatePath = path.join(__dirname, '../templetes/WelcomeEmail.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    htmlContent = htmlContent.replace('{{heading}}', data.heading);
    htmlContent = htmlContent.replace('{{username}}', data.username);
    htmlContent = htmlContent.replace('{{link}}', data.link);
    htmlContent = htmlContent.replace('{{message}}', data.message);

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