import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "awoladh04@gmail.com",
    pass: process.env.MAIL_SECRET_KEY, // Gmail App Password
  },
});

// const sendEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"Job Vacancy" <awoladh04@gmail.com>',
//       to: "0962120005101013@isu.ac.bd",
//       subject: "Hello ✔",
//       text: "Hello world?",
//       html: "<b>Hello world?</b>",
//     });
//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// sendEmail();
