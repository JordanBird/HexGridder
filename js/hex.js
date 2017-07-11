var Hex = (function () {
	var width = 50;
	var height = 28.84615;
	var columns = 20;
	var rows = 4;
	var hexMargin = 3;
	var colour = '#4286f4';
	var hoverColour = '#7299F2';
	var selectedColour = '#FFCD69';

	var styleElement;

	var mouseDown = false;
	
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
		var inputColumns = parseInt($('#columns').val());
		var inputRows = parseInt($('#rows').val());
		var inputWidth = parseFloat($('#width').val());
		var inputHeight = parseFloat($('#height').val());
		var inputColour = $('#colour').val();
		var inputHoverColour = $('#hoverColour').val();
		var inputSelectedColour = $('#selectedColour').val();
		
		if (inputColumns <= 0 || inputRows <= 0) {
			alert("Please enter at least 1 or more for columns and rows.");
			return false;
		}
		
		if ($('#fitcolumns').prop('checked')) {
			inputWidth = getWidthToAvailableContainerSpace(hexMargin, inputColumns);
		}
		
		var newValues;
		if (width != inputWidth) {
			newValues = getHexSizesFromWidth(inputWidth);
		}
		else if (height != inputHeight) {
			newValues = getHexSizesFromHeight(inputHeight);
		}
		else {
			newValues = createHexSixes(inputWidth, inputHeight);
		}
		
		width = newValues.Width;
		height = newValues.Height;
		columns = inputColumns;
		rows = inputRows;
		colour = inputColour;
		hoverColour = inputHoverColour;
		selectedColour = inputSelectedColour;

		initDefaultValues();
		
		return true;
	}

	function updateStyleElement() {
		var newStyles = "<style type='text/css'>";
		
		//Update Colour
		newStyles += ".hex-container .hex-row .hex.selected{ background-color:" + selectedColour + ";border-bottom-color:" + selectedColour +";border-top-color:" + selectedColour +"}";
		
		//Update Size
		var halfWidth = width / 2;
		var halfHeight = height / 2;
		
		//Update Outer Hex
		newStyles += ".hex-container .hex-row .hex { margin-top: " + halfHeight + "px; width: " + width + "px; height: " + height + "px; }";
		
		//Update Before
		newStyles += ".hex-container .hex-row .hex:before { border-left-width: " + halfWidth + "px; border-right-width: " + halfWidth + "px; top: " + -halfHeight + "px; border-bottom-width: " + halfHeight + "px; }"
			
		//Update After
		newStyles += ".hex-container .hex-row .hex:after { border-left-width: " + halfWidth + "px; border-right-width: " + halfWidth + "px; bottom: " + -halfHeight + "px; border-top-width: " + halfHeight + "px; }"

		//Update Row
		newStyles += ".hex-container .hex-row:nth-child(2n+0) { margin-left: " + (halfWidth + 1) + "px; }"
		
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
		$('.hex').mousedown(function() {
			mouseDown = true;
			$(this).toggleClass('selected');
		})
		$(document).mouseup(function() {
			mouseDown = false;
		});
		
		$(".hex").mouseover(function(){
			if(mouseDown) {
				$(this).toggleClass('selected');
			}
		});
	}

	function getHexSizesFromWidth(newWidth) {
		var newHeight = newWidth * 0.57692307692308; //Width to Height: Width * 0.57692307692308.
		
		return createHexSixes(newWidth, newHeight);
	}
	
	function getHexSizesFromHeight(newHeight) {
		var newWidth = newHeight * 1.7333333333333; //Height to Width: Height * 1.7333333333333.
		
		return createHexSixes(newWidth, newHeight);
	}
	
	function createHexSixes(width, height) {
		return {
			Width: width,
			Height: height
		};
	}
	
	function getWidthToAvailableContainerSpace(newHexMargin, newColumns) {
		var containerWidth = $('.hex-container').width();
		
		return (containerWidth - ((newColumns + 1) * newHexMargin)) / (newColumns + 0.5);
	}
	
    return {
        init: function () {
			initDefaultValues();
            initSubmissions();
			initClickEvents();
        }
    }
})();