function addBook() {
  //read the book title field
  const bookName = document.getElementById('title').value;
  const authorName = document.getElementById("authors-list").value;

  console.log('El libro es:', bookName);
  //insert to a database
  let booksDb = JSON.parse(localStorage.getItem('books'));
  if(!booksDb) {
    booksDb = [];
  }
  const book = {
    name: bookName,
    id: booksDb.length + 1,
    author: authorName

  }

  booksDb.push(book);
  localStorage.setItem('books', JSON.stringify(booksDb));
  //reload the book list
  showListOfBooks();
}

function validateTitle() {
  //read the book title field
  const bookName = document.getElementById('title').value;
  if(bookName.length > 3) {
    document.getElementById('add-book-button').disabled = false;
  } else {
    document.getElementById('add-book-button').disabled = true;
  }
}

function showListOfBooks(){
  const books = JSON.parse(localStorage.getItem('books'));
  const table = document.getElementById('books_table');

  let rows = "";
  if(books!=null){
  books.forEach((book, index) => {
    let row = `<tr>`;
    row += `<td>${book.id}</td>`;
    row += `<td>${book.name}</td>`;
    row += `<td>${book.author}</td>`;
    row += `<td> <a onclick="editBook(${book.id})" class="link edit">Edit</a>  |  <a  onclick="deleteBook(${book.id});" class="link delete">Delete</a>  </td>`;
    rows += row + "</tr>";
  });
  table.innerHTML = rows;
  }else{

  }
  // read books from localstorage
  // generate the HTML table to show the boook
}

function addAuthor() {
  //read the book title field
  const authorName = document.getElementById('author').value;

  console.log('El autor es:', authorName);
  //insert to a database
  let authorDb = JSON.parse(localStorage.getItem('author'));
  if(!authorDb) {
    authorDb = [];
  }
  const author = {
    name: authorName,
    id: authorDb.length + 1

    
  }
  authorDb.push(author);
  localStorage.setItem('author', JSON.stringify(authorDb));
  //reload the book list
  loadAuthorsList();
  showListOfAuthors();
}

function validateAuthor() {
  //read the book title field
  const authorName = document.getElementById('author').value;
  if(authorName.length > 3) {
    document.getElementById('add-author-button').disabled = false;
  } else {
    document.getElementById('add-author-button').disabled = true;
  }
}

function loadAuthorsList() {
  // read authors from the database
  const authors = JSON.parse(localStorage.getItem('author'));

  if(authors) {
    let options = "";
    authors.forEach((author) => {
      options += `<option value="${author.id}">${author.name}</option>`;
    })
    // renders the select authors-list with the authors found
    document.getElementById('authors-list').innerHTML = options;
    document.getElementById('edit-author').innerHTML = options;
  }
}

function showListOfAuthors(){
  const authors = JSON.parse(localStorage.getItem('author'));
  const table = document.getElementById('authors_table');

  let rows = "";
  if(authors!=null){
  authors.forEach((author, index) => {
    let row = `<tr>`;
    row += `<td>${author.id}</td>`;
    row += `<td>${author.name}</td>`;
    row += `<td> <a onclick="editAuthor(${author.id})" class="link edit">Edit</a>  |  <a  onclick="deleteAuthor(${author.id});" class="link delete">Delete</a>  </td>`;
    rows += row + "</tr>";
  });
  table.innerHTML = rows;
  }else{

  }
  // read books from localstorage
  // generate the HTML table to show the boook
}

/**
 * Edits an specific book
 *
 * @param {*} bookId
 */
function editBook(bookId) {
  // read all books from the database
  const books = JSON.parse(localStorage.getItem('books'));

  // find the book with Id
  const bookFound = books.find((book) => {
    if(book.id == bookId){
      return book;
    }
  });
  console.log('book: ', bookFound)
  // render the information of the book in the edit form
  if(bookFound) {
    // fill the fields with the data of the book
    document.getElementById('edit-book-name').value = bookFound.name;
    document.getElementById('edit-book-id').value = bookFound.id;
    document.getElementById('edit-author').value = bookFound.author;
    
  } else {
    alert(`No book was found with id ${bookId}`);
  }

}

/**
 * Delete an specific book
 *
 * @param {*} bookId
 */
function deleteBook(bookId) {
  // read all books from the database
  const books = JSON.parse(localStorage.getItem('books'));

  // find the book with Id and remove it from the list
  const booksEdited = [];
  books.forEach((book) => {
    if(book.id != bookId){
      booksEdited.push(book);
    }
  });

  // replace the existing array
  localStorage.setItem('books',JSON.stringify(booksEdited));

  // reload the book list
  showListOfBooks();
}

/**
 * Saves the edited book
 *
 */
function saveBook(){

  // get the data from fields
  const books = JSON.parse(localStorage.getItem('books'));
  const newBookName = document.getElementById('edit-book-name').value;
  const bookId = document.getElementById('edit-book-id').value;
  const newAuthorId = document.getElementById('edit-author').value;

  // find the book in the database and edit it
  const booksEdited = books.map((book) => {
    if(book.id == bookId){
      book.name = newBookName;
      book.author = newAuthorId;
    }
    return book;
  });

  // replace the existing array
  localStorage.setItem('books',JSON.stringify(booksEdited));

  // reload the book list
  showListOfBooks();

}

/**
 * Edits an specific author
 *
 * @param {*} authorId
 */
 function editAuthor(authorId) {
  // read all authors from the database
  const authors = JSON.parse(localStorage.getItem('author'));

  // find the author with Id
  const authorFound = authors.find((author) => {
    if(author.id == authorId){
      return author;
    }
  });
  console.log('author: ', authorFound)
  // render the information of the author in the edit form
  if(authorFound) {
    // fill the fields with the data of the author
    document.getElementById('edit-author-name').value = authorFound.name;
    document.getElementById('edit-author-id').value = authorFound.id;
    
  } else {
    alert(`No book was found with id ${authorId}`);
  }
}

/**
 * Delete an specific author
 *
 * @param {*} authorId
 */
 function deleteAuthor(authorId) {
  // read all authors from the database
  const authors = JSON.parse(localStorage.getItem('author'));

  // find the author with Id and remove it from the list
  const authorDeleted = [];
  authors.forEach((author) => {
    if(author.id != authorId){
      authorDeleted.push(author);
    }
  });

  // replace the existing array
  localStorage.setItem('author',JSON.stringify(authorDeleted));

  // reload the author list
  showListOfAuthors();
  loadAuthorsList();

  const books = JSON.parse(localStorage.getItem('books'));

  const DeletedAutor="No autor Found";

  const booksEdited = books.map((book) => {
    if(book.author == authorId){
      book.name = book.name;
      book.author=DeletedAutor;
    }
    return book;
    
  });

  localStorage.setItem('books',JSON.stringify(booksEdited));

  showListOfBooks();
}

/**
 * Saves the edited author
 *
 */
 function saveAuthor(){

  // get the data from fields
  const authors = JSON.parse(localStorage.getItem('author'));
  const newAuthorName = document.getElementById('edit-author-name').value;
  const authorId = document.getElementById('edit-author-id').value;

  // find the author in the database and edit it
  const authorEdited = authors.map((author) => {
    if(author.id == authorId){
      author.name = newAuthorName;
    }
    return author;
  });

  // replace the existing array
  localStorage.setItem('author',JSON.stringify(authorEdited));

  // reload the author list
  showListOfAuthors();
  loadAuthorsList();

}
showListOfBooks();
showListOfAuthors();
loadAuthorsList();