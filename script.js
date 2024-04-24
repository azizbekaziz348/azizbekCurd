let UIdata = document.getElementById('data');
let form = document.getElementById('form');
let name = document.getElementById('name');
let date = document.getElementById('date');
let ball = document.getElementById('ball');
let btn = document.getElementById('btn');

let  error = document.getElementById('error'); 
let success = document.getElementById('success');

//Edit modal

let  editModal = document.getElementById('editModal'); 
let  closeModal = document.querySelector('.modal__close'); 
let  editModalForm = document.querySelector('.edit__todo__form form'); 
let  editInput = document.getElementById('editInput'); 

let data = [];

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log("working.....");

  checkInputs();
});


// ======================= Edit data start ======================= \\

editModalForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const todoIt = +editInput.dataset.todoIt;
  if (editInput.value == "") {
    error.innerHTML = "Please enter data";
    success.innerHTML = "";
    return;
  }else {
    error.innerHTML = "";
    success.innerHTML = "Data has been successfully entered"
    updateEditData(editInput.value, todoIt);
  } 
});
function updateEditData (editinp, id) {
  let todoindex = data.findIndex(function(todoIt) {
    return todoIt.id === id;
  });
  data[todoindex].name = editinp;
  localStorage.setItem('data', JSON.stringify(data));
  hideModal();
  read();
}

function showModal(name, todoIt) {
  editModal.style.display = "flex";
  editInput.value = name;
  editInput.dataset.todoIt = todoIt;
}

function hideModal () {
  editModal.style.display = "none"  
}

closeModal.addEventListener('click', function () {
  hideModal();  
})

function editData(id) {
  let idx = data.find(function (id2) {
    return id2.id === id;
  });
  
  showModal(idx.name, id);
}

// ======================= Edit data end ======================= \\

function checkInputs () {
  if(name.value == "" || date.value == "" || ball.value == ""){
    console.log("malumot kiritiing");
    error.innerHTML = "Please enter data"; 
    success.innerHTML = "";
    return;
  }  else{
    error.innerHTML = "";
    success.innerHTML = "Data has been succesfully entered"
    create();
  }
}

function uniqueId(id) {
  if (!id.Length) {
    return 1;
  } else {
    return data[data.length - 1].id + 1
  }
}

function create() {
  data.push({
    id: uniqueId(data),
    name: name.value,
    date: date.value,
    ball: ball.value
  });
  localStorage.setItem('data', JSON.stringify(data));     
  console.log(data);
  read();
}

( function () {
  data = JSON.parse(localStorage.getItem('data'));
  read();
});

function delateData (id) {
  let idx = data.indexOf(function (id2) {
    return id === id2;
  });
  
  
  data.splice(idx, 1);
  console.log(data);
  read();
}

function read() {
  UIdata.innerHTML = '';
  data.sort(function(a , b){return b.ball - a.ball}).map((obj, id) => {
    return (
      UIdata.innerHTML += `
      <tr>
        <td>${id + 1}</td>
        <td>${obj.name}</td>
        <td>${obj.date}</td>
        <td>${obj.ball}</td>
        <td><i class="fa-solid fa-pen-to-square" onclick="editData(${obj.id})"></i></td>
        <td><i class="fa-solid fa-trash" onclick="delateData(${obj.id})"></i></td>
      </tr>
      `
    );
  });
  name.value = "";
  date.value = "";
  ball.value = "";
}
