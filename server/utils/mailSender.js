const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY
    }
})

module.exports = async function (email, token) {
    const activationLink = `http://localhost:5173/activate?token=${token}`;
    const mail = {
        from: `"David's Users-Manager App" <${process.env.EMAIL}>`,
        to: email,
        subject: "You're invited to join our users list;)",
        html: `<h3>Welcome! Click <a href="${activationLink}">here</a> to continue activation your account.</h3>`
    };
    return transporter.sendMail(mail);
}