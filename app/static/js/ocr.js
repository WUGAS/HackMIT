// function ocr(img) {
// 	var url = "https://api.idolondemand.com/1/api/async/ocrdocument/v1",
// 		apiKey = "7841412a-cc8a-491e-af94-2f23ab78d537",
// 		data = {
// 			apikey: apiKey,
// 			file: img
// 		};

// 	$.post(url, data, function(result) {
// 		console.log(result);
// 	});

// }
var something = null;
var colors = ["87ceeb", "be0d0d", "f39f32", "3399ff", "e5ce30", "c5c4bc", "00b770", "1c75cf"];
var dict = null;

var imageLoader = document.getElementById('file');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function handleImage(e) {
	var reader = new FileReader();
	reader.onload = function(event) {
		var img = new Image();
		img.onload = function() {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			grayScale(ctx, canvas);
			sendPost();
		}
		img.src = event.target.result;
	}
	reader.readAsDataURL(e.target.files[0]);
}

function grayScale(context, canvas) {
	var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	var pixels = imgData.data;
	for (var i = 0, n = pixels.length; i < n; i += 4) {
		var grayscale = pixels[i] * 0.33 + pixels[i + 1] * 0.33 + pixels[i + 2] * 0.33;
		if (grayscale < 100) {
			pixels[i] = 0; // red
			pixels[i + 1] = 0; // green
			pixels[i + 2] = 0; // blue
			//pixels[i+3]              is alpha
		} else {
			pixels[i] = 256;
			pixels[i + 1] = 256;
			pixels[i + 2] = 256;
		}
	}
	//redraw the image in black & white
	context.putImageData(imgData, 0, 0);
}

function sendPost() {
	var fd = new FormData(),
		apiurl = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1";

	var canvas = document.getElementById("canvas");
	var img = canvas.toDataURL("image/png");

	var blobBin = atob(img.split(',')[1]);
	var array = [];
	for (var i = 0; i < blobBin.length; i++) {
		array.push(blobBin.charCodeAt(i));
	}
	var file = new Blob([new Uint8Array(array)], {
		type: 'image/png'
	});

	fd.append("file", file);
	fd.append("apikey", "7841412a-cc8a-491e-af94-2f23ab78d537");
	fd.append("mode", "scene_photo");

	xhr = new XMLHttpRequest();
	xhr.open('POST', apiurl, true);

	if (this.headers) {
		log("Setting HTTP headers");
		var headers = this.headers;
		$(headers).each(function(i) {
			var header = headers[i];
			var key = header.key;
			var value = header.value;
			xhr.setRequestHeader(key, value);
		});
	}

	xhr.onreadystatechange = function() {
		fnHandleReadyState(xhr, ocrCallback); 
		// function(data) {
		// 	var response = $.parseJSON(data.responseText);
		// 	// console.log(response);
		// 	console.log(response['text_block'][0].text);
		// 	test = fixOCR(response['text_block'][0].text);
		// 	// console.log('redone: \n' + test);
		// 	console.log(test);
		// });
	}
	xhr.onload = function() {};
	xhr.send(fd);
}

function ocrCallback(data) {
	var response = $.parseJSON(data.responseText);
	dataArray = fixOCR(response['text_block'][0].text);
	dict = parseOCR(dataArray);

	for (var i = 0; i < numberOfPeople; i++) {
		$('[data-container]').hide();
		$('[data-interface-people-container]').append('<div class="circle degrees-' + Math.floor((i+1)/numberOfPeople * 360) + '"><button class="btn circle-button" data-person-button-' + i + ' style="background-color: #' + colors[i%colors.length] + ';"></button>' + $('[data-person-' + (i + 1) + ']').val() + '</div>');
	}

	run(0);
}

function run(index) {
	dict = 
}

function fixOCR(str) {
	// var fixDict = {};
	// fixDict["s"] = "5";
	// fixDict["S"] = "5";
	// fixDict["l"] = "1"; ONLY PROBLEM
	// fixDict["u"] = "0";
	// fixDict["o"] = "0";
	// fixDict["O"] = "0";
	// fixDict["b"] = "8";
	var line = str.split('\n');
	var finalArr = [];
	for (var i = 0; i < line.length; i++) {
		var fixedArr = [];
		var wordArr = line[i].split(' ');
		var wordWork = true;
		var workingString = "";
		for (var j = 0; j < wordArr.length; j++) {
			var word = wordArr[j];
			if (isNaN(word)) { //not a number
				if (word.length == 1 && word == "l") { //potential joining of elements
					if (!(isNaN("1"+wordArr[j+1]))) {
						fixedArr.push(workingString.substring(0, workingString.length - 1));
						fixedArr.push("1"+wordArr[j+1]);
						workingString = "";
						j += 1;
					}
					else {
						workingString += (word + " ");
					}
				}	
				else {
					workingString += (word + " ");
				}	
			}
			else { //is a number

				if (wordWork) {
					fixedArr.push(workingString.substring(0, workingString.length - 1));
					workingString = word;
					wordWork = false;
				}
				else {
					workingString += word;
				}
			}
		}
		if (workingString.length != 0) {
			fixedArr.push(workingString);
		}
		finalArr.push(fixedArr);
	}
	return finalArr;
}

function parseOCR(receiptArray) { //[0] -> entree, [1] -> price
	var fin = {};
	fin['tip'] = 0;
	fin['tax'] = 0;
	fin['dishes'] = {};
	for (var i = 0; i < receiptArray.length; i++) {
		var title = receiptArray[i][0];
		var num = receiptArray[i][1];
		if (title.toLowerCase() == 'total') {
			fin['total'] = num;
		}
		else if (title.toLowerCase() == 'subtotal' || title.toLowerCase() == 'credit card' || title.toLowerCase() == 'total tendered') {
			//do nothing
		}
		else if (title.toLowerCase() == 'tip') {
			fin['tip'] = num;
		}
		else if (title.toLowerCase() == 'tax') {
			fin['tax'] = num;
		}
		else { //FOOD
			fin['dishes'][title] = num;
		}
	}
	return fin;
}