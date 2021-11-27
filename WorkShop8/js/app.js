function addBook() {
  //read the book title field
  const bookName = document.getElementById('title').value;

  console.log('El libro es:', bookName);
  //insert to a database
  let booksDb = JSON.parse(localStorage.getItem('books'));
  if(!booksDb) {
    booksDb = [];
  }
  booksDb.push(bookName);
  localStorage.setItem('books', JSON.stringify(booksDb));
  //reload the book list
  llenarTabla();
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


function validateBooks(){
  let booksDb = JSON.parse(localStorage.getItem('books'));
  if(booksDb!=null) {
    llenarTabla();
  }
}

function llenarTabla() {
  var tbody=document.querySelector('#table-light tbody');

  tbody.innerHTML='';

  var book= JSON.parse(localStorage.getItem('books'));

  var ncantidad=book.length;

  for(var i=0; i<ncantidad; i++){
    var fila= document.createElement('tr');

    var celdaTitulo= document.createElement('td');

    var titulo= document.createTextNode(book[i]);

    fila.appendChild(celdaTitulo.appendChild(titulo));

    tbody.appendChild(fila);
  }
}

