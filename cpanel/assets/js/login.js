function login(){
	var email = document.getElementById('user').value;
	var password = document.getElementById('password').value;
	
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
		
		document.getElementById('login-form').submit();
	}).catch(function(error) {

		
		var errorCode = error.code;
		var errorMessage = error.message;
		//console.log(errorCode);
		
		document.getElementById('err').style.visibility = "visible";
	});

	return false;
}