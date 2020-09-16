const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const app = express();

// View Engine Set-up
app.set("view engine", "ejs");

// Static Folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Add Body-parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home", {
    layout: false,
  });
});

app.get("/shop", (req, res) => {
  res.render("shop", {
    layout: false,
  });
});

app.get("/order", (req, res) => {
  res.render("orderPage", {
    layout: false,
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    layout: false,
  });
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new Contact Details</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone-Number: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: "rupanreal7@gmail.com", // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "rupanreal7@gmail.com", // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Merchendise Order", // Subject line
    // text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
});






const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log("Port Working");
});

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rupanreal7@gmail.com",
//     pass: "LionelMessiLM10",
//   },
// });

// var mailOptions = {
//   from: "rupanreal7@gmail.com",
//   to: "pijushb1965@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });