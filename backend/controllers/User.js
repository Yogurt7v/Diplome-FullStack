const bcrypt = require("bcrypt");
const User = require("../models/User.js");
async function newUserRegister(
  login,
  password,
  address,
  homeNumber,
  flatNumber,
  phone
) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    login: login,
    password: passwordHash,
    address: address,
    homeNumber: homeNumber,
    flatNumber: flatNumber,
    phone: phone,
    role_id: 2,
  });
  console.log("User created");
  return userWithoutPassword = {
    id: user._id,
    login: user.login,
    roleId: user.role_id,
  };
}

async function loginUser(login, password) {

  const user = await User.findOne({ login: login });

  if (!user) {
    return {
      error: "Пользователь не найден",
      res: null,
    }
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      error: "Неверный пароль",
      res: null,
    }
  }
  return {
    error: null,
    res: user
  } ;
}

async function getUsers(name) {

  if (name) {
    const users = await User.find({ login: name });

    return users;
  }
  const users = await User.find();
  return users;
}

function getRoles() {
  return [
    {
      id: 0,
      name: "Admin",
    },
    {
      id: 1,
      name: "Moderator",
    },
    {
      id: 2,
      name: "Client",
    },
    {
      id: 3,
      name: "Guest",
    },
  ];
}

async function deleteUser(id) {
  console.log("User deleted", id);
  return User.deleteOne({ _id: id });
}

async function updateUser(
  id,
  userData
) {

  const updatedUser = await User.findByIdAndUpdate(id, {
    address: userData.address,
    homeNumber: userData.homeNumber,
    flatNumber: userData.flatNumber,
    phone: userData.phone,
    role_id: userData.role_id
  }); 
  console.log("User updated");
  return updatedUser;
}

module.exports = {
  newUserRegister,
  loginUser,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
