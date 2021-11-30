"use strict";

const BOOKSKEY = "books";
const AUTHORSKEY = "authors";

/**
 *  Inserts a new book to the books array in localstorage
 *
 */
function insertBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  let currentKey = localStorage.getItem("booksLastInsertedId");

  if (!currentKey) {
    localStorage.setItem("booksLastInsertedId", 1);
    currentKey = 1;
  } else {
    currentKey = parseInt(currentKey) + 1;
    localStorage.setItem("booksLastInsertedId", currentKey);
  }

  // create the book object
  const book = {
    title,
    author,
    id: currentKey
  };

  // add it to the database
  let books = JSON.parse(localStorage.getItem(BOOKSKEY));
  if (books && books.length > 0) {
    books.push(book);
  } else {
    books = [];
    books.push(book);
  }
  localStorage.setItem(BOOKSKEY, JSON.stringify(books));

  clearFields();
  // render the books
  debugger;
  renderTable("books", books);
}

function saveBook() {
  const title = document.getElementById("editTitle").value;
  const author = document.getElementById("editAuthor").value;
  const id = document.getElementById("editId").value;

  // create the book object
  const book = {
    title,
    author,
    id
  };
  // add it to the database
  let books = JSON.parse(localStorage.getItem(BOOKSKEY));
  let results = books.filter(book => book.id != id);
  results.push(book);
  localStorage.setItem(BOOKSKEY, JSON.stringify(results));

  clearFields();
  // render the books
  renderTable("books", results);
}

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("editAuthor").value = "";
  document.getElementById("editTitle").value = "";
  document.getElementById("editId").value = "";
}

/**
 * Renders an HTML table dinamically
 *
 * @param tableName
 * @param tableData
 */
function renderTable(tableName, tableData) {
  debugger;
  let table = jQuery(`#${tableName}_table`);
  // loop through all the items of table and generates the html
  let rows = "";
  tableData.forEach((book, index) => {
    let row = `<tr>`;
    row += `<td>${book.title}</td>`;
    row += `<td>${book.author}</td>`;
    row += `<td>${book.id}</td>`;
    row += `<td> <a onclick="editEntity(this)" data-id="${
      book.id
    }" data-entity="${tableName}" data-author-id="${
      book.author
    }" class="link edit">Edit</a>  |  <a  onclick="deleteEntity(this);" data-id="${
      book.id
    }" data-entity="${tableName}" class="link delete">Delete</a>  </td>`;
    rows += row + "</tr>";
  });
  table.html(rows);
}

function editEntity(element) {
  const dataObj = jQuery(element).data();
  let books = JSON.parse(localStorage.getItem(BOOKSKEY));
  let bookFound;
  books.forEach(function(book) {
    if (book.id == dataObj.id) {
      bookFound = book;
      return;
    }
  });

  document.getElementById("editAuthor").value = bookFound.author;
  document.getElementById("editTitle").value = bookFound.title;
  document.getElementById("editId").value = bookFound.id;
}

function deleteEntity(element) {
  if (confirm("Are you sure you want to delete?")) {
    const dataObj = jQuery(element).data();
    // const newEntities = deleteFromTable(dataObj.entity, dataObj.id);

    let books = JSON.parse(localStorage.getItem(BOOKSKEY));
    let results = books.filter(book => book.id != dataObj.id);
    localStorage.setItem(BOOKSKEY, JSON.stringify(results));
    renderTable(dataObj.entity, results);
  }
}

function loadTableData(tableName) {
  renderTable(tableName, getTableData(tableName));
}

function loadAuthorsData() {
  let authors = JSON.parse(localStorage.getItem(AUTHORSKEY));
  const authorsList = jQuery("#authors-list");

  let itemsHtml = "";
  authors.forEach(author => {
    itemsHtml += `<option value="${author.id}">${author.name} ${
      author.lastname
    }</option>`;
  });
  authorsList.html(itemsHtml);
}

/**
 * Binds the different events to the different elements of the page
 */
function bindEvents() {
  jQuery("#add-book-button").bind("click", function(element) {
    insertBook();
  });

  jQuery("#save-book-button").bind("click", function(element) {
    saveBook();
  });
}

loadTableData("books");
loadAuthorsData();
bindEvents();
