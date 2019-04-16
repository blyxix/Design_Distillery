var userID; //global will use later
var key = '9AwInosQykaf21iKK6bM2H24oL5BJ1Wa';	
//backup key - ZZI3LTKqP5pdKUyFTQkzuObtnAHxf5Ao 9AwInosQykaf21iKK6bM2H24oL5BJ1Wa
var designerList = 'justintakeda'; 				
var urlFollowing = 'https://api.behance.net/v2/users/' + designerList + '/following?client_id=' + key;
var userStats = [];




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

Handlebars.registerHelper("grabData", function(data) {
	userStats.push(data);
	return "";
});

function grabAvg(data) {
	avgViews.push(data.views);
	avgApp.push(data.appreciations);
	avgFollow.push(data.followers);
	avgFollowing.push(data.following);

};

function calcAvg(persons){
	var container = 0;
	var avg = 0;
	var counter = persons.length;
	for(var i=0; i < persons.length; i++){
		container += persons[i];
	}
	avg = container/counter;
	avg = avg.toFixed(0);
	console.log(avg);
	return avg;
}



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
						var brandButton = document.querySelector('.brandButton');
						var photoButton = document.querySelector('.photoButton');

						allButton.addEventListener("click", function(){
							$grid.isotope({ filter: '*' });
						});
						
						graphicButton.addEventListener("click", function(){
							$grid.isotope({ filter: '.graphicDesign' });
						});

						brandButton.addEventListener("click", function(){
							$grid.isotope({ filter: '.branding' });
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

//https://api.behance.net/v2/users/a-mirocka?client_id='9AwInosQykaf21iKK6bM2H24oL5BJ1Wa

if($('#person').length > 0) {
	var pageURL = new URL(document.location);
	var params = pageURL.searchParams;
	var behanceUser  = params.get('id');
	var urlPersonProject = 'https://api.behance.net/v2/users/' + behanceUser + '/projects?client_id=' + key;
	var urlPersonDetails = 'https://api.behance.net/v2/users/' + behanceUser + '?client_id=' + key;
	var iAvg = 0;
	var avgViews = [];
	var avgApp = [];
	var avgFollow = [];
	var avgFollowing = [];
	

	$(function(){
		$.ajax({
			url: urlFollowing,
			dataType: 'jsonp',
			success: function(list) {
				var count = Object.keys(list.following).length;


				 for(i=0; i < count; i++){
				 	grabAvg(list.following[i].stats);
				 }

				personInfo();

			}//end success
		});//end ajax


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

		var personInfo = function(){

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
						


						var ctx = document.getElementById('myChart');
						var avgViewsNo = calcAvg(avgViews);
						var avgAppNo = calcAvg(avgApp);
						var avgFollowNo = calcAvg(avgFollow);
						var avgFollowingNo = calcAvg(avgFollowing);
						var chartMax = 0; 
						if(userStats[0] < 1000){
							chartMax = userStats[0] + 100;
						}else{
							chartMax = userStats[0] + 1000;
						}

						
						
						var myChart = new Chart(ctx, {
						    type: 'bar',
						    data: {
						        labels: ['Project views', 'Appreciations', 'Followers', 'Following'],
						        datasets: [{
						            label: 'Current Designer',
						            data: userStats,
						            backgroundColor: [
						                'rgba(217, 134, 72, 0.5)',
						                'rgba(217, 134, 72, 0.5)',
						                'rgba(217, 134, 72, 0.5)',
						                'rgba(217, 134, 72, 0.5)',
						                'rgba(217, 134, 72, 0.5)',
						                'rgba(217, 134, 72, 0.5)'
						            ],
						            borderWidth: 0
						        },{
						        	label: 'Agency Average',
						        	data: [avgViewsNo, avgAppNo, avgFollowNo, avgFollowingNo],
						            backgroundColor: [
						                'rgba(52, 58, 64, 0.5)',
						                'rgba(52, 58, 64, 0.5)',
						                'rgba(52, 58, 64, 0.5)',
						                'rgba(52, 58, 64, 0.5)',
						                'rgba(52, 58, 64, 0.5)',
						                'rgba(52, 58, 64, 0.5)'
						            ],
						            borderWidth: 0
						        }]
						    },
						    options: {
						        scales: {
						            yAxes: [{
						                ticks: {
						                	max: chartMax,
						                    beginAtZero: true,
						                }
						            }]
						        }
						    },
						});

							


						}// end function
					}//end success
			});//end ajax
		}
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


