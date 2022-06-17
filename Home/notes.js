const noteBtn = document.getElementById("noteBtn");
const toDoBtn = document.getElementById("toDoBtn");
const Notecolors = document.getElementsByClassName("Notecolors")[0];
const main = document.getElementsByTagName("main")[0];
const NodeBar = document.getElementById("NodeBar");
let LocalStorgeArr = [];

const ColorsDiv = document.createElement("div");
const purple = document.createElement("button");
purple.setAttribute("id", "purple");
const red = document.createElement("button");
red.setAttribute("id", "red");
const green = document.createElement("button");
green.setAttribute("id", "green");
const oringe = document.createElement("button");
oringe.setAttribute("id", "oringe");
const blue = document.createElement("button");
blue.setAttribute("id", "blue");
ColorsDiv.append(purple, red, green, oringe, blue);
Notecolors.appendChild(ColorsDiv);
Notecolors.style.display = "none";

noteBtn.addEventListener("click", () => {
  Notecolors.style.display = "block";
});

noteBtn.addEventListener("dblclick", () => {
  Notecolors.style.display = "none";
});

red.addEventListener("click", () => {
  createPopup("#ff9b73");
});

purple.addEventListener("click", () => {
  createPopup("#b38bfa");
});
blue.addEventListener("click", () => {
  createPopup("#43e6fc");
});
green.addEventListener("click", () => {
  createPopup("#e5f493");
});

oringe.addEventListener("click", () => {
  createPopup("#ffc972");
});

function createPopup(color) {
  const popdiv = document.createElement("div");
  popdiv.setAttribute("class", "popup");

  const NoteH1 = document.createElement("h1");
  NoteH1.textContent = " Note ";
  NoteH1.style.color = "white";
  NoteH1.style.textAlign = "center";

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("placeholder", "tilte");
  inputTitle.setAttribute("class", "borderElements");
  inputTitle.textContent = color;

  const textarea = document.createElement("textarea");
  textarea.setAttribute("class", "borderElements");

  const addNote = document.createElement("button");
  addNote.textContent = " Add Note ";
  addNote.style.color = color;
  addNote.setAttribute("class", "borderElements addNote");

  const closeNote = document.createElement("button");
  closeNote.setAttribute("class", "close");
  closeNote.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  popdiv.style.backgroundColor = color;

  popdiv.append(NoteH1, inputTitle, textarea, addNote, closeNote);
  main.appendChild(popdiv);

  closeNote.addEventListener("click", () => {
    popdiv.style.display = "none";
  });
  addNote.addEventListener("click", () => {
    if (inputTitle.value != "" && textarea.value != "") {
      let obj = {
        Title: inputTitle.value,
        Contain: textarea.value,
        color: color,
      };

      if (localStorage.getItem("Notes") != null) {
        LocalStorgeArr = JSON.parse(localStorage.getItem("Notes"));
      }
      LocalStorgeArr.push(obj);
      window.localStorage.setItem("Notes", JSON.stringify(LocalStorgeArr));
      popdiv.style.display = "none";
      document.location.reload();
    }
  });
}
displayLocalStorgeNotes();

function displayLocalStorgeNotes() {
  if (localStorage.getItem("Notes") != null) {
    let localItem = JSON.parse(localStorage.getItem("Notes"));
    localItem.forEach((element) => {
      const noteDiv = document.createElement("div");
      noteDiv.setAttribute("class", "diplayedNote");
      noteDiv.style.backgroundColor = element.color;

      const editIcon = document.createElement("i");
      editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
      editIcon.addEventListener("click", editNote);

      const containerDiv = document.createElement("div");
      containerDiv.style.paddingLeft = "15px";

      const titel = document.createElement("h2");
      titel.textContent = element.Title;

      const content = document.createElement("p");
      content.textContent = element.Contain;
      const deleteIcon = document.createElement("button");

      deleteIcon.innerHTML = `<i class="fa-solid fa-xmark xbtn"></i>`;
      deleteIcon.addEventListener("click", deleteNote);
      deleteIcon.setAttribute("class", "deleteBtn");

      const saveBtn = document.createElement("button");
      saveBtn.setAttribute("class", "saveBtn");
      saveBtn.textContent = "save";
      saveBtn.style.display = "none";

      containerDiv.append(titel, content, saveBtn);
      noteDiv.append(deleteIcon, editIcon, containerDiv);
      NodeBar.appendChild(noteDiv);
    });
  }
}

function deleteNote(ele) {
  const item = ele.target.parentElement.parentElement;
  let local = JSON.parse(localStorage.getItem("Notes"));
  console.log(local);
  local.forEach((element) => {
    if (element.Title === item.getElementsByTagName("h2")[0].textContent) {
      local.splice(local.indexOf(element), 1);
      if (local.lenght == 0) {
        localStorage.setItem("Notes", []);
      } else {
        localStorage.setItem("Notes", JSON.stringify(local));
      }

      item.remove();
    }
  });
}

function editNote(ele) {
  const note = ele.target.parentElement;
  let title = note.getElementsByTagName("h2")[0].textContent;
  note.getElementsByTagName("h2")[0].setAttribute("contenteditable", true);

  note.getElementsByTagName("p")[0].setAttribute("contenteditable", true);
  let localSto = JSON.parse(localStorage.getItem("Notes"));

  // document.addEventListener("click", (element)=>{
  //   if (element.target!=note.childNotes){
  //     console.log("shiu")
  //   }
  // })
  const saveBtn = note.getElementsByClassName("saveBtn")[0];
  saveBtn.style.display = "block";

  saveBtn.addEventListener("click", () => {
    localSto.forEach((element) => {
      if (element.Title === title) {
        element.Title = note.getElementsByTagName("h2")[0].textContent;
        element.Contain = note.getElementsByTagName("p")[0].textContent;
        saveBtn.style.display = "none";
      } else {
        console.log(element.Title, title.textContent);
      }
      localStorage.setItem("Notes", JSON.stringify(localSto));
    });
  });
}
