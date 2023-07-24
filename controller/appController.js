const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../envfile.js");
const Mailgen = require("mailgen");

//sending mail from testing account
const signup = async (req, res) => {
  /**create reusable transport object using the default STMP transport */
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "justice.monahan20@ethereal.email",
      pass: "thGAkAdaEZgc3HcYgg",
    },
  });

  let message = {
    from: '"Fred Foo 👻" <justice.monahan20@ethereal.email>', // sender address
    to: "ashuc306@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Successfully registered with us ! ", // plain text body
    html: "<b>Successfully registered with us !</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

//send mail from real gmail account
const getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/"
    }
  });

  let response = {
    body: {
      name:"David Mishra",
      intro: "Your bill has arrived",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "100 rs",
          },
        ],
      },
      outro: "Looking forward to do more buisness",
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Place Order",
    html: mail
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "You should receive an email"
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  signup,
  getbill
};
