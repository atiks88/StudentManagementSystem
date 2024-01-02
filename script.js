const form =document.getElementById("form");
const tbody = document.getElementById("tbody");
const employees = [];

let editing= {
    isediting :false,
    rowElement :null
}

form.addEventListener("submit",(event) => {
    event.preventDefault();

    let  employee ={
        name : event.target.name.value,
        email: event.target.email.value,
        salary: event.target.salary.value,
        company: event.target.company.value,
        role: event.target.role.value,
        gender: event.target.gender.value
    }

    if(editing.isediting){
      updateEmployee(employee);
    }
    else{
        addData(employee);
    }
})

function addData(employee){

    for(let i = 0; i<employees.length; i++){
        let e = employees[i];
        if(e.email===employee.email){
            form.elements.email.value = "";
            alert("This Email has been already in use");
            return;
        }
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${employee.name}</td>
    <td>${employee.email}</td>
    <td>${employee.salary}</td>
    <td>${employee.company}</td>
    <td>${employee.role}</td>
    <td>${employee.gender}</td>
    <td><button onclick="deleteEmployee(this)" data-email="${employee.email}">Delete</button>
    <button  onclick="editFun(event)">Edit</button></td>`;
  

    tbody.appendChild(tr);
    employees.push(employee);
    form.reset();
}

function deleteEmployee(buttonRef){
    let emailId = buttonRef.getAttribute("data-email");
 
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].email === emailId) {
            employees.splice(i, 1);
            break;
        }
    }
 
    buttonRef.parentNode.parentNode.remove();
 }

 function editFun(event) {
    let lastButton = form.lastElementChild;
    form.name.value = event.target.parentElement.parentElement.cells[0].innerText;
    form.email.value = event.target.parentElement.parentElement.cells[1].innerText;
    form.salary.value = event.target.parentElement.parentElement.cells[2].innerText;
    form.company.value = event.target.parentElement.parentElement.cells[3].innerText;
    form.role.value = event.target.parentElement.parentElement.cells[4].innerText;
    form.gender.value = event.target.parentElement.parentElement.cells[5].innerText;
    lastButton.innerText = "UPDATE Employee";

    editing= {
        isediting :true,
        rowElement:event.target.parentNode.parentNode
    }
   
}

function updateEmployee(employee){
    const rowElement = editing.rowElement;

    let lastButton = form.lastElementChild;
    let cells = rowElement.querySelectorAll("td");

    cells[0].innerText = employee.name;
    cells[1].innerText = employee.email;
    cells[2].innerText = employee.salary;
    cells[3].innerText = employee.company;
    cells[4].innerText = employee.role;
    cells[5].innerText = employee.gender;
    lastButton.innerText = "ADD Employee";

    form.reset();

}