const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const exstingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (exstingUser) {
    return res
      .status(400)
      .json({
        success: false,
        message: "UserName or UserEmail already exists",
      });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    password: hashpassword,
    role,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
};

module.exports = { registerUser };
