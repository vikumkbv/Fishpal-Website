	
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
  
var databaseRef = firebase.database().ref();
var selectedDevice = null;
			
firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
	  // user name
		document.getElementById('displayName').innerHTML= firebase.auth().currentUser.displayName;
	 // user pic
		var storageRef = firebase.storage().ref();
		storageRef.child('images/userProPic/'+firebase.auth().currentUser.uid).getDownloadURL().then(function(url){
			document.getElementById("userPic").src = url;
		})
		
	 // user devices
		var devices = databaseRef.child("users/"+firebase.auth().currentUser.uid+"/devices");
		devices.once("value", function(device) {
		  device.forEach(function(child) {
			//console.log(child.key+": "+child.val());
			
			//Update List
			document.getElementById("devices").innerHTML += 
			'<input type="radio" id="'+child.key+'" name="device" value="'+child.val()+'" onclick="deviceselected()" style="display:none;"><li class="nav-item" style="height: 30px;"><div class="nav-link"><label for="'+child.key+'"><i class="nav-icon fa fa-circle-o text-warning"></i>	<p class="text">'+child.key+'</p></div></li></label> ';
				
		  });
		  
		});
		
  } else {
    window.location = '../';
  }
});	


function deviceselected(){
	//add eventlistener
		var radios = document.userDevices.device;
		radios.forEach(function(radio){
			if(radio.checked){
				selectedDevice = radio.value;
				//PH
				firebase.database().ref('Devices/'+selectedDevice+'/PH').once('value').then(function(sensor) {
				  document.getElementById("phVal").innerHTML = sensor.val() +'<small>/14</small>'; 
				  document.getElementById("phBarV").innerHTML = sensor.val(); 
				  document.getElementById("phBar").style = "width: "+(sensor.val()/14*100)+"%";
				});
				
				//Turbidity
				firebase.database().ref('Devices/'+selectedDevice+'/Turbidity').once('value').then(function(sensor) {
				  document.getElementById("turVal").innerHTML = sensor.val() +'<small>%</small>'; 
				  document.getElementById("turBarV").innerHTML = sensor.val();
				  document.getElementById("turBar").style = "width: "+sensor.val()+"%";
				});
				
				//Food
				firebase.database().ref('Devices/'+selectedDevice+'/Food').once('value').then(function(sensor) {
				  document.getElementById("foodVal").innerHTML = sensor.val() +'<small>%</small>'; 
				  document.getElementById("foodBarV").innerHTML = sensor.val();
				  document.getElementById("foodBar").style = "width: "+sensor.val()+"%";
				});
				
				//Light
				firebase.database().ref('Devices/'+selectedDevice+'/Light').once('value').then(function(sensor) {
					console.log(sensor.val());
				  if(sensor.val() ==1 ){
					  $( ".button" ).addClass( "active");
				  }
				  else if(sensor.val() ==0 ){
					  $( ".button" ).removeClass( "active");
				  }
				});
			}
		});
}
$(".button").click(function(){
    $(this).toggleClass("active");
	firebase.database().ref('Devices/'+selectedDevice+'/Light').once('value').then(function(light) {
		if(light.val() ==1 ){
			firebase.database().ref('Devices/'+selectedDevice+'/Light').set(0)
		}
		else if(light.val() ==0 ){
			firebase.database().ref('Devices/'+selectedDevice+'/Light').set(1)
		}
	});
});
/*
$(function() {
  $( ".feed" ).click(function() {
    $( ".feed" ).addClass( "onclic", 250, validate);
	
  });

  function validate() {
	  
    setTimeout(function() {
		
      $( ".feed" ).removeClass( "onclic" );
      $( ".feed" ).addClass( "validate", 450, callback );
    }, 2250 );
  }
    function callback() {
      setTimeout(function() {
		  
        $( ".feed" ).removeClass( "validate" );
      }, 1250 );
    }
});
*/
$(function() {
  $( ".feed" ).click(function() {
	  if(selectedDevice==null){
		  alert("Please select a device to feed");
	  }
	  else{
		$( ".feed" ).addClass( "onclic");
			firebase.database().ref('Devices/'+selectedDevice+'/Servo').once('value').then(function() {
			firebase.database().ref('Devices/'+selectedDevice+'/Servo').set(1)
		}).then(function(){
			
			setTimeout(function() {
			  $( ".feed" ).removeClass( "onclic" );
			  $( ".feed" ).addClass( "validate", 450, callback );
			}, 2250 );
			
			function callback() {
			  setTimeout(function() {
				$( ".feed" ).removeClass( "validate" );
			  }, 1250 );
			}
		});
	  }
  });

});
function logout(){
	firebase.auth().signOut();
}