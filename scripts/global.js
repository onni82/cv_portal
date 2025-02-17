$(document).ready(function () {
	// Handles the span#menu-icon open/close event
	$('span#menu-icon').click(function () {
		// Toggles the class "open" on the span element
		$('nav#menu').toggleClass('open');
	});

	// Handles the click event on an a element that has the class "clickable"
	$('a.clickable').click(function (event) {
		event.preventDefault();

		// Toggles the class "open" on the span element
		$('nav#menu').removeClass('open');

		// Removes aria-current="page" from all a elements
		$('a').removeAttr('aria-current');

		// Adds aria-current="page" to the clicked a element
		$(this).attr('aria-current', 'page');

		// Retrieves the second class from the clicked element that corresponds to the link
		var className = $(this).attr('class').split(' ')[1];

		// Creates the path to the file based on class name
		var filePath = className + '.html';

		// Loads the content from the file into a hidden container/element
		$.get(filePath, function (data) {
			// Creates a temporary div element that holds the loaded data
			var tempDiv = $('<div>').html(data);

			// Finds the specific div element in the loaded file
			var specificContent = tempDiv.find('main').html();

			// Inserts the specific content into the target container
			$('main').html(specificContent);

			// Finds the specific title element in the loaded file
			var specificTitle = tempDiv.find('title').html();

			// Inserts the specific content into the target element
			$('title').html(specificTitle);

			// Updates the URL in the address bar without reloading the page
			if (className == 'index') {
				var newUrl = window.location.protocol + '//' + window.location.host + '/cv_portal/';
				history.pushState({ path: newUrl }, '', newUrl);
			} else {
				var newUrl = window.location.protocol + '//' + window.location.host + '/cv_portal/' + className + '.html';
				history.pushState({ path: newUrl }, '', newUrl);
			}
		}).fail(function () {
			$('main').html('Sorry, there was an error loading the content.');
		});
	});

	// Handles back/forward navigation
	window.onpopstate = function (event) {
		if (event.state && event.state.path) {
			// Extract the page name (without leading slash and trailing file extension)
			var page;
			if (window.location.pathname == '/cv_portal/') {
				page = 'index';
			}
			else {
				page = window.location.pathname.slice(11, -5);
			}

			if (page) {
				// Creates the path to the file based on pathname
				var filePath = window.location.pathname;

				// Loads the content from the file into a hidden container/element
				$.get(filePath, function (data) {
					// Creates a temporary div element that holds the loaded data
					var tempDiv = $('<div>').html(data);

					// Finds the specific div element in the loaded file
					var specificContent = tempDiv.find('main').html();

					// Inserts the specific content into the target container
					$('main').html(specificContent);

					// Finds the specific title element in the loaded file
					var specificTitle = tempDiv.find('title').html();

					// Inserts the specific content into the target element
					$('title').html(specificTitle);

					// Update the aria-current attribute on the link that has a class name named after the page
					$('a').removeAttr('aria-current');
					$('a.' + page).attr('aria-current', 'page');
				}).fail(function () {
					$('main').html('Sorry, there was an error loading the content.');
				});
			}
		}
	};
});

// Vanilla JavaScript code to handle keypress detection and modal display
let typedKeys = '';
const secretCode = '1337';
const modal = document.getElementById('easteregg-modal');
const closeModal = document.getElementById('close-modal');

// Event listener for key presses
window.addEventListener('keydown', function(event) {
	// Append the pressed key to the typedKeys string
	typedKeys += event.key;

	// If the typed keys match the secret code
	if (typedKeys.endsWith(secretCode)) {
		modal.style.display = 'flex';
		typedKeys = ''; // Reset the typed keys after showing modal
	}

	// Limit the length of typedKeys to the length of the secretCode
	if (typedKeys.length > secretCode.length) {
		typedKeys = typedKeys.slice(1); // Remove the first character if it's too long
	}
});

// Close the modal when the user clicks the close button
closeModal.addEventListener('click', function() {
	modal.style.display = 'none';
});

// Close the modal if the user clicks anywhere outside of the modal content
window.addEventListener('click', function(event) {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
});

// Change body background color when the user clicks on span with easteregg class
document.querySelector('#easteregg').addEventListener('click', function() {
	// Check if span has a 'clicked' class
	if (this.classList.contains('clicked')) {
		// Remove the 'clicked' class from the span element
		this.classList.remove('clicked');
		// Reset the body background color
		document.body.style.backgroundColor = '';
		return;
	}
	else {
		document.body.style.backgroundColor = 'lightblue';
	}
	// Adds a 'clicked' class to the span element
	this.classList.add('clicked');
});