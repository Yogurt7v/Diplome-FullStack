const express = require("express");
const { getUsers, updateUser, deleteUser } = require("../controllers/User");

const router = express.Router({ mergeParams: true })

  router.get("/", async (req, res) => { 
    const users = await getUsers()
    res.json(users)
  })

  router.patch("/:id", async (req, res) => {
    const users = await updateUser(req.params.id, req.body) 
      res.json(users)
  })

  router.delete("/:id", async (req, res) => {
    const users = await deleteUser(req.params.id)
    res.json(users)
  })



module.exports = router