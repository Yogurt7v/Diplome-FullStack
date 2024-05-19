import axios from "axios";

export const loginUser = async (authLogin, authPassword) => {
  const user = await axios.post("/login", {
    login: authLogin,
    password: authPassword,
  })
  if (user.data.error) {
    return {
      error: user.data.error,
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id: user.data.res._id,
      login: user.data.res.login,
      roleId: user.data.res.role_id,
    },
  };
};
