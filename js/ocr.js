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
		if (grayscale < 150) {
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
		fnHandleReadyState(xhr, function(data) {
			var response = $.parseJSON(data.responseText);
			console.log(response);
			// console.log(response['text_block'][0].text);
		});
	}
	xhr.onload = function() {};
	xhr.send(fd);
}