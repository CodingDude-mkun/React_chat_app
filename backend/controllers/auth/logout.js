function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    console.log("Error in logout controller :", err);
    return res.status(500, "Logout Failed!");
  }
}

export default logout;
