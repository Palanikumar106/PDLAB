const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text, attachmentBuffer = null) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"donotreplytothisemail" <fakeemail@gmail.com>',
      to,
      subject,
      text,
      attachments: attachmentBuffer
        ? [{
          filename: 'payment_receipt.pdf',
          content: attachmentBuffer,
          encoding: 'base64',
        }]
        : [],
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
