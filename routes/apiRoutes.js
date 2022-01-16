const express = require("express");
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  deposit,
  withdraw,
  transfer,
  } = require("../controllers/userControllers");

const apiRouter = express.Router();

apiRouter.get("/users/:id", getUser);

apiRouter.get("/users", getAllUsers);

// todo: adding users
apiRouter.post("/users", addUser);

// todo: editing user data
apiRouter.put("/users", editUser);

// todo: delete user
apiRouter.delete("/users/:id", deleteUser);

apiRouter.put("/users/deposit/:id", deposit);

apiRouter.put("/users/withdraw/:id", withdraw);

apiRouter.put("/users/transfer", transfer);

// export default apiRouter;
module.exports = apiRouter;

// good code keep going
