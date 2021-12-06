const settingsModal = document.querySelector(".settings-modal");
const todoTitleInput = document.querySelector(".todo-title-input");
const todoDescriptionInput = document.querySelector(".todo-description-input");
const todoLinkInput = document.querySelector(".todo-link-input");

const addBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");

const openModalBtn = document.querySelector(".settings");

let removeBtns = document.querySelectorAll(".todo-list-remove-btn");

class Modal {
  initializeList = () => {
    let list = subjects.subjects;
    todoList.innerHTML = "";

    list.forEach((subject) => {
      let div = document.createElement("div");
      div.className = "todo-list-item";

      subject.status == "done" ? div.classList.add("todo-list-done") : "";

      div.innerHTML = `
		  <div class="todo-list-item-description">${subject.description}</div>
		  <div class="todo-list-item-right">
			  <div class="todo-list-item-title">${subject.category}</div>
			  <div class="todo-list-remove-btn" data-subjectIndex=${subject.todoCode}><i class="fas fa-trash" data-subjectIndex=${subject.todoCode}></i></div>
		  </div>
		`;

      todoList.appendChild(div);

      removeBtns = document.querySelectorAll(".todo-list-remove-btn");

      removeBtns.forEach((btn) => {
        btn.addEventListener("click", modal.removeSubject);
      });
    });
  };

  addSubject = () => {
    let category = todoTitleInput.value;
    let description = todoDescriptionInput.value;
    let link = todoLinkInput.value;

    let todoCode = subjects.subjects.length;

    subjects.subjects.push({
      category: category,
      description: description,
      status: "none",
      hasLink: link ? true : false,
      link: link,
      todoCode: todoCode,
    });

    let div = document.createElement("div");
    div.className = "todo-list-item";

    div.innerHTML = `
		  <div class="todo-list-item-description">${description}</div>
		  <div class="todo-list-item-right">
			  <div class="todo-list-item-title">${category}</div>
			  <div class="todo-list-remove-btn" data-subjectIndex=${todoCode}><i class="fas fa-trash"></i></div>
		  </div>
		`;

    todoList.appendChild(div);

    let div2 = document.createElement("div");
    div2.className = "todo-div";
    div2.setAttribute("data-todoIndex", todoCode);

    let randomDay = Math.floor(Math.random() * 7);

    div2.innerHTML = `
			<div class="todo-title" data-todoIndex=${todoCode}>${category}</div>

			<div class="todo-description" data-todoIndex=${todoCode}>${description}</div>

			${
        link
          ? `<div class="todo-link-div" data-todoIndex=${todoCode}>
				<a class="todo-link" target="_blank" href="${link}">todo link</a>
			</div>`
          : ""
      }

		  `;

    todoAreas[randomDay].appendChild(div2);
    subjects.days[randomDay].subjects.push({
      category: category,
      description: description,
      status: "none",
      hasLink: link ? true : false,
      link: link,
      todoCode: todoCode,
    });

    todoDivs = document.querySelectorAll(".todo-div");

    todoDivs.forEach((todoDiv) => {
      todoDiv.addEventListener("click", subjects.changeStatus);
    });

    localStorage.setItem("subjects", JSON.stringify(subjects.subjects));
    localStorage.setItem("days", JSON.stringify(subjects.days));
  };

  removeSubject = (e) => {
    let subjectIndex = e.target.dataset.subjectindex;

    let listItem = e.target.parentElement.parentElement;

    if (listItem.className !== "todo-list-item") {
      listItem = e.target.parentElement.parentElement.parentElement;
    }

    todoList.removeChild(listItem);
  };
}

const modal = new Modal();

removeBtns.forEach((btn) => {
  btn.addEventListener("click", modal.removeSubject);
});

addBtn.addEventListener("click", modal.addSubject);

openModal = () => {
  settingsModal.style.display = "flex";
  modal.initializeList();
};

closeModal = () => {
  settingsModal.style.display = "none";
};

openModalBtn.addEventListener("click", openModal);

settingsModal.addEventListener("click", (e) => {
  if (e.target.className == "settings-modal") {
    closeModal();
  }
});
