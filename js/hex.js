var Hex = (function () {
	var width = 50;
	var height = 28.84615;
	var columns = 10;
	var rows = 4;
	var colour = '#4286f4';
	var hoverColour = '#72a8ff';
	var selectedColour = 'red';

	var styleElement;

	function generateFromForm(e) {
		e.preventDefault();
		
		if (!populateValues()) {
			return;
		}

		var outHTML = '';
		for (var y = 0; y < rows; y++) {
			outHTML += '<div class="hex-row">';
			
			for (var x = 0; x < columns; x++) {
				outHTML += '<div class="hex"> </div>';
			}
			
			outHTML += '</div>';
		}
		
		$('.hex-container').html(outHTML);

		initClickEvents();
		updateStyleElement();
	}

	function populateValues() {
		var inputColumns = $('#columns').val();
		var inputRows = $('#rows').val();
		var inputWidth = $('#width').val();
		var inputHeight = $('#height').val();
		var inputColour = $('#colour').val();
		var inputHoverColour = $('#hoverColour').val();
		var inputSelectedColour = $('#selectedColour').val();
		
		if (inputColumns <= 0 || inputRows <= 0) {
			alert("Please enter at least 1 or more for columns and rows.");
			return false;
		}

		columns = inputColumns;
		rows = inputRows;
		width = inputWidth;
		height = inputHeight;
		colour = inputColour;
		hoverColour = inputHoverColour;
		selectedColour = inputSelectedColour;

		return true;
	}

	function updateStyleElement() {
		var newStyles = "<style type='text/css'>";
		newStyles += ".hex-container .hex-row .hex.selected{ background-color:" + selectedColour + ";border-bottom-color:" + selectedColour +";border-top-color:" + selectedColour +"}";
		newStyles += "</style>";
		
		$(styleElement).remove();
		styleElement = $(newStyles).appendTo("body");
	}

	function initDefaultValues() {
		$('#columns').val(columns);
		$('#rows').val(rows);
		$('#width').val(width);
		$('#height').val(height);
		$('#colour').val(colour);
		$('#hoverColour').val(hoverColour);
		$('#selectedColour').val(selectedColour);
	}

	function initSubmissions() {
		$('#hexgenerator').on('submit', function (e) {
			generateFromForm(e);
		});
	}

	function initClickEvents() {
		$('.hex').on('click', function (e) {
			$(this).toggleClass('selected');
		});
	}

    return {
        init: function () {
			initDefaultValues();
            initSubmissions();
			initClickEvents();
        }
    }
})();