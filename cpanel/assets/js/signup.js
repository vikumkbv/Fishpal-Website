 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARqXJbJeR4B-c0AanFfez8mwBoIZXYb_k",
    authDomain: "fishpal.cf",
    databaseURL: "https://fishpal.cf",
    projectId: "fishpal-giga",
    storageBucket: "fishpal-giga.appspot.com",
    messagingSenderId: "11222213191"
  };
  firebase.initializeApp(config);
  firebase.auth().languageCode = 'si';
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
	recaptchaVerifier.render().then(function(widgetId) {
	  window.recaptchaWidgetId = widgetId;
});
  window.recaptchaVerifier2 = new firebase.auth.RecaptchaVerifier('resend', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    
  }
});
var email,password,number,emailusercred,username;


//password validate
var opassword = document.getElementById("password"), confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(opassword.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
	confirm_password.className = 'invalid';
  } else {
    confirm_password.setCustomValidity('');
	confirm_password.className = 'valid';
  }
}

opassword.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

// Tel validate
var telInput = $("#phone");
telInput.intlTelInput({
  utilsScript: "../../build/js/utils.js"
});

function validateNumber()
{
	if (!(telInput.intlTelInput("isValidNumber")))
	{
		telInput[0].setCustomValidity("Invalid Number");
		telInput.addClass("invalid");
	}
	else
	{
		telInput[0].setCustomValidity('');
		telInput.removeClass("invalid");
		telInput.addClass("valid");
	}
}

telInput.keyup(validateNumber);


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

 // next step
    function next() {
        var parent_fieldset = $("#sub").parents('form');
        var next_step = true;

       if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                $("#sub").parents('form').next().fadeIn();
				sendsms();
				
            });
        }

    };

//get code
function gcheck(box) {
	return box.checkValidity()
}	
$("#regform :input").keyup(function()
{
	var arr = Array.from(document.getElementsByTagName('input'));
	if(arr.every(gcheck))
	{
		$('#sub').removeAttr("disabled");
	}
});
$(".verif").keyup(function () {
	if (this.value.length == this.maxLength) {
	  $(this).addClass("valid");
      $(this).next('.verif').focus();
	  
	  if($(this).next('.verif').length == 0)
	  {
		  $(this).blur();
		  var code = '';
		  $("#numform :input").each(function(){
			  code += $(this).val();
			 
			});
			$( "#signupsuccess" ).addClass( "lds-ring");
			codeverify(code);
	  }
    }
});
  
 


  function sendsms()
  {
	  console.log("sending sms..");
	  var appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(number, appVerifier)
			.then(function (confirmationResult) {
				console.log("sms sent");
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  window.confirmationResult = confirmationResult;
			}).catch(function (error) {
			  console.log(error);
			});
  }
  
  function resendsms()
  {
	  console.log("sending sms..");
	  var appVerifier = window.recaptchaVerifier2;
		firebase.auth().signInWithPhoneNumber(number, appVerifier)
			.then(function (confirmationResult) {
				console.log("sms re-sent");
				$( "footer").html("<div>Didn't recieved ?<br><a onClick='resendsms()'><div id='resend'></div> Send again</a></div>")
				alert("SMS Resent");
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  window.confirmationResult = confirmationResult;
			}).catch(function (error) {
			  console.log(error);
			});
  }
  //verify code
  function codeverify(code)
  {
	confirmationResult.confirm(code).then(function (result) {
	  // User signed in successfully.
	  $( "footer").css("display", "none");
	  link();
	}).catch(function (error) {
	  // User couldn't sign in (bad verification code?)
	  console.log(error);
	  alert("Invalid Code");
	});
  }
  
  //link account
  function link()
  {	  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
	  
	  firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function(usercred) {
		  var linkeduser = firebase.auth().currentUser;

				linkeduser.updateProfile({
				  displayName: username
				}).then(function() {
				  console.log("Account linking success", linkeduser.displayName);
						linkeduser.sendEmailVerification().then(function() {
						  console.log("verification mail sent");
						}).catch(function(error) {
						  // An error happened.
						});
				  $( "#signupsuccess" ).removeClass( "lds-ring");
				  $( "#signupsuccessmsg").css("display", "block");
				  writeUserData((linkeduser.uid),username,email);
				 
				  
				}).catch(function(error) {
				  // An error happened.
				});
		  
		}, function(error) {
		  console.log("Account linking error", error);
		});
	  
  }
  function signup()
  {
	$('#sub').button('loading');
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	number = $("#phone").intlTelInput("getNumber");
	username = document.getElementById("username").value;

	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
		// sign In user 
		console.log("sign in");
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
			var signeduser = firebase.auth().currentUser;

			signeduser.delete().then(function() {
			  // User deleted.
			}).then(function(user) {
				$('#sub').button('reset');
				next();
				
			}).catch(function(error) {
			  // An error happened.
			});

		}).catch(function(error) {
		  
		});
		
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  console.log(error);
	  if(errorCode == "auth/email-already-in-use")
	  {
		 alert("email already exist. Please sign in");
		 $('#sub').button('reset');
	  }
	});
	
	return false;
  }
  
  function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    email: email,
    
  });
   $( "#signupsuccess" ).toggleClass( "updated");
	setTimeout(redir, 2000);
}
  //redirect to login
  function redir()
  {
	  window.location = "index.php";
  }