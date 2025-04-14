//This section demostrates how DOM Elements
const form=document.getElementById("resourceForm");
const resourceList=document.getElementById("resourceList");
const counter=document.getElementById("counter");
const searchInput=document.querySelector(".search-input");
const filterButton=document.querySelectorAll(".filter-btn");

//This section demonstrates how to handle a state management in JS
let resources=JSON.parse(localStorage.getItem("resources")) || [];
let currentFilter="All";
let searchTerm="";

//This section demonstrates how to handle search functionality
function handleSearch(event) {
    searchTerm = event.target.value.toLowerCase();
    renderResource();
}

//This section demonstrates how to render resources
function renderResource() {
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm);
        const matchesFilter = currentFilter === "All" || resource.type === currentFilter;
        return matchesSearch && matchesFilter;
    });

    resourceList.innerHTML = filteredResources.map(resource => `
        <li>
            <strong>${resource.name}</strong> (${resource.type}) - ${resource.location}
            <button data-id="${resource.id}" class="delete-btn">Delete</button>
        </li>
    `).join("");
}

//This section demonstrates how to update the counter
function updateCounter() {
    counter.textContent = `Total Resources: ${resources.length}`;
}


//This section demontrates how we should initialize our Javascript application
    function init(){
        renderResource();
        bindEvents();
        updateCounter();
    }

    //This section demonstrates how to bind events to Javascript   
    function bindEvents(){
        form.addEventListener("submit",handleFormSubmit);
        resourceList.addEventListener("click", handleResourceClick);
        searchInput.addEventListener("input", handleSearch);
        filterButton.forEach(btn => btn.addEventListener("click", handleFilter));
        
        function handleResourceClick(event) {
            if (event.target.classList.contains("delete-btn")) {
                const resourceId = event.target.getAttribute("data-id");
                deleteResource(resourceId);
            }
        }

        function handleFilter(event) {
            currentFilter = event.target.getAttribute("data-filter");
            renderResource();
        }

        function deleteResource(resourceId) {
            resources = resources.filter(resource => resource.id !== resourceId);
            localStorage.setItem("resources", JSON.stringify(resources));
            renderResource();
            updateCounter();
        }
    }
    
//This section demonstrates how to handle events
    function handleFormSubmit(event){
        event.preventDefault();
        const formData=new FormData(form);
        const resource={
            name:formData.get("resourceName"). trim(),
            type:formData.get("resourceType"),
            location:formData.get("resourceLocation"). trim(),
            id :Date.now(). toString(),
            dateAdded: new Date().toLocaleDateString(),
        };
        if(validForm(resource)){
            addResource(resource);

            function addResource(resource) {
                resources = resources || [];
                resources.push(resource);
                localStorage.setItem("resources", JSON.stringify(resources));
                renderResource();
                updateCounter();
            }
            form.reset();
            clearError();
            }
    
            //This section demonstrates how to implement form Validation in Jvascript
            function validForm(resource){
                let invalid = true;
                if(!resource.name) {
                    showError("nameError", "Resource name is required");
                    invalid = false;
                }
                if(!resource.type) {
                    showError('typeError', 'Resource type is required');
                    invalid = false;
                }
                if(!resource.location) {
                    showError('locationError', 'Resource location is required');
                    invalid = false;
                }
                return invalid;
            }
    
            function showError(elementId, message){
                const element = document.getElementById(elementId);
                element.textContent = message;
            }
    
            function clearError(){
                document.querySelectorAll(".error").forEach(errorElement => {
                    errorElement.textContent = "";
                });
            }
        }
