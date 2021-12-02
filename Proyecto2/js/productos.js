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
        userName: productUserName
    }
  
    productDb.push(product);
    localStorage.setItem('products', JSON.stringify(productDb));
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