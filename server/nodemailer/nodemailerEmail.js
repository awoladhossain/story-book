import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter } from "./nodemailer.config.js";

export const verificationEmailWithToken = async (email, token) => {
  try {
    const response = await transporter.sendMail({
      from: '"Verification" <awoladh04@gmail.com>',
      to: email,
      subject: "Verify Your Email Address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
    });
    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.log("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const welcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Welcome" <awoladh04@gmail.com>',
      to: email,
      subject: "Welcome to Our Service",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
    console.log("Welcome email sent successfully", response.messageId);
  } catch (error) {
    console.log("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {};
