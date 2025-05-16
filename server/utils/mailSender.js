const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        password: process.env.EMAIL_KEY
    }
})

module.exports = async function (email, token) {
    const activationLink = `"http://localhost:5173/activate?token=${token}"`;
    const mail = {
        from: `"David's Users-Manager App" <${process.env.EMAIL}>`,
        to: email,
        subject: "You're invited to join our list of users ;)",
        html: `<p>Welcome! Click <a href="${activationLink}">here</a> to continue activation your account.</p>`
    };

    return transporter.sendMail(mail);
}