$('[data-container]').hide();

$('[data-get-started]').click(function(event) {
	$('[data-container]').show();
});

document.ontouchstart = function(e){ 
    e.preventDefault(); 
}