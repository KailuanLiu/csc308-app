import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);  // For error handling

  function fetchUsers() {
    return fetch("http://localhost:8000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching users: ${res.statusText}`);
        }
        return res.json();
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((json) => 
        setCharacters(json["users_list"].map(user => ({
          ...user,
          id: user._id.toString(),
        })))
      )
      .catch((error) => {
        setError(error.message); // Set error message to state
        console.log(error); // Also log it to the console for debugging
      });
  }, []);

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to post user: ${res.statusText}`);
      }
      return res.json();
    });
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => {
        setCharacters(prevCharacters => [...prevCharacters, newUser]);
      })
      .catch((error) => {
        setError(error.message); // Handle error gracefully
        console.log("Error posting user:", error);
      });
  }

  function removeOneCharacter(userId) {
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete user: ${res.statusText}`);
        }
        setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== userId));
      })
      .catch((error) => {
        setError(`Error deleting user: ${error.message}`); // Show a more specific error message to the user
        console.error("Error deleting user:", error);
      });
  }
  

  return (
    <div className="container">
      {error && <p className="error-message">Error: {error}</p>}  {/* Display error if any */}
      
      <Table
        characterData={characters}
        removeCharacter={(userId) => removeOneCharacter(userId)} // Pass only userId
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
