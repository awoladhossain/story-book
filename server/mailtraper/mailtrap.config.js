import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";
dotenv.config();
const TOKEN = process.env.MAIL_TRAP_API_KEY;

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Faculty Opening – Lecturer (CSE Dept)",
};
// const recipients = [
//   {
//     email: "awoladh04@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "Faculty Opening – Lecturer (CSE Dept) | ISU, Dhaka",
//     text: "Dear Candidate,\n\nWe are pleased to inform you that your application for the position of Lecturer in the Computer Science and Engineering Department at International Standard University has been received.For queries, please contact us at +880-1678632583.\n\nBest regards,\nThe Hiring Team",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
