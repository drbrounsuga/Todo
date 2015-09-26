/*
DEVELOPMENT CODE
*/

//auto select text field on hover
$('#todo').find('header').on('mouseenter', function(){
	$('#todo').find('input').trigger('focus');
});



//apply classes based on if text entered
$('#todo').find('input').on('keyup', function(){
	if( $(this).val() ){
		console.log('full');
		$('#todo').find('header').removeClass('empty').addClass('populated');
	}else{
		console.log('empty');
		$('#todo').find('header').addClass('empty').removeClass('populated');
	}
});