// $('[data-container]').hide();
// $('[data-interface-container]').hide();

// $('[data-get-started]').click(function(event) {
// 	// $('[data-container]').show();
// });

var numberOfPeople = 0;

$('[data-subtract-button]').click(function(event) {
	$('[data-person-' + numberOfPeople + ']').remove();
	if (numberOfPeople > 0) {
		numberOfPeople--;
	}
	$('[data-number-people]').html(numberOfPeople);
});

$('[data-add-button]').click(function(event) {
	numberOfPeople++;
	$('[data-list-of-people]').append('<div class="form-group"><input class="form-control" data-person-' + numberOfPeople + ' value="Friend ' + numberOfPeople + '"></input></div>');
	$('[data-number-people]').html(numberOfPeople);
});

// $('[data-upload-image]').click(function() {
	
// });