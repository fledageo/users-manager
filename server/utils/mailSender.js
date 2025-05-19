const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY
    }
})

module.exports = async function (email, token, type) {
    let activationLink;
    const mail = {
        from: `"David's Users-Manager App" <${process.env.EMAIL}>`,
        to: email,
    };
    if (type === "invite") {
        activationLink = `http://localhost:5173/activate?token=${token}`
        mail.subject = "You're invited to join our users list;)"
        mail.html = `<h3>Welcome! Click <a href="${activationLink}">here</a> to continue activation your account.</h3>`
    } else {
        activationLink = `http://localhost:5173/reset/password?token=${token}`
        mail.subject = "Reset your password"
        mail.html = `<h3>Click <a href="${activationLink}">here</a> to change your password.</h3>`
    }

    return transporter.sendMail(mail);
}