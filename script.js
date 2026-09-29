const myLibrary = [];

function Book(title,author,pages,Status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.Status = Status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(){
    
    const book = new Book(title,author,pages,Status);
    myLibrary.push(book);
}
addBookToLibrary();
console.log(myLibrary);