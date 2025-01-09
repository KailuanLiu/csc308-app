// src/MyApp.jsx 
// src/MyApp.jsx is imported only as src/MyApp
// Vite may find files that are actually in JavaScript with (.js), (.ts), or (.tsx)
// Vite will convert these files and covert them to JavaScript to satisfy import
import React from "react";
import Table from "./Table";
import { useState } from "react";

const characters = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Dee",
    job: "Aspiring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor"
    }
  ]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
  return (
    <div className = "container">
      <Table characterData = {characters} />
    </div>
  );
}

// makes the component available
export default MyApp;