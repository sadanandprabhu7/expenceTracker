const uuid = require("uuid");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");

// const env = require("dotenv");

// env.config();

const User = require("../model/user");
const Forgotpassword = require("../model/resetpassword");

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const id = uuid.v4();
      const obj = new Forgotpassword({
        id: id,
        active: true,
        expiresby: new Date(),
        userId: user,
      });
      await obj.save();
      res.json({
        id: id,
        html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
      });

      // sgMail.setApiKey(process.env.SENGRID_API_KEY);

      // const msg = {
      //   to: email, // Change to your recipient
      //   from: "yj.rocks.2411@gmail.com", // Change to your verified sender
      //   subject: "Sending with SendGrid is Fun",
      //   text: "and easy to do anywhere, even with Node.js",
      //   html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
      // };

      //     sgMail
      //       .send(msg)
      //       .then((response) => {
      //         // console.log(response[0].statusCode)
      //         // console.log(response[0].headers)
      //         return res.status(response[0].statusCode).json({
      //           message: "Link to reset password sent to your mail ",
      //           sucess: true,
      //         });
      //       })
      //       .catch((error) => {
      //         throw new Error(error);
      //       });

      //     //send mail
      //   } else {
      //     throw new Error("User doesnt exist");
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, sucess: false });
  }
};

const resetpassword = async (req, res) => {
  try {
    const id = req.params.id;
    await Forgotpassword.findOneAndUpdate({ id: id }, { active: false });
    res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`);
    res.end();
  } catch (e) {
    return res.status(403).json({ e, success: false });
  }
};

const updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const userData = await Forgotpassword.findOne({ id: resetpasswordid });
    const user = await User.findOne({ id: userData.userId });
    if (user) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        if (err) {
          throw new Error(err);
        }
        bcrypt.hash(newpassword, salt, async function (err, hash) {
          if (err) {
            throw new Error(err);
          }
          await user.updateOne({ password: hash });
          res
            .status(201)
            .json({ message: "Successfully updated the new password" });
        });
      });
    } else {
      return res.status(404).json({ error: "No user Exists", success: false });
    }
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  updatepassword,
  resetpassword,
};
