function addProduct() {
   
    //read the product information fiedls
    const productName = document.getElementById('ProductName').value;
    const productDescription = document.getElementById("taDescripcion").value;
    const productImage = document.getElementById('linkImg').value;
    const productBusco = document.getElementById("taBusco").value;

    var productUserName;
    const temporaryDb = JSON.parse(localStorage.getItem('temporaryUser'));
    const userNameDB = temporaryDb.map((tuser) => {
        productUserName=tuser.name;
    });

    //insert to a database
    let productDb = JSON.parse(localStorage.getItem('products'));
    if(!productDb) {
        productDb = [];
    }
    const product = {
        id: autoincremental(),
        name: productName,
        Description:productDescription,
        Image:productImage,
        Busco:productBusco,
        userName: productUserName,
        creation: actualDate()
    }
  
    productDb.push(product);
    localStorage.setItem('products', JSON.stringify(productDb));
    clearFields();
}
  
function validateProduct() {

    //read the product information fiedls
    const productName = document.getElementById('ProductName').value;
    const productDescription = document.getElementById("taDescripcion").value;
    const productImage = document.getElementById('linkImg').value;
    const productBusco = document.getElementById("taBusco").value;

    if(productName.length > 3 & productDescription.length > 3 & productImage.length > 3 & productBusco.length > 3) {
      document.getElementById('btn2').disabled = false;
    } else {
      document.getElementById('btn2').disabled = true;
    }
}

function autoincremental() {

    //read the users information from localstorage
    const products = JSON.parse(localStorage.getItem('products'));

    //Start the id
    let id=0;

    if(products==null){
        return id+1;
    }else{
    const productsId = products.map((product) => {
        if(id< product.id){
            id= product.id;
        }
    });
    return id+1;
    }
}

function actualDate() {
    const day=new Date();
    let date =day.getDate() + '/' + (day.getMonth()+1) + '/' + day.getFullYear();
    let time = day.getHours()+ ':' + day.getMinutes() + ':' + day.getSeconds(); 

    let actualDate=date+' '+time;

    return actualDate;
}

function clearFields() {
    document.getElementById('ProductName').value= "";
    document.getElementById("taDescripcion").value= "Descripcion";
    document.getElementById('linkImg').value= "";
    document.getElementById("taBusco").value= "Busco";
}

function cambaRecents() {
    const products = JSON.parse(localStorage.getItem('products'));

    let container="";
    if(products==null){
        window.alert("No hay productos registrados");
    }else{
        const last1=products.length-1;
        const last2=products.length-2;

        if(last1>0){

            let div='<div class="card" style="width:350px; margin-top:45px;">'
            div+='<p class="id" hidden=true>'+products[last1].id+'</p>'
            div+='<img src="'+ products[last1].Image + '" class="card-img-top" alt="Imagen de Producto" onclick="detalle('+products[last1].id+')">';
            div+='<div class="card-body">';
            div+='<h5 class="card-title" style="text-align: center;">'+products[last1].name+'</h5>';

            div+='</div>'+'</div>';
        
            div+='<div class="card" style="width:350px; margin-top:45px;">'
            div+='<p class="id" hidden=true>'+products[last2].id+'</p>'
            div+='<img src="'+ products[last2].Image + '" class="card-img-top" alt="Imagen de Producto" onclick="detalle('+products[last2].id+')">';
            div+='<div class="card-body">';
            div+='<h5 class="card-title" style="text-align: center;">'+products[last2].name+'</h5>';
            div+='</div>'+'</div>';
            container+=div;
        }else{
            let div='<div class="card" style="width:350px; margin-top:45px;">'
            div+='<p class="id" hidden=true>'+products[last1].id+'</p>'
            div+='<img src="'+ products[last1].Image + '" class="card-img-top" alt="Imagen de Producto" onclick="detalle('+products[last1].id+')">';
            div+='<div class="card-body">';
            div+='<h5 class="card-title" style="text-align: center;">'+products[last1].name+'</h5>';
            div+='</div>'+'</div>';

            container+=div;
        }
        document.getElementById('cambaRecents').innerHTML=container;
    }
}



function cambaItems() {
    const products = JSON.parse(localStorage.getItem('products'));

    let container="";
    if(products==null){
        window.alert("No hay productos registrados");
    }else{
        products.sort((a,b)=> a.creation > b.creation ? -1 : +(c.creation > b.creation));
        products.forEach(product=> {
          
            let div='<div class="card" style="width:350px; margin-top:45px;">'
            div+='<p class="id" hidden=true>'+product.id+'</p>'
            div+='<img src="'+ product.Image + '" class="card-img-top" alt="Imagen de Producto" onclick="detalle('+product.id+')">';
            div+='<div class="card-body">';
            div+='<h5 class="card-title">'+product.name+'</h5>'+
            '<br>'+
            '<p class="card-text">@'+product.userName+'</p>';

            div+='</div>'+'</div>';
            container+=div;  
        });
        document.getElementById('products_container').innerHTML=container;
    }
}

