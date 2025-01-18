// index.js
// ES Module syntax
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
   users_list: [
     {
       id: "xyz789",
       name: "Charlie",
       job: "Janitor"
     },
     {
       id: "abc123",
       name: "Mac",
       job: "Bouncer"
     },
     {
       id: "ppp222",
       name: "Mac",
       job: "Professor"
     },
     {
       id: "yat999",
       name: "Dee",
       job: "Aspring actress"
     },
     {
       id: "zap555",
       name: "Dennis",
       job: "Bartender"
     },
     {
      id: "qwe123",
      job: "Zookeeper",
      name: "Cindy"
     }
   ]
 };

app.get("/", (req, res) => {
   res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name);
};

const findUserById = (id) => { 
  return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const id = Math=random().toString(36).substring(2,9);
  const newUser = { ...userToAdd, id };
  addUser(newUser);
  res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.users_list.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users.users_list.splice(userIndex, 1);  // Remove the user
    res.status(204).send();  // Respond with no content (204)
  } else {
    res.status(404).send("User not found");
  }
});


const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  if (name && job) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];  //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found");
  } else {
    res.send(result);
  }
 });

app.listen(port, () => {
   console.log(
      `Example app listening at http://localhost:${port}`
   );
});
