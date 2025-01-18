// src/MyApp.jsx 
// src/MyApp.jsx is imported only as src/MyApp
// Vite may find files that are actually in JavaScript with (.js), (.ts), or (.tsx)
// Vite will convert these files and covert them to JavaScript to satisfy import
import React from "react";
import Table from "./Table";
import { useState, useEffect } from "react";
import Form from "./Form"


function MyApp() {
  // update the table if POST call is successful
  // succesfful if promise is returned by postUser
  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
  }  
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

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
  return (
    <div className = "container">
      <Table characterData = {characters} 
      removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
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

  function updateList(person) {
    postUser(person)
    .then(() => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    })
  }

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

  function updateList(person) {
    postUser(person)
    .then(() => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    })
  }

}

  
// makes the component available
export default MyApp;