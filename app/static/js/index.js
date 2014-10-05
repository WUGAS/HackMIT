// $('[data-container]').hide();
$('[data-interface-container]').hide();

// $('[data-get-started]').click(function(event) {
// 	// $('[data-container]').show();
// });

var numberOfPeople = 0;

var quantity = 1;

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

$('[data-quantity-subtract-button]').click(function(event) {
	if (quantity > 1) {
		quantity--;
	}
	var keys = Object.keys(dict['items']);
	$('[data-price]').html('$' + dict['items'][keys[index]] * quantity);
	$('[data-quantity]').html(quantity);
});

$('[data-quantity-add-button]').click(function(event) {
	quantity++;
	var keys = Object.keys(dict['items']);
	$('[data-price]').html('$' + dict['items'][keys[index]] * quantity);
	$('[data-quantity]').html(quantity);
});

// $('[data-upload-image]').click(function() {
	
// });