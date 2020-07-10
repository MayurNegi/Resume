var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags);

var interval;

for(var i = 0; i < navMenuAnchorTags.length; i++)
{
	navMenuAnchorTags[i].addEventListener('click', function(event){
		event.preventDefault();

		var targetSectionID = this.textContent.trim().toLowerCase();
		var targetSection = document.getElementById(targetSectionID);
		console.log(targetSectionID);

		// interval = setInterval(scrollVertically, 20, targetSection);

		interval = setInterval(function(){
			scrollVertically(targetSection);
		}, 20);

	});
}

function scrollVertically(targetSection){
	var targetSectionCoordinates = targetSection.getBoundingClientRect();
	if(targetSectionCoordinates.top <= 0){
		clearInterval(interval);
		return;
	}
	window.scrollBy(0, 50);
}

// auto fill skills bar

// handle scroll event on window 
// check skill section is visible or not
// ensure that initial width of colored skills div is 0
// start animation on every skill --> increase skill width from 0 to skill level
// store skill level for that  --> HTML with the help of data attribute

var progressBars = document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll', checkScroll);
var animationDone = false;

function initialiseBars(){
	for(let bar of progressBars)
	{
		bar.style.width = 0 + '%';
	}
}

initialiseBars();

function fillBars(){
	for(let bar of progressBars)
	{
		let targetWidth = bar.getAttribute('data-bar-width');
		let currentWidth = 0;
		let autoFillInterval = setInterval(function(){
			if(currentWidth > targetWidth){
				clearInterval(autoFillInterval);
				return;
			}
			currentWidth++;
			bar.style.width = currentWidth + '%';
		}, 5);
	}
}

function checkScroll(){
	// check whether skills container is visible
	var coordinates = skillsContainer.getBoundingClientRect();
	if(!animationDone && coordinates.top < window.innerHeight){
		fillBars();
		animationDone = true;
		console.log('skill Section');
	}
	else if(coordinates.top > window.innerHeight){
		animationDone = false;
		initialiseBars();
	}
}