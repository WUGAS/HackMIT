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
function sendPost() {
	var error = null;

	var fd = new FormData();

	// set input parameter
	// input validation should happen in IODRequest parent type or child type
	// other parameters
	fd.append("file", $("#file")[0].files[0]);
	fd.append("apikey", "7841412a-cc8a-491e-af94-2f23ab78d537");
	fd.append("mode", "scene_photo");

	//var apiurl = IOD.APIS[this.api];
	var apiurl = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1";

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
			something = data.responseText;
			console.log(something);
		});
	}
	xhr.onload = function() {};
	xhr.send(fd);
	// imgFile = photo = document.getElementById("photo");//"/Users/suhong/hackmit/test.png";
	// console.log(imgFile)
	// ocr(imgFile);
}