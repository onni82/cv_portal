$(document).ready(function () {
	// Hanterar klickhändelsen på ett a-element som har klassen "clickable"
	$('a.clickable').click(function (event) {
		event.preventDefault();

		// Tar bort aria-current="page" från alla a-element
		$('a').removeAttr('aria-current');

		// Lägger till aria-current="page" på det klickade a-elementet
		$(this).attr('aria-current', 'page');

		// Hämtar den andra klassen från det klickade elementet som motsvarar länken
		var className = $(this).attr('class').split(" ")[1];

		// Skapar sökvägen till filen baserat på klassnamn
		var filePath = className + '.html';

		// Laddar in innehållet från filen till en dold behållare/element
		$.get(filePath, function (data) {
			// Skapar ett temporärt div-element som håller den laddade datan
			var tempDiv = $("<div>").html(data);

			// Hittar det specifika div-elementet i den laddade filen
			var specificContent = tempDiv.find("#page").html();

			// Infogar det specifika innehållet i behållaren som är målet
			$("#page").html(specificContent);

			// Updatera URL:en utan att ladda om sidan
			if (className == "index") {
				var newUrl = window.location.protocol + "//" + window.location.host + "/";
				history.pushState({ path: newUrl }, '', newUrl);
			} else {
				var newUrl = window.location.protocol + "//" + window.location.host + "/" + className + ".html";
				history.pushState({ path: newUrl }, '', newUrl);
			}
		}).fail(function () {
			$("#page").html("Sorry, there was an error loading the content.");
		});
	});

	// Hanterar navigering bakåt/framåt
	window.onpopstate = function (event) {
		if (event.state && event.state.path) {
			// Extrahera sidans namn (utan ledande snedstreck och avslutande filändelse)
			var page = window.location.pathname.slice(1, -5);

			if (page) {
				// Skapar sökvägen till filen baserat på pathname
				var filePath = window.location.pathname;

				// Laddar in innehållet från filen till en dold behållare/element
				$.get(filePath, function (data) {
					// Skapar ett temporärt div-element som håller den laddade datan
					var tempDiv = $('<div>').html(data);

					// Hittar det specifika div-elementet i den laddade filen
					var specificContent = tempDiv.find('#page').html();

					// Infogar det specifika innehållet i behållaren som är målet
					$('#page').html(specificContent);

					// Uppdatera aria-current-attributet på länken som har ett klassnamn döpt efter sidan
					$('a').removeAttr('aria-current');
					$('a.' + page).attr('aria-current', 'page');
				}).fail(function () {
					$('#page').html("Sorry, there was an error loading the content.");
				});
			}
		}
	};

	// JavaScript code to handle keypress detection and modal display
	let typedKeys = '';
	const secretCode = '1337';
	const modal = document.getElementById('myModal');
	const closeModal = document.getElementById('closeModal');

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
});