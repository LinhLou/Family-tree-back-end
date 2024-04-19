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

let message = {
  from: 'LinhLou👻" <linhlou@outlook.fr>', // sender address
  to: "dang.tn.linh@gmail.com, linhlou@outlook.fr", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Sending with nodejs", // plain text body
  html: `Here the link to reset your password Test:
  <a href= "${config.endpoint}/user" >Lien to Facebook</a>
  `, // html body
};

export default async function sendLink() {
  try {
    // const info = await transporter.sendMail(message);
    const info = await transporter.sendMail(message);
    return info
  } catch (error) {
    console.log(error)
  }
}
