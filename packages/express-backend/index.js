// index.js
// ES Module syntax
import express from "express";

const app = express();
const port = 8000;

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
      "id": "qwe123",
      "job": "Zookeeper",
      "name": "Cindy"
     }
   ]
 };

app.get("/", (req, res) => {
   res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// define the /users route
app.get('/users/:id', (req, res) => {
  const id = req.params["id"];  //or req.params.id
  let result = findUserById(id);
  const name = req.query.name;
  if (result === undefined) {
    res.status(404).send("Resource not found");
  } else {
    res.send(result);
  }
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
 });

app.listen(port, () => {
   console.log(
      `Example app listening at http://localhost:${port}`
   );
});