//class stuff now!

class Book{
	constructor(title, author, pages, read){
		this.id = crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	swapReadStatus(){
		this.read = !this.read;
	}
}

class MyLibrary{ //singleton.
	constructor(){
		if(MyLibrary.instance){
			return MyLibrary.instance;
		}
		else{ //constructor
			MyLibrary.instance = this;
			this.library = [];
		}	
	}

	get length(){
		return this.library.length;
	}

	#validateBook(title, author, pages){
		let bookExists = false;
		this.library.forEach((book)=>{
			if(book.title === title && book.author === author && book.pages === pages){
				//book exists...
				bookExists = true;
			}
		});
		return bookExists;
	}

	static addBookToLibrary(lib, title, author, pages, read){
		if(lib.#validateBook(title,author,pages)){
			alert("Book already exists.");	
		}
		else{
			const addedBook = new Book(title,author,pages,read);
			lib.library.push(addedBook);
		}
	}

	static removeBook(lib, id){
		let found = false;
		if(lib.length === 0) return;
		lib.library.forEach((book, index)=>{
			if(book.id === id){
				lib.library.splice(index, 1);
				found = true;
			}
		});
		if(!found) console.error("ID NOT FOUND, ERROR!");
	}

	static changeReadStatus(lib, id){
		let found = false;
		let readStatus = false;
		if(lib.library.length === 0) return;
		lib.library.forEach((book)=>{
			if(book.id === id){
				console.log("hey");
				console.log(book.read);
				book.swapReadStatus();
				readStatus = book.read;
				console.log(readStatus);
				found = true;
			}
		})
		if(!found) console.error("ID NOT FOUND, ERROR!");
		return readStatus;
	}

	static compareBook(book1, book2, comparedProperty, order){
		if(book1[comparedProperty] > book2[comparedProperty]) return order === "ascend" ? 1 : -1;
		else if(book1[comparedProperty] < book2[comparedProperty]) return order === "ascend" ? -1 : 1;
		return 0;
	}

	static sortLibrary(lib, sortFilter, order){
		return lib.library.sort((a,b)=>{
			return MyLibrary.compareBook(a,b,sortFilter,order);
		});
	}
}

class LibraryHTML{
	
	constructor(){
		if(LibraryHTML.instance){
			return LibraryHTML.instance;
		}
		else{ //constructor
			LibraryHTML.instance = this;
			this.lib = new MyLibrary();
			this.contentCards = document.querySelector(".cards");
			this.formAddBook = document.querySelector('.form-add-book');
			this.formSort = document.querySelector('.sort-form')

			this.formAddBook.addEventListener("submit", (event)=>{
				event.preventDefault();
				const data = new FormData(this.formAddBook);
				const title = data.get('title');
				const author = data.get('author');
				const pages = Number(data.get('pages'));
				const read = data.has('read-status');
				MyLibrary.addBookToLibrary(this.lib,title,author,pages,read);
				this.updateLibrary();
				this.formAddBook.reset();
			});

			this.formSort.addEventListener("submit", (event)=>{
				event.preventDefault();
				const data = new FormData(this.formSort);
				const sortFilter = data.get('sortLib');
				const order = data.get('order');
				this.lib.library = MyLibrary.sortLibrary(this.lib,sortFilter,order);
				this.updateLibrary();
			});
		}	
	}

	updateLibrary(){
		let HTML = ``;
		this.lib.library.forEach((book)=>{
			HTML += `
				<div class="card">
					<h1>${book.title}</h1>
					<div class="image"></div>
					<p>Written by ${book.author} <br/> ${book.pages} pages long</p>
					<button class="delete-book" data-id=${book.id}>Remove Book</button>
					<svg data-id=${book.id} class = "image-test js-read-button" fill="`;
			if(book.read) HTML += `#8fbc8f"`;
			else HTML += `"545454"`;
			HTML += ` xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z"/></svg>
				</div>`
		})
		this.contentCards.innerHTML = HTML;

		document.querySelectorAll(".delete-book").forEach((button)=>{
			button.addEventListener("click", (event)=>{
				const id = button.dataset.id;
				MyLibrary.removeBook(this.lib,id);
				this.updateLibrary();
			});
		});

		document.querySelectorAll(".js-read-button").forEach((button)=>{
		button.addEventListener('click', ()=>{
			const id = button.dataset.id;
			if(MyLibrary.changeReadStatus(this.lib,id)) button.style.fill = "#8fbc8f"
			else button.style.fill = "#545454";
			//just changing 1 property of 1 book, no need to do anything crazy like updating lib.
			});
		});
	}
}

libAccess = new LibraryHTML();


//test code
MyLibrary.addBookToLibrary(libAccess.lib, "Bookof Books", "John", 24, true);
MyLibrary.addBookToLibrary(libAccess.lib, "Pauls Autobiography", "Paul", 3, false);
MyLibrary.addBookToLibrary(libAccess.lib, "El Hombre", "Roberto", 24, true);
MyLibrary.addBookToLibrary(libAccess.lib, "Harry Potter and the Philosopher's Stone", "J.K Rowling", 100, false);
//end of test code

libAccess.updateLibrary();