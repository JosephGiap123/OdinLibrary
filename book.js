// const Book = {
// 	title : "",
// 	author: "",
// 	pages: 0,
// 	read: false,
// }

function Book(title, author, pages, read){
	if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function(){
		let string = `${this.title}, by ${author}, ${pages} pages, `;
		if(this.read) string += 'read already'
		else string += 'not read yet';
		return string;
	}
}

let book = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
console.log(book.info());


console.log(Object.getPrototypeOf(book) === Book.prototype);