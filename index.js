// console.log(
//     "hello"
// );

const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);
let globalStore = [];
const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4" >
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger id=${taskData.id}" onclick="deleteCard.apply(this,arguments)" ><i class="fas fa-trash-alt" id=${taskData.id}></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageUrl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
   <p class="card-text">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;



const loadInitialCardData = () => {
    //local storage to tasky card data
    const getCardData = localStorage.getItem("tasky");

    //convet to normal object
    const { cards } = JSON.parse(getCardData);

    //loop over those arrays of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentElement("beforeend", generateNewCard(cardObject));


        //update our globalStore
        globalStore.push(cardObject);
    });

};

const deleteCard = (event) => {
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject)=> cardObject.id != targetId);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

    if(tagname=="BUTTON")
{
    return taskContainer.removeChild(event.target.parent)
}

}

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };



    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
    globalStore.push(taskData);
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

};
