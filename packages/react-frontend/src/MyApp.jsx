/// src/MyApp.jsx ///
// src/MyApp.jsx is imported only as src/MyApp
// Vite may find files that are actually in JavaScript with (.js), (.ts), or (.tsx)
// Vite will convert these files and covert them to JavaScript to satisfy import
import React from "react";
import Table from "./Table";
import { useState, useEffect } from "react";
import Form from "./Form"

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // function returns a promise
  // useful for when we need to wait for an operation to finish
  // GET request through API backend, then return data from back
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      // does not need to check respose status itslef
      // res.json() to parse JS object, return is JSON format
      .then((res)=> res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
      // useEffect hook should be called only when the MyApp 
      // component first mounts by passing an empty array [] 
      // as second argument to useEffect
  }, [] );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  // update the table if POST call is successful
  // succesfful if promise is returned by postUser
  function updateList(person) {
    postUser(person)
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
      throw new Error("Failed to create user");
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function removeOneCharacter(index, userId) {
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    });
    promise
      .then((res) => {
        if (res.status === 204) {
          const updatedCharacters = characters.filter((character, i) => i !== index);
          setCharacters(updatedCharacters);
        } else if (res.status == 404) {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <div className = "container">
      <Table 
        characterData = {characters} 
        removeCharacter={(index, userId) => removeOneCharacter(index, userId)}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}
  
// makes the component available
export default MyApp;