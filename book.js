let myLibrary = [];

// const addButton = document.querySelector(".submit-library");
let contentCards = document.querySelector(".cards");
const formAddBook = document.querySelector('.form-add-book');
const formSort = document.querySelector('.sort-form')


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

Book.prototype.swapReadStatus = function(){
	this.read = !this.read;
}

function validateBook(title, author, pages){
	let bookExists = false;
	myLibrary.forEach((book)=>{
		if(book.title === title && book.author === author && book.pages === pages){
			//book exists...
			bookExists = true;
		}
	});
	return bookExists;
}

function changeReadStatus(id){
	found = false;
	let readStatus = false;
	if(myLibrary.length === 0) return;
	myLibrary.forEach((book, index)=>{
		if(book.id === id){
			book.swapReadStatus();
			readStatus = book.read;
			found = true;
		}
	})
	if(!found) console.error("ID NOT FOUND, ERROR!");
	return readStatus;
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
	if(validateBook(title,author,pages)){
		alert("Book already exists.");	
	}
	else{
		const addedBook = new Book(title,author,pages,read);
		myLibrary.push(addedBook);
	}
}

function compareBook(book1, book2, comparedProperty, order){
	if(book1[comparedProperty] >= book2[comparedProperty]) return order === "ascend" ? 1 : -1;
	else if(book1[comparedProperty] < book2[comparedProperty]) return order === "ascend" ? -1 : 1;
	return 0;
}

function sortLibrary(sortFilter, order){
	return myLibrary.sort((a,b)=>{
		return compareBook(a,b,sortFilter,order);
	});
}


function updateLibrary(){
	let HTML = ``;
	myLibrary.forEach((book)=>{
		HTML += `
			<div class="card">
				<h1>${book.title}</h1>
				<div class="image"></div>
				<p>Author: <br/> ${book.author} <br/> Page Count: <br/> ${book.pages} pages </p>
				<button class="delete-book" data-id=${book.id}>Remove Book</button>
				<svg data-id=${book.id} class = "image-test js-read-button" fill="`;
		if(book.read) HTML += `#8fbc8f"`;
		else HTML += `"545454"`;
		HTML += ` xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z"/></svg>
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

	document.querySelectorAll(".js-read-button").forEach((button)=>{
		button.addEventListener('click', ()=>{
			const id = button.dataset.id;
			if(changeReadStatus(id)) button.style.fill = "#8fbc8f"
			else button.style.fill = "#545454";
			//just changing 1 property of 1 book, no need to do anything crazy like updating library.
		});
	});
}

formAddBook.addEventListener("submit", (event)=>{
	event.preventDefault();

	const data = new FormData(formAddBook);
	const title = data.get('title');
	const author = data.get('author');
	const pages = Number(data.get('pages'));
	const read = data.has('read-status');
	console.log(read);
	addBookToLibrary(title,author,pages,read);
	updateLibrary();
	form.reset();
})

formSort.addEventListener("submit", (event)=>{
	event.preventDefault();
	const data = new FormData(formSort);
	const sortFilter = data.get('sortLib');
	const order = data.get('order');
	myLibrary = sortLibrary(sortFilter,order);
	updateLibrary();
	console.log(myLibrary);
	console.log(sortFilter, order);
});

//test code
addBookToLibrary("Bookof Books", "John", 24, true);
addBookToLibrary("Pauls Autobiography", "Paul", 3, false);
addBookToLibrary("El Hombre", "Roberto", 24, true);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K Rowling", 100, false);
//end of test code

updateLibrary();