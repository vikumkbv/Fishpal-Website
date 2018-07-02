<!DOCTYPE html>

<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="assets/css/intlTelInput.css">
  <link rel="stylesheet" href="assets/css/signup.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/css/materialize.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"> 

  <title>FishPal | Signup</title>
  <!-- CORE CSS-->
  

<style type="text/css">
html,
body {
    height: 100%;
    display: table-cell;
    vertical-align: middle;
}
html {
    display: table;
    margin: auto;
}

.margin {
  margin: 0 !important;
}
</style>
  
</head>

<body class="blue">
	<!-- Java scripts -->
	
<!-- Java scripts end -->


  <div id="login-page" class="row">
    <div class="col s12 z-depth-6 card-panel" id="formpan">
      
	  
        <div class="row">
          <div class="input-field col s12 center">
            <img src="assets/images/fish.png" alt="logo" class="responsive-img valign profile-image-login" width="80px">
            <p class="center login-form-text">FishPal SignUp Form</p>
          </div>
        </div>
		
		<form class="login-form" onSubmit="return signup()" id="regform">
		
		<fieldset>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="mdi-social-person-outline prefix"></i>
            <input id="username" type="text" class="validate" required pattern="^[a-zA-Z_]+" oninvalid="setCustomValidity('Username can only contain characters')"onchange="try{setCustomValidity('')}catch(e){}">
            <label for="username" class="center-align">Username</label>
          </div>
        </div>


        <div class="row margin">
          <div class="input-field col s12">
            <i class="mdi-communication-email prefix"></i>
            <input id="email" type="email" class="validate" required type="text" pattern="^[a-zA-Z0-9._]+@[a-zA-Z._]+?\.[a-zA-Z]{2,4}$"oninvalid="setCustomValidity('Please enter a valid email address')"onchange="try{setCustomValidity('')}catch(e){}">
            <label for="email" class="center-align">Email</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="mdi-action-lock-outline prefix"></i>
            <input id="password" type="password" class="validate" required minlength=6>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="mdi-action-lock-outline prefix"></i>
            <input id="confirm_password" type="password" required>
            <label for="confirm_password">Re-type password</label>
          </div>
        </div>
		<!-- Phone section-->
        <div class="row margin">
          <div class="input-field col s12">
            <i class="mdi-communication-phone prefix"></i>
            <input type="tel" id="phone" required>
          </div>
        </div>
<!-- phone section end -->
<div id="recaptcha-container" style="margin: 15px auto auto;width: 300px;"></div>
        <div class="row">
          <div class="input-field col s12">
            <button type="submit" class="btn waves-effect waves-light col s12" id="sub" disabled data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Signing Up">Register Now</button>
          </div>
          <div class="input-field col s12">
            <p class="margin center medium-small sign-up">Already have an account? <a href="../cpanel">Login</a></p>
          </div>
        </div>
		</fieldset>
		
	</form>
		<form class="login-form" onSubmit="return signup()" id="numform">
		<fieldset>
		<p style="margin-left:auto; margin-right:auto;text-align:center; width: 70%;">Please enter the 6-digit verification code we sent via SMS:</p>
        <div class="row margin" style="display:  flex;">
          <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
		  <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
		  <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
		  <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
		  <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
		  <input type="text" class="verif" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
        </div>
		<div id="signupsuccess"><div></div><div></div><div></div><div></div></div>
		<div id="signupsuccessmsg">Thank you for signing up.</div>
		
		</fieldset>
		<footer>
		Didn't recieved ?<br><a onClick="resendsms()"><div id="resend"></div> Send again</a>
		</footer>
	</form>
    
    </div>
  </div>




  <!-- ====== Scripts ======= -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="assets/js/intlTelInput.js"></script>
<script src="assets/js/utils.js"></script>
<script>
  $("#phone").intlTelInput();
</script> 
  <!--materialize js-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/js/materialize.min.js"></script>
  <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
  
  <script src="assets/js/signup.js"></script>
</body>
</html>