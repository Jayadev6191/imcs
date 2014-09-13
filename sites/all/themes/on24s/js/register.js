$(document).ready(function(){
	$('#register-user-form').submit(function(e){
		var email=$('#email').val();
		var fname=$('#fname').val();
		var lname=$('#lname').val();
		var utm=$('#utm').val();
		var data={
			email:email,
			fname:fname,
			lname:lname,
			utm:utm,
		};
		console.log(data);
		// $.ajax({
			// url:'localhost:8888/imcs/sites/all/modules/registration/registration.module',
// 			
		// });
		// return false;
	});
});
