 const noteBtn= document.getElementById("noteBtn")
 const toDoBtn= document.getElementById("toDoBtn")
 const Notecolors= document.getElementsByClassName("Notecolors")[0]
 const main= document.getElementsByTagName("main")[0]
 const NodeBar =document.getElementById("NodeBar")
 let LocalStorgeArr=[]
 

    const ColorsDiv = document.createElement("div");
    const purple = document.createElement("button");
    purple.setAttribute("id","purple")
    const red = document.createElement("button");
    red.setAttribute("id","red")
    const green = document.createElement("button");
    green.setAttribute("id","green")
    const oringe  = document.createElement("button");
    oringe.setAttribute("id","oringe")
    const blue  = document.createElement("button");
    blue.setAttribute("id","blue")
    ColorsDiv.append(purple , red, green,oringe,blue)
    Notecolors.appendChild(ColorsDiv)
    Notecolors.style.display="none"

  noteBtn.addEventListener("click" , ()=>{
    Notecolors.style.display="block"
  });


  red.addEventListener("click", ()=>{

    createPopup("#ff9b73") 
})
  

purple.addEventListener("click", ()=>{

    createPopup("#b38bfa") 
})
blue.addEventListener("click", ()=>{

    createPopup("#43e6fc") 
})
green.addEventListener("click", ()=>{
 
    createPopup("#e5f493") 
})
 
oringe.addEventListener("click", ()=>{
  
    createPopup("#ffc972") 
})






  function createPopup(color){

    const popdiv=document.createElement("div");
    popdiv.setAttribute("class","popup");

    const NoteH1=document.createElement("h1");
    NoteH1.textContent=" Note "
    NoteH1.style.color="white"
    NoteH1.style.textAlign="center"

    const inputTitle= document.createElement("input")
    inputTitle.setAttribute("type","text")
    inputTitle.setAttribute("placeholder","tilte")
    inputTitle.setAttribute("class","borderElements")
    inputTitle.textContent=color;

    const textarea= document.createElement("textarea")
    textarea.setAttribute("class","borderElements")

    const addNote=document.createElement("button")
    addNote.textContent=" Add Note "
    addNote.style.color=color
    addNote.setAttribute("class","borderElements addNote")
    
    const closeNote=document.createElement("button")
    closeNote.setAttribute("class","close");
    closeNote.innerHTML=`<i class="fa-solid fa-xmark"></i>`
    popdiv.style.backgroundColor=color

    popdiv.append(NoteH1,inputTitle,textarea, addNote,closeNote)
    main.appendChild(popdiv)

    closeNote.addEventListener("click",()=>{
        popdiv.style.display="none"
    })
    addNote.addEventListener("click",()=>{
        if( inputTitle.value!=""&&textarea.value !="" ){
            let obj={
                Title: inputTitle.value,
                Contain:textarea.value,
                color:color
            }

            if(localStorage.getItem("Notes")!=null){
              LocalStorgeArr=JSON.parse(localStorage.getItem("Notes"))
          
            }
            LocalStorgeArr.push(obj)
            window.localStorage.setItem("Notes", JSON.stringify(LocalStorgeArr))
            popdiv.style.display="none"
            document. location. reload()
            }}
    )
    

  }
  displayLocalStorgeNotes()

function displayLocalStorgeNotes(){
   let localItem =JSON.parse(localStorage.getItem("Notes"))
   localItem.forEach(element => {
    const containerDiv=document.createElement("div")
    containerDiv.setAttribute("class", "diplayedNote")
    containerDiv.style.backgroundColor=element.color
    const editIcon = document.createElement("i")
    editIcon.setAttribute("class", "fa-solid fa-pen-to-square")
    const titel=document.createElement("h2")
    titel.textContent=element.Title
    const content=document.createElement("p")
    content.textContent=element.Contain
    containerDiv.append(editIcon,titel,content)
    NodeBar.appendChild(containerDiv)
   
   });
 

  
}

{/* <i class="fa-solid fa-circle-heart"></i> */}