const todoAreas = document.querySelectorAll(".todo-area");
// click for change the status of todo
class Subjects {
  subjects = [];

  days = [
    {
      name: "Monday",
      dayIndex: 0,
      subjects: [],
    },
    {
      name: "Tuesday",
      subjects: [],
      dayIndex: 1,
    },
    {
      name: "Wednessday",
      subjects: [],
      dayIndex: 2,
    },
    {
      name: "Thursday",
      subjects: [],
      dayIndex: 3,
    },
    {
      name: "Friday",
      dayIndex: 4,
      subjects: [],
    },
    {
      name: "Saturday",
      dayIndex: 5,
      subjects: [],
    },
    {
      name: "Sunday",
      dayIndex: 6,
      subjects: [],
      subjects: [],
    },
  ];

  serparateSubjects = () => {
    this.subjects.map((subject) => {
      let randomDayIndex = Math.floor(Math.random() * 7);

      randomDayIndex < 5
        ? (randomDayIndex = Math.floor(Math.random() * 7))
        : "";

      this.days[randomDayIndex].subjects.push({
        ...subject,
      });
    });

    localStorage.setItem("serparated", true);
    localStorage.setItem("days", JSON.stringify(this.days));
  };

  initializeSubjects = () => {
    this.days.map((day) => {
      if (day.subjects.length !== 0) {
        day.subjects.forEach((subject) => {
          let div = document.createElement("div");
          div.className = "todo-div";
          div.setAttribute("data-todoIndex", subject.todoCode);

          this.subjects.map((mainSubjects) => {
            if (mainSubjects.todoCode == subject.todoCode) {
              if (mainSubjects.status == "done") {
                div.classList.add("done-todo");
              }
            }
          });

          div.innerHTML = `
			<div class="todo-title" data-todoIndex=${subject.todoCode}>${
            subject.category
          }</div>

			<div class="todo-description" data-todoIndex=${subject.todoCode}>${
            subject.description
          }</div>

			${
        subject.hasLink
          ? `<div class="todo-link-div" data-todoIndex=${subject.todoCode}>
				<a class="todo-link" target="_blank" href="${subject.link}">todo link</a>
			</div>`
          : ""
      }

		  `;

          todoAreas[day.dayIndex].appendChild(div);
        });
      }
    });
  };

  changeStatus = (e) => {
    let todoIndex = e.target.dataset.todoindex;

    todoDivs = document.querySelectorAll(".todo-div");
    let todo = this.subjects[todoIndex];

    if (todo.status !== "done") {
      todo.status = "done";

      todoDivs.forEach((todoDiv) => {
        if (todoDiv.dataset.todoindex == todoIndex) {
          todoDiv.classList.add("done-todo");
        }
      });
    } else {
      todo.status = "none";

      todoDivs.forEach((todoDiv) => {
        if (todoDiv.dataset.todoindex == todoIndex) {
          todoDiv.classList.remove("done-todo");
        }
      });
    }

    localStorage.setItem("subjects", JSON.stringify(this.subjects));
  };
}

const subjects = new Subjects();

if (localStorage.getItem("subjects")) {
  subjects.subjects = JSON.parse(localStorage.getItem("subjects"));
}

if (localStorage.getItem("days")) {
  subjects.days = JSON.parse(localStorage.getItem("days"));
}

if (!localStorage.getItem("serparated")) {
  subjects.serparateSubjects();
  localStorage.setItem("days", JSON.stringify(subjects.days));
}
subjects.initializeSubjects();
// subjects.serparateSubjects();

let todoDivs = document.querySelectorAll(".todo-div");

todoDivs.forEach((div) => {
  div.addEventListener("click", subjects.changeStatus);
});
