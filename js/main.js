var userID; //global will use later
var key = '9AwInosQykaf21iKK6bM2H24oL5BJ1Wa';	
//backup key - ZZI3LTKqP5pdKUyFTQkzuObtnAHxf5Ao 9AwInosQykaf21iKK6bM2H24oL5BJ1Wa
var designerList = 'justintakeda'; 				
var urlFollowing = 'https://api.behance.net/v2/users/' + designerList + '/following?client_id=' + key;

Handlebars.registerHelper("removeSpace",function(myClass){
		var noSpace = myClass.replace(/\s/g,'');
		var withLower = noSpace.charAt(0).toLowerCase() + noSpace.substring(1);
		return withLower;
});



Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

if($('#index').length > 0) {

	$(function(){


		

		$.ajax({
			url: urlFollowing,
				dataType: 'jsonp',
				success: function(list) {

					createHTML(list);
					
					function createHTML(data){
						/*Handlebars functionality*/
						console.log(data);
						var rawTemplate = document.getElementById("designerList").innerHTML;
						var compiledTemplate = Handlebars.compile(rawTemplate);
						var ourGeneratedHTML = compiledTemplate(data);
						var designerContainer = document.getElementById("designers");
						designerContainer.innerHTML = ourGeneratedHTML;

						/*Filtering functionality*/

						var $grid = $('.grid').isotope({
							itemSelector: '.grid-item',
							layoutMode: 'fitRows'
						});
						var allButton = document.querySelector('.allButton');
						var graphicButton = document.querySelector('.graphicButton');
						var webButton = document.querySelector('.webButton');
						var photoButton = document.querySelector('.photoButton');

						allButton.addEventListener("click", function(){
							$grid.isotope({ filter: '*' });
						});
						
						graphicButton.addEventListener("click", function(){
							$grid.isotope({ filter: '.graphicDesign' });
						});

						webButton.addEventListener("click", function(){
							$grid.isotope({ filter: '.webDesign' });
						});

						photoButton.addEventListener("click", function(){
							$grid.isotope({ filter: '.photography' });
						});

						/*Clicking on a user*/

						var designerSelection = document.querySelectorAll('.designer-item');

						designerSelection.forEach(function(selectedDesigner){
							selectedDesigner.addEventListener("click", function(){
								userID = this.id;
								console.log(userID);
							});
						});


						


					}// end function
				}//end success
		});//end ajax


	});
}//end home



if($('#person').length > 0) {
	var pageURL = new URL(document.location);
	var params = pageURL.searchParams;
	var behanceUser  = params.get('id');
	var urlPersonProject = 'https://api.behance.net/v2/users/' + behanceUser + '/projects?client_id=' + key;
	var urlPersonDetails = 'https://api.behance.net/v2/users/' + behanceUser + '?client_id=' + key;
	

	$(function(){
		$.ajax({
			url: urlPersonProject,
				dataType: 'jsonp',
				success: function(list) {
					createHTML(list);
					
					function createHTML(data){
						/*Handlebars functionality*/
						console.log(data);
						var rawTemplate = document.getElementById("projects").innerHTML;
						var compiledTemplate = Handlebars.compile(rawTemplate);
						var ourGeneratedHTML = compiledTemplate(data);
						var designerContainer = document.getElementById("displayProjects");
						designerContainer.innerHTML = ourGeneratedHTML;
						


						


					}// end function
				}//end success
		});//end ajax

		$.ajax({
			url: urlPersonDetails,
				dataType: 'jsonp',
				success: function(list) {
					createHTML(list);
					
					function createHTML(data){
					/*Handlebars functionality*/
					console.log(data);
					var rawTemplate = document.getElementById("personDetails").innerHTML;
					var compiledTemplate = Handlebars.compile(rawTemplate);
					var ourGeneratedHTML = compiledTemplate(data);
					var designerContainer = document.getElementById("displayPerson");
					designerContainer.innerHTML = ourGeneratedHTML;	


						


					}// end function
				}//end success
		});//end ajax
	});
}

if($('#project').length > 0) {
	var pageURL = new URL(document.location);
	var params = pageURL.searchParams;
	var behanceUser  = params.get('id');
	var urlProjectDetails = 'http://www.behance.net/v2/projects/'+ behanceUser +'?api_key=' + key;
	

	$(function(){
		$.ajax({
			url: urlProjectDetails,
				dataType: 'jsonp',
				success: function(list) {
					createHTML(list);
					
					function createHTML(data){
						/*Handlebars functionality*/
						console.log(data);
						var rawTemplate = document.getElementById("projectBody").innerHTML;
						var compiledTemplate = Handlebars.compile(rawTemplate);
						var ourGeneratedHTML = compiledTemplate(data);
						var designerContainer = document.getElementById("projectElements");
						designerContainer.innerHTML = ourGeneratedHTML;
						


						


					}// end function
				}//end success
		});//end ajax
	}); //end outer function
}


