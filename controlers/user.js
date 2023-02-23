const userModel = require("../schema/userschema");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  try {
    await userModel.create({ username, password, confirmpassword });
    res.json({ success: true, message: "success" });
  } catch (error) {
    res.json({ success: false, message: "enter unique username" });
  }
};
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await userModel.findOne({ username });
    if (userExists) {
      const token = await jwt.sign(
        { id: userExists._id, username: userExists.username },
        process.env.KEY,
        {
          expiresIn: "24h",
        }
      );
      const isMatch = userExists.password === password;
      if (isMatch) {
        res.json({ success: true, message: "Login successfull!", token });
      } else {
        res.json({ success: false, message: "Invalid Details!" });
      }
    } else {
      res.json({ success: false, message: "User does not exist!" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

module.exports = { userRegister, userLogin };
