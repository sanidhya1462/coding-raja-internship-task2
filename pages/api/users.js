import Authenticated from "@/helpers/Authenticated";
import users from "@/model/users";

export default async (req, res) => {
  if (req.method === "GET") {
    await fetchUsers(req, res);
  } else if (req.method === "PUT") {
    await changeRole(req, res);
  }
};

const fetchUsers = Authenticated(async (req, res) => {
  const user = await users
    .find({ _id: { $ne: req.userId } })
    .select("-password");
  res.status(200).json(user);
});
const changeRole = Authenticated(async (req, res) => {
  const { _id, role } = req.body;
  const newRole = role == "user" ? "admin" : "user";
  const user = await users
    .findOneAndUpdate({ _id: _id }, { role: newRole }, { new: true })
    .select("-password");
  res.status(200).json(user);
});
