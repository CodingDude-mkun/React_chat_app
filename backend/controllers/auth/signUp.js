import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateJWT.js";

async function signUp(req, res) {
  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't Match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exist" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile pic
    const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    // Create new user
    const newUser = await User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (err) {
    console.log("Error in sign up controller", err);
    res.status(500, "Sign up Failed");
  }
}

export default signUp;
