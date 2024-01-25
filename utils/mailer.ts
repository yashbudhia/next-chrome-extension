import nodemailer from "nodemailer";
import bcryptjs from bcryptjs;

export default async function sendEmail({ email, userId }: any) {
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(),10);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
