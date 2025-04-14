//This section demostrates how DOM Elements
const form=document.getElementById("resourceForm");
const resourceList=document.getElementById("resourceList");
const counter=document.getElementById("counter");
const searchInput=document.querySelector(".search-input");
const filterButton=document.querySelectorAll;(".filter-btn");

//This section demonstrates how to handle a state management in JS
let resources=JSON.parse(localStorage.getItem("resources"));
let currentFilter="All";
let searchTerm="";
