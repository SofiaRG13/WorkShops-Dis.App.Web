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
                div+='<img src="'+ product.Image + '" class="card-img-top" alt="Imagen de Producto">';
                div+='<div class="card-body">';
                div+='<h5 class="card-title">'+product.name+'</h5>'+
                '<a href="#" class="btn btn-primary" id="btnEditar">Editar</a>'+
                '<a href="#" class="btn btn-primary" id="btnEliminar">Eliminar</a>';
                div+='</div>'+'</div>';
                container+=div;
                console.log(div);


            }
        });
        document.getElementById('products_container').innerHTML=container;
    }

}