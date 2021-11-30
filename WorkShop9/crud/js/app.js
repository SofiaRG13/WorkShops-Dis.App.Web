function addBook() {
  //read the book title field
  const bookName = document.getElementById('title').value;

  console.log('El libro es:', bookName);
  //insert to a database
  let booksDb = JSON.parse(localStorage.getItem('books'));
  if(!booksDb) {
    booksDb = [];
  }
  const book = {
    name: bookName,
    id: booksDb.length + 1
  }
  booksDb.push(book);
  localStorage.setItem('books', JSON.stringify(booksDb));
  //reload the book list
  showListOfBooks();
}

function showListOfBooks(){
  const books = JSON.parse(localStorage.getItem('books'));
  const table = document.getElementById('books_table');

  let rows = "";
  books.forEach((book, index) => {
    let row = `<tr>`;
    row += `<td>${book.id}</td>`;
    row += `<td>${book.name}</td>`;
    // row += `<td>${book.author}</td>`;
    row += `<td> <a onclick="editBook(${book.id})" class="link edit">Edit</a>  |  <a  onclick="deleteBook(${book.id});" class="link delete">Delete</a>  </td>`;
    rows += row + "</tr>";
  });
  table.innerHTML = rows;

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

  // find the book in the database and edit it
  const booksEdited = books.map((book) => {
    if(book.id == bookId){
      book.name = newBookName;
    }
    return book;
  });

  // replace the existing array
  localStorage.setItem('books',JSON.stringify(booksEdited));

  // reload the book list
  showListOfBooks();

}

function loadAuthorsList() {
  // read authors from the database
  const authors = JSON.parse(localStorage.getItem('authors'));

  if(authors) {
    let options = "";
    authors.forEach((author) => {
      options += `<option value="${author.id}">${author.name}</option>`;
    })
    // renders the select authors-list with the authors found
    document.getElementById('authors-list').innerHTML = options;
  }
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

showListOfBooks();
loadAuthorsList();