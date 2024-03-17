import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateJWT.js";

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error in login controller", err);
    return res.status(500).json({ error: "login Failed" });
  }
}

export default login;
