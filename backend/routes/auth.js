const express = require("express");
const { newUserRegister, loginUser, getUsers } = require("../controllers/User");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {

    const checkUser = await getUsers(req.body.login);
    if (checkUser.length > 0) {
      return res.json({ error: "Пользователь с таким логином уже существует", res: null })
    }

    const newUser = await newUserRegister(
      req.body.login,
      req.body.password,
      req.body.address,
      req.body.homeNumber,
      req.body.flatNumber,
      req.body.phone
    )
    res.json({ error: null, res: newUser })
});

router.post("/login", async (req, res) => {
    const user = await loginUser(req.body.login, req.body.password);
    return res.json({ error: user.error, res: user.res });
});

// router.post("/logout", (req, res) => {
//   res.clearCookie("token").json({ error: null });
// });

module.exports = router;
