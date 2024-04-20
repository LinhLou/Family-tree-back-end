import nodemailer from 'nodemailer';
import config from '../config.js';

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "linhlou@outlook.fr",
    pass: "LiamDan11<3",
  },
});


export default async function sendLink(email, token) {
  const message = {
    from: 'LinhLou👻" <linhlou@outlook.fr>', // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Sending with nodejs", // plain text body
    html: `Here is the link to reset your password:
    <a href= "${config.appURL}/reset-password/${token}" >Reset your password</a>
    `, // html body
  };
  try {
    // const info = await transporter.sendMail(message);
    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.log(error);
  }
}
