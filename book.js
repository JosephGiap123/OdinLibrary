const myLibrary = [];

const addButton = document.querySelector("submit-library");
let contentCards = document.querySelector("cards");

function Book(title, author, pages, read){
	if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function(){
		let string = `${this.title}, by ${this.author}, ${this.pages} pages, `;
		if(this.read) string += 'read already';
		else string += 'not read yet';
		return string;
}

function addBookToLibrary(title, author, pages, read){
	const addedBook = new Book(title,author,pages,read);
	myLibrary.push(addedBook);
}

addBookToLibrary("Jaun", "Cain", 24, true);
addBookToLibrary("Paul", "blahblah", 3, false);
addBookToLibrary("robert", "Book of Books", 62, true);
addBookToLibrary("Jaun", "Cahcah", 100, false);

console.log(myLibrary)

function updateLibrary(){
	
}