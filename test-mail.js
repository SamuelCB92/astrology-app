import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0f00c388cf7f45",
    pass: "8c7db02b40f288",
  },
});

transporter
  .sendMail({
    from: "sam.makes.programs@gmail.com",
    to: "teste@mailtrap.io",
    subject: "Test",
    text: "Hello World",
  })
  .then(() => console.log("Email enviado!"))
  .catch(console.error);
