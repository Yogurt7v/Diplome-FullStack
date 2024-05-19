import axios from "axios";

function transformUser(dbUser) {
  return {
    id: dbUser._id,
    login: dbUser.login,
    roleId: dbUser.role_id,
    registeredAt: dbUser.createdAt,
    address: dbUser.address,
    homeNumber: dbUser.homeNumber,
    flatNumber: dbUser.flatNumber,
    phone: dbUser.phone,
  };
}

export const getUsersFetch = async () => {

  const users = await axios.get("/users");
  const modifyUsers = users.data.map(transformUser);
  return  modifyUsers
};
