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

const newBook = document.createElement("button");
newBook.textContent = "New Book";
newBook.classList.add('newBook');
document.body.appendChild(newBook);

const form = document.createElement("form");
form.classList.add('form');

const title = document.createElement("div");
title.textContent = "Title";
const titleInput = document.createElement("input");
titleInput.required = true;
titleInput.classList.add('input');
title.appendChild(titleInput);
title.classList.add('title');

const author = document.createElement("div");
author.textContent = "Author";
const authorInput = document.createElement("input");
authorInput.required = true;
authorInput.classList.add('input');
author.appendChild(authorInput);
author.classList.add('author');

const pages = document.createElement("div");
pages.textContent = "Number of Pages";
const pagesInput = document.createElement("input");
pagesInput.type = "Number";
pagesInput.required = true;
pagesInput.min = 1;
pagesInput.classList.add('input');
pages.appendChild(pagesInput);
pages.classList.add('pages');

const Status = document.createElement("div");
Status.textContent = "Click here if you have read this book";
const StatusInput = document.createElement("input");
StatusInput.type = "checkbox";
Status.appendChild(StatusInput);
Status.classList.add('status');

const buttons = document.createElement("div");
buttons.classList.add('buttons');
const submit = document.createElement("button");
submit.textContent = "Submit";
submit.type = "submit";
const cancel = document.createElement("button");
cancel.type = "button";
cancel.textContent = "Cancel";
buttons.appendChild(submit);
buttons.appendChild(cancel);
form.appendChild(buttons);

form.appendChild(title);
form.appendChild(author);
form.appendChild(pages);
form.appendChild(Status);
form.appendChild(buttons);


newBook.addEventListener("click",()=>(
    titleInput.value = "",
    authorInput.value = "",
    pagesInput.value = "",
    StatusInput.checked = false,
    document.body.appendChild(form)
));

cancel.addEventListener("click",()=>{
    form.remove();
})

document.body.appendChild(newBook);

const emptyLibrary = document.createElement("h3");
emptyLibrary.textContent = "Your library is empty, click on 'New Book' to add a book!";
emptyLibrary.classList.add('emptyLibrary');
document.body.appendChild(emptyLibrary);

function addBookToLibrary(){
    const book = new Book(titleInput.value ,authorInput.value ,pagesInput.value ,StatusInput.checked);
    myLibrary.push(book);
}

const libraryDisplay = document.createElement("div");
libraryDisplay.classList.add('libraryDisplay');

function display(){
    libraryDisplay.textContent="";

    if(myLibrary.length === 0){
        document.body.appendChild(emptyLibrary);
    }

    myLibrary.forEach((book)=>{
        const bookCard = document.createElement("div");
        bookCard.classList.add('bookCard');

        const bookCardTitle = document.createElement("h3");
        bookCardTitle.textContent = `Title: ${book.title}`;
        bookCard.appendChild(bookCardTitle);

        const bookCardAuthor = document.createElement("p");
        bookCardAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookCardAuthor);

        const bookCardPages = document.createElement("p");
        bookCardPages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(bookCardPages);

        const statusBtn = document.createElement("button");
        statusBtn.textContent = book.Status ? "Read":"Not Read";
        bookCard.appendChild(statusBtn);
        statusBtn.classList.add('statusBtn');

        statusBtn.addEventListener("click",()=>{
            book.changeStatus();
            statusBtn.textContent = book.Status ? "Read":"Not Read";
        });
        const removebtn = document.createElement("button");
        removebtn.textContent = "Remove";
        bookCard.appendChild(removebtn);
        removebtn.classList.add('removebtn');

        libraryDisplay.appendChild(bookCard);
        removebtn.addEventListener("click",()=>{
           const index =  myLibrary.findIndex(item => item.id === book.id)
            myLibrary.splice(index,1);
            display();
        });
    });
    document.body.appendChild(libraryDisplay);
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addBookToLibrary();
    emptyLibrary.remove();
    console.log(myLibrary);
    display();
    form.reset();
    form.remove();
});