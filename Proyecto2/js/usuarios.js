function addUser() {

    //read the user information fiedls
    const userName = document.getElementById('inputName').value;
    const userLastName = document.getElementById("inputLastName").value;
    const userAddress = document.getElementById('inputAddress').value;
    const userAddress2 = document.getElementById("inputAddress2").value;
    const userCountry = document.getElementById('inputCountry').value;
    const userCity = document.getElementById("inputCity").value;
    const userEmail = document.getElementById('inputEmail').value;
    const userPassword = document.getElementById("inputPassword").value;
  
    //insert to a database
    let userDb = JSON.parse(localStorage.getItem('users'));
    if(!userDb) {
        userDb = [];
    }
    const user = {
        id: autoincremental(),
        name: userName,
        lastName:userLastName,
        address:userAddress,
        address2:userAddress2,
        country:userCountry,
        city:userCity,
        email:userEmail,
        password:userPassword
    }
  
    userDb.push(user);
    localStorage.setItem('users', JSON.stringify(userDb));
}
  
function validateUser() {
    //read the user information fiedls
    const userName = document.getElementById('inputName').value;
    const userLastName = document.getElementById("inputLastName").value;
    const userAddress = document.getElementById('inputAddress').value;
    const userAddress2 = document.getElementById("inputAddress2").value;
    const userCountry = document.getElementById('inputCountry').value;
    const userCity = document.getElementById("inputCity").value;
    const userEmail = document.getElementById('inputEmail').value;
    const userPassword = document.getElementById("inputPassword").value;

    if(userName.length > 3 & userLastName.length > 3 & userAddress.length > 3 & userAddress2.length > 3 & userCountry.length> 3 & userCity.length > 3 & userEmail.length > 3 & userPassword.length > 8) {
      document.getElementById('btn2').disabled = false;
    } else {
      document.getElementById('btn2').disabled = true;
    }
}

function login() {
    //read the user Login information fiedls
    const userEmail = document.getElementById('inputEmail').value;
    const userPassword = document.getElementById("inputPassword").value;

    //Login
    let users = JSON.parse(localStorage.getItem('users'));

    if(!users){
      window.alert("El Email ingresado no está registrado.");
    }else{
    const usersLogin = users.map((user) => {
      if(user.email == userEmail){
        if(user.password==userPassword){

          sessionUser(user.id,user.name);
            
          window.location.replace("Pag_Dashboard.html");
            
        }else{
            window.alert("Contraseña incorrecta.");
        }

      }else{
        window.alert("El Email ingresado no está registrado.");
      }
    });
  }
}

function validateUserAuthenticated() {

  //insert termporary user to localstorage
  let temporaryDb = JSON.parse(localStorage.getItem('temporaryUser'));
  if(temporaryDb==null) {
    
  }else{
    document.getElementById('ingresartop').hidden=true;
    document.getElementById('ingresarbot').hidden=true;
    document.getElementById('cerrarSesionbot').hidden=false;
    document.getElementById('cerrarSesiontop').hidden=false;
    document.getElementById('dashboardtop').hidden=false;
    document.getElementById('dashboardbot').hidden=false;

  }
}

function sessionUser(id,name) {

  //insert termporary user to localstorage
  let temporaryDb = JSON.parse(localStorage.getItem('temporaryUser'));
  if(!temporaryDb) {
    temporaryDb = [];
  }
  const tuser = {
      id: id,
      name: name
  }

  temporaryDb.push(tuser);
  localStorage.setItem('temporaryUser', JSON.stringify(temporaryDb));
}

function delSessionUser() {
  //delete termporary user from localstorage
  localStorage.removeItem('temporaryUser');
}

function dashName() {
  const temporaryDb = JSON.parse(localStorage.getItem('temporaryUser'));
  const usersLogin = temporaryDb.map((tuser) => {
    var name=tuser.name;
    document.getElementById("name").innerHTML=" "+name +" ";
  });
}

function autoincremental() {

    //read the users information from localstorage
    const users = JSON.parse(localStorage.getItem('users'));

    //Start the id
    let id=0;

    if(users==null){
      return id+1;
    }else{
    const usersId = users.map((user) => {
        if(id< user.id){
            id= user.id;
        }
        
    });
    return id+1;
  }
    
}

