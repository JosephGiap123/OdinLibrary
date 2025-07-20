const myLibrary = [];

// const addButton = document.querySelector(".submit-library");
let contentCards = document.querySelector(".cards");
const form = document.querySelector('.form-add-book');

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

function removeBook(id){
	found = false;
	if(myLibrary.length === 0) return;
	myLibrary.forEach((book, index)=>{
		if(book.id === id){
			myLibrary.splice(index, 1);
			found = true;
		}
	})
	if(!found) console.error("ID NOT FOUND, ERROR!");
}

function addBookToLibrary(title, author, pages, read){
	const addedBook = new Book(title,author,pages,read);
	myLibrary.push(addedBook);
}

addBookToLibrary("Bookof Books", "John", 24, true);
addBookToLibrary("Pauls Autobiography", "Paul", 3, false);
addBookToLibrary("El Hombre", "Roberto", 62, true);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K Rowling", 100, false);

console.log(myLibrary)

function updateLibrary(){
	let HTML = ``;
	myLibrary.forEach((book)=>{
		HTML += `
			<div class="card">
				<h1>${book.title}</h1>
				<div class="image"></div>
				<p>${book.author}, <br/> ${book.pages} pages, <br/>
		`;
		if(book.read) HTML += ` read already`;
		else HTML += ` not read yet`;
		HTML += `</p>
				<button class="delete-book" data-id=${book.id}>Remove Book</button>
			</div>`
	})
	contentCards.innerHTML = HTML;
	document.querySelectorAll(".delete-book").forEach((button)=>{
		button.addEventListener("click", (event)=>{
			const id = button.dataset.id;
			removeBook(id);
			updateLibrary();
		});
	});
}

form.addEventListener("submit", (event)=>{
	event.preventDefault();

	const data = new FormData(form);
	const title = data.get('title');
	const author = data.get('author');
	const pages = data.get('pages');
	const read = data.has('read-status');
	console.log(read);
	addBookToLibrary(title,author,pages,read);
	updateLibrary();
	form.reset();
})

updateLibrary();