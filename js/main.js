
// $(document).ready(function(){
// 	//Initialising filter function in team page
// 	alert('ok');
// 	var filterizd = $('.filtr-container').filterizr({});
// });​

$( document ).ready(function() {
    console.log( "ready!" );
    var filterizd = $('.filtr-container').filterizr({});
});

$(function(){
	var key = 'ZZI3LTKqP5pdKUyFTQkzuObtnAHxf5Ao';	
	var designerList = 'justintakeda'; 				
	var urlFollowing = 'https://api.behance.net/v2/users/' + designerList + '/following?client_id=' + key;

	$.ajax({
		url: urlFollowing,
			dataType: 'jsonp',
			success: function(list) {
				createHTML(list);
				function createHTML(data){
					console.log(data);
					var rawTemplate = document.getElementById("designerList").innerHTML;
					var compiledTemplate = Handlebars.compile(rawTemplate);
					var ourGeneratedHTML = compiledTemplate(data);
					var designerContainer = document.getElementById("designers");
					designerContainer.innerHTML = ourGeneratedHTML;
				}
			}
	});

});