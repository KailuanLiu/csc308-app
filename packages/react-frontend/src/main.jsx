// src/main.jsx, 
// jsx is an extension to JavaScript, allows us to write HTML like expression
// Vite transpile the HTML expression to standard JavaScript
import React from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
// react component (MyApp) - injected into the root of an HTML page
// in index.html file - can see where id="root" occurs
root.render(<MyApp />);