const myLibrary = [];

function Book(title,author,pages,Status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.Status = Status;
    this.id = crypto.randomUUID();
}
Book.prototype.changeStatus = function(){
    this.Status=!this.Status;
}

const form = document.createElement("form");
form.classList.add('form');
const title = document.createElement("div");
title.textContent = "Title";
const titleInput = document.createElement("input");
title.appendChild(titleInput);

const author = document.createElement("div");
author.textContent = "Author";
const authorInput = document.createElement("input");
author.appendChild(authorInput);

const pages = document.createElement("div");
pages.textContent = "Number of Pages";
const pagesInput = document.createElement("input");
pagesInput.type = "Number";
pages.appendChild(pagesInput);

const Status = document.createElement("div");
Status.textContent = "Click here if you have read this book";
const StatusInput = document.createElement("input");
StatusInput.type = "checkbox";
Status.appendChild(StatusInput);

const submit = document.createElement("button");
submit.textContent = "Submit";

form.appendChild(title);
form.appendChild(author);
form.appendChild(pages);
form.appendChild(Status);
form.appendChild(submit);

const newBook = document.createElement("button");
newBook.textContent = "New Book";
newBook.addEventListener("click",()=>(
    document.body.appendChild(form)
));
document.body.appendChild(newBook);

function addBookToLibrary(){
    
    const book = new Book(titleInput.value ,authorInput.value ,pagesInput.value ,StatusInput.checked);
    myLibrary.push(book);
}

const libraryDisplay = document.createElement("div");

function display(){
    libraryDisplay.textContent="";
    myLibrary.forEach((book)=>{
        const bookCard = document.createElement("div");
        bookCard.textContent = `Title: ${book.title} Author: ${book.author}  Pages: ${book.pages}`;
        const statusBtn = document.createElement("button");
        statusBtn.textContent = book.Status ? "Read":"Not Read";
        bookCard.appendChild(statusBtn);

        statusBtn.addEventListener("click",()=>{
            book.changeStatus();
            statusBtn.textContent = book.Status ? "Read":"Not Read";
        });
        const removebtn = document.createElement("button");
        removebtn.textContent = "Remove";
        bookCard.appendChild(removebtn);
        libraryDisplay.appendChild(bookCard);
        removebtn.addEventListener("click",()=>{
           const index =  myLibrary.findIndex(item => item.id === book.id)
            myLibrary.splice(index,1);
            display();
        });
    });
    document.body.appendChild(libraryDisplay);
}

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);
    display();
});


