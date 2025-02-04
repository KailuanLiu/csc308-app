// index.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get users with query filters for name/job
app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  try {
    const result = await userService.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error");
  }
});

// Get user by ID
app.get("/users/:_id", (req, res) => {
  const _id = req.params["_id"];
  
  userService
    .findUserById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("resources not found");
      }
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("internal server error");
    });
});

// Create a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  userService 
  .addUser(userToAdd)
  .then((addedUser) => {
    res.status(201).send(addedUser);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("failed to add user");
  });
});

// delete user by id 
app.delete("/users/:_id", (req, res) => {
  const _id = req.params["_id"];

  userService
    .deleteUserById(_id) 
    .then((success) => {
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send("resource not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("internal server error");
    });
});


// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
