<!DOCTYPE html>
<html>
<head>
<title>Fish pal Login</title>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link rel="stylesheet" type="text/css" href="assets/css/Login.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="assets/js/login.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>

<script>
	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARqXJbJeR4B-c0AanFfez8mwBoIZXYb_k",
    authDomain: "fishpal-giga.firebaseapp.com",
    databaseURL: "https://fishpal-giga.firebaseio.com",
    projectId: "fishpal-giga",
    storageBucket: "fishpal-giga.appspot.com",
    messagingSenderId: "11222213191"
  };
  firebase.initializeApp(config);
  // Recaptcha
	
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = 'dashboard/';
  } else {
    // No user is signed in.
  }
});
</script>
</head>
<body>
<div class="container">
  
  <div class="row" id="pwd-container">
    <div class="col-md-4"></div>
    
    <div class="col-md-4">
      <section class="login-form">
        <form id="login-form" method="post" action="dashboard/" role="login" onSubmit="return login()">
          <img src="assets/images/logo%20fish.png" class="img-responsive" alt="logo" width="150px" height="100px"/>
          <input type="email" id="user" name="email" placeholder="Email" required class="form-control input-lg"/>
          
          <input type="password" class="form-control input-lg" id="password" placeholder="Password" required="" />
		  <p id="err">Invalid Credentials</p>
          <button type="submit" name="go" class="btn btn-lg btn-primary btn-block" >Sign in</button>
          <div>
            <a href="signup.php">Create account</a> or <a href="#">reset password</a>
          </div>
          
        </form>
        
        <div class="form-links">
          <a href="https://www.fishpal.cf">www.fishpal.cf</a>
        </div>
      </section>  
      </div>
      
      <div class="col-md-4"></div>
      

  </div>
 
</div>
</body>
</html>