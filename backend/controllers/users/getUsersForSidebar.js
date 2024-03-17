import User from "../../models/user.model.js";

export async function getUserForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getUserForSidebar : ", error);
    res.send(500, { error });
  }
}
