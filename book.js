const myLibrary = [];

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

function addBookToLibrary(){
	
}