function dashItems() {
    const products = JSON.parse(localStorage.getItem('products'));
    const user = JSON.parse(localStorage.getItem('temporaryUser'));

    let container="";
    if(products==null){
        window.alert("Usted no tiene productos registrados");
    }else{
        products.forEach(product=> {
            if(user[0].name== product.userName){
                let div='<div class="card" style="width:350px; margin-top:45px;">'
                div+='<p class="id" hidden=true>'+product.id+'</p>'
                div+='<img src="'+ product.Image + '" class="card-img-top" alt="Imagen de Producto" onclick="detalle('+product.id+')">';
                div+='<div class="card-body">';
                div+='<h5 class="card-title">'+product.name+'</h5>'+
                '<a href="#" class="btn btn-primary" id="btnEditar" onclick="editProduct(' + product.id +')">Editar</a>'+
                '<a href="#" class="btn btn-primary" id="btnEliminar" onclick= "deleteProduct(' + product.id +')">Eliminar</a>';
                div+='</div>'+'</div>';
                container+=div;
            }
        });
        document.getElementById('products_container').innerHTML=container;
    }
}

 function detalle(productId) {
    
 
    // read all books from the database
    const products = JSON.parse(localStorage.getItem('products'));
  
    // find the book with Id
    const productFound = products.find((product) => {
      if(product.id == productId){
        tempoProductInfo(product.id,product.name,product.Description,product.Image,product.Busco, product.userName)
        return product;
      }
    });
    // render the information of the book in the edit form
    window.location.replace('Pag_Detalle_Producto.html');
}

function loadDetailProduct() {
    
    let temporaryDb = JSON.parse(localStorage.getItem('temporaryProduct'));
    if(temporaryDb==null){

    }else{
        
        // fill the fields with the data of the book
        document.getElementById('titulo1').innerHTML = temporaryDb[0].name;
        document.getElementById('ofrecido').innerHTML =temporaryDb[0].userName;
        document.getElementById('description').innerHTML = temporaryDb[0].description;
        document.getElementById('ProductImage').src = temporaryDb[0].Image;
        document.getElementById('busco').innerHTML = temporaryDb[0].busco;
        localStorage.removeItem('temporaryProduct');
    }
  }

function tempoProductInfo(id,name,des,img,busco,user) {

    //insert termporary user to localstorage
    let temporaryDb = JSON.parse(localStorage.getItem('temporaryProduct'));
    if(!temporaryDb) {
      temporaryDb = [];
    }
    const tproduct = {
        id: id,
        name: name,
        description: des,
        busco: busco,
        Image:img,
        userName:user
    }
  
    temporaryDb.push(tproduct);
    localStorage.setItem('temporaryProduct', JSON.stringify(temporaryDb));
  }

 function editProduct(productId) {
    // read all books from the database
    const products = JSON.parse(localStorage.getItem('products'));
  
    // find the book with Id
    const productFound = products.find((product) => {
      if(product.id == productId){
        tempoProductInfo(product.id,product.name,product.Description,product.Image,product.Busco,product.userName)
        return product;
      }
    });
    // render the information of the book in the edit form
  
    console.log(productId);
    window.location.replace('Pag_Editar_Producto.html');
}

function loadEditProduct() {
    
    let temporaryDb = JSON.parse(localStorage.getItem('temporaryProduct'));
    if(temporaryDb==null){

    }else{
        
        // fill the fields with the data of the book
        document.getElementById('ProductId').value = temporaryDb[0].id;
        document.getElementById('ProductName').value = temporaryDb[0].name;
        document.getElementById('taDescripcion').value = temporaryDb[0].description;
        document.getElementById('linkImg').value = temporaryDb[0].Image;
        document.getElementById('taBusco').value = temporaryDb[0].busco;

        localStorage.removeItem('temporaryProduct');
    }
  }

function saveProduct(){

    // get the data from fields
    const products = JSON.parse(localStorage.getItem('products'));
    const ProductId = document.getElementById('ProductId').value;
    const newProductName = document.getElementById('ProductName').value;
    const newProductdescription = document.getElementById('taDescripcion').value;
    const newProductImage = document.getElementById('linkImg').value;
    const newProductBusco = document.getElementById('taBusco').value;

    // find the book in the database and edit it
    const ProductsEdited = products.map((product) => {
        if(product.id == ProductId){
            product.name = newProductName;
            product.description = newProductdescription;
            product.Image = newProductImage;
            product.busco = newProductBusco;
        }
        return product;
    });

    // replace the existing array
    localStorage.setItem('products',JSON.stringify(ProductsEdited));

    // reload the book list
    window.location.replace('Pag_Dashboard.html');
}

  function deleteProduct(productId) {
    // read all product from the database
    const products = JSON.parse(localStorage.getItem('products'));
  
    // find the product with Id and remove it from the list
    const productsEdited = [];
    products.forEach((product) => {
      if(product.id != productId){
        productsEdited.push(product);
      }
    });
  
    // replace the existing array
    localStorage.setItem('products',JSON.stringify(productsEdited));
  
    // reload the product list
    dashItems();
  }