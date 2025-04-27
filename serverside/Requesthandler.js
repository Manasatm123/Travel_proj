import userSchema from "./Models/user.model.js";
import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";
import nodemailer from 'nodemailer'


const { sign } = pkg



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manasaworkmail123@gmail.com",
    pass: "iaxf vrye fxtr xhqw"
  },
});

export async function addUser(req, res) {
  const { username, email, phone, password, confirmPassword } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    if (!(username && email && password&& confirmPassword))
      return res.status(500).send({ msg: "fields are empty" });
    if (password !== confirmPassword) return res.status(500).send({ msg: "pass not match" });
    bcrypt
      .hash(password, 10)
      .then((hpwd) => {
        userSchema.create({ username, email, phone, pass: hpwd });
        res.status(201).send({ msg: "Successfull" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ msg: "Error creating user." });
      });
  } else {
    res.status(500).send({ msg: "email already used" });
  }
}

export async function login(req, res) {
  const { email, pass } = req.body;
  if (!(email && pass))
    return res.status(500).send({ msg: "fields are empty" });
  const user = await userSchema.findOne({ email });
  if (!user) return res.status(500).send({ msg: "email donot exist" });
  const success = await bcrypt.compare(pass, user.pass);
  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" });
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  res.status(201).send({ token });
}

export async function verifyEmail(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(500).send({ msg: "fields are empty" });
  }
  const user = await userSchema.findOne({ email });
  if (user) {
    return res.status(500).send({ msg: "email  exist" });
  } else {
    const info = await transporter.sendMail({
      from: "Travelcompany@gmail.com",
      to: email,
      subject: "verify",
      text: "VERIFY! your email",
      html: `
    <div class=" page" style="width: 500px; height: 300px; display: flex; 
    align-items: center; justify-content: center; flex-direction: column;
     background-color: gainsboro;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; ">
        <h2>Email verification</h2>
        <p>Click This Button to verify its you</p>
        <a href="http://localhost:5173/register"><button style="padding: 5px 15px; border: none; border-radius: 4px; 
        background-color: white;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 18px; color: red; font-style: italic;" >Verify</button></a>
    </div>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ msg: "Verificaton email sented" });
  }
}