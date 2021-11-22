let ls = localStorage;
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
showNotes();

//Alert Close button scripT

let bar = document.getElementById("closeBar");
let btn = document.getElementById("closeBtn");

if (ls.getItem("close") == "true")
    bar.style.display = 'none';

btn.addEventListener('click', ls.setItem("close", "true"));


function multiLine(txt) {
    if (txt.includes('<br>'))
        return txt.replace(/<br>/g, '\n');
    else
        return txt.replace(/\n/g, '<br>');
}
//Add Notes
function addNote() {
    let empty = document.getElementById('empty-note');
    let notes = ls.getItem('notes');
    let title = document.getElementById('addTitle');
    let txt = document.getElementById('addTxt');


    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }

    if (txt.value == '')
        empty.innerHTML = 'Note can not be empty!';
    else {
        txt.value = multiLine(txt.value);
        notesArr.push(title.value);
        notesArr.push(txt.value);
        notesArr.push(+new Date);

        ls.setItem('notes', JSON.stringify(notesArr));
        empty.innerHTML = '';
        title.value = '';
        txt.value = '';
    }
    showNotes();
}

//Show Notes
function showNotes() {
    let notes = ls.getItem('notes');

    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }

    let html = "";
    let display = document.getElementById('notes');

    for (i = 0; i < notesArr.length; i += 3) {
        //for show modal nots
        //  data-bs-toggle="modal" data-bs-target="#showModal" onclick="showNoteModal(${i})">
        let date = new Date(notesArr[i + 2]);
        let time = date.getHours() > 11 ? 'PM' : 'AM';

        html +=
            `<div class="noteCard card border-primary m-3" style="max-width: 90%;">
                
                <p id="${i}" class="card-header text-primary m-auto title noteTitle" data-bs-toggle="modal" 
                    data-bs-target="#editModal" onclick="displayNote(${i})">${notesArr[i]}</p>
                <div class="card-body" style="min-width:15rem; min-height:5rem;" data-bs-toggle="modal" data-bs-target="#editModal" onclick="displayNote(${i})">
                    <p id="${i + 1}" class="card-text txt"> ${notesArr[i + 1]} </p>
                </div>
                <div class="card-footer">
                    <div class="card-text float-left time">
                        <p id="${i + 2}" class="d-inline"> 
                            ${(date.getHours() % 12 || 12)} :
                            ${("0" + date.getMinutes()).slice(-2)}
                            ${time},
                            ${date.getDate()}
                            ${month[date.getMonth()]}
                            ${date.getFullYear() - 2000}
                        </p>
                    </div>
                <i class="fas fa-trash-alt float-right btn" onclick="deleteNote(${i})"></i>
                </div>
            </div> `;
    }

    if (notesArr.length != 0) {
        display.innerHTML = html;
    }
    else {
        display.innerHTML = "Nothing to show! Add Notes...";
    }
}

//Edit Notes
var index = 0;
function displayNote(i) {
    let title = document.getElementById('editTitle');
    let txt = document.getElementById('editTxt');
    let timeCreated = document.getElementById('noteTime');
    let empty = document.getElementById('empty-edit');
    let notes = ls.getItem('notes');

    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    txt.addEventListener('input', () => {
        let input = document.getElementById('editTxt');
        if (input.value == '') {
            empty.innerHTML = 'Note can not be empty!';
        }
        else {
            empty.innerHTML = '';
        }
    });

    title.value = notesArr[i];
    txt.value = multiLine(notesArr[i + 1]);

    let date = new Date(notesArr[i + 2]);
    let time = date.getHours() > 11 ? 'PM' : 'AM';
    timeCreated.innerHTML =
        `${(date.getHours() % 12 || 12)} : ${("0" + date.getMinutes()).slice(-2)} ${time},
    ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;

    index = i;
}

function saveNote() {
    let i = index;
    let title = document.getElementById('editTitle');
    let txt = document.getElementById('editTxt');
    let notes = ls.getItem('notes');

    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    txt.value = multiLine(txt.value);
    notesArr[i] = title.value;
    notesArr[i + 1] = txt.value;
    notesArr[i + 2] = +new Date;

    ls.setItem("notes", JSON.stringify(notesArr));
    title.innerHTML = '';
    txt.innerHTML = '';
    showNotes();
}

function closeNote() {
    let title = document.getElementById('editTitle');
    let txt = document.getElementById('editTxt');
    title.innerHTML = '';
    txt.innerHTML = '';
    ls.setItem("notes", JSON.stringify(notesArr));
    showNotes();
}

//Delete Notes
function deleteNote(i) {
    let notes = ls.getItem('notes');

    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }
    notesArr.splice(i, 3);
    ls.setItem("notes", JSON.stringify(notesArr));
    showNotes();
}

function deleteAll() {

    let notes = ls.getItem('notes');
    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    if (notesArr.length != 0) {

        let check = confirm("Are you want to delete all notes ?");
        if (check) {
            notesArr = [];
            ls.setItem("notes", JSON.stringify(notesArr));
        }
    }
    showNotes();
}

//Search Note
let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {

    let input = search.value.toLowerCase();
    let notes = document.getElementsByClassName('noteCard');
    let main = document.getElementById('main');

    Array.from(notes).forEach(function (ele) {
        let title = ele.getElementsByTagName('p')[0].innerText.toLowerCase();
        let txt = ele.getElementsByTagName('p')[1].innerText.toLowerCase();

        if (title.includes(input) || txt.includes(input)) {
            ele.style.display = 'flex';
        } else {
            ele.style.display = 'none';
        }

    })
    if(input!='')
    main.style.display = 'none';
    else
    main.style.display = 'flex';
});

//Hide main on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("main").style.height = "auto";
  } else {
    document.getElementById("main").style.top.height = "0";
  }
  prevScrollpos = currentScrollPos;
}
//Finally all bugs are fixed...
