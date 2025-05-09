import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
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
      category: "verification",
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
      category: "welcome",
    });
    console.log("Welcome email sent successfully", response.messageId);
  } catch (error) {
    console.log("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: '"Password Reset" <awoladh04@gmail.com>',
      to: email,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "password-reset",
    });
    console.log("Password reset email sent successfully", response.messageId);
    // return response;
  } catch (error) {
    console.log("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendPasswordResetConfirmationEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: '"Password Reset Confirmation" <awoladh04@gmail.com>',
      to: email,
      subject: "Password Reset Confirmation",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{email}", email),
      category: "password-reset-confirmation",
    });
    console.log(
      "Password reset confirmation email sent successfully",
      response.messageId
    );
  } catch (error) {
    console.log("Error sending password reset confirmation email:", error);
    throw new Error(
      `Error sending password reset confirmation email: ${error}`
    );
  }
};
