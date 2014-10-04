function ocr(img) {
	var url = "https://api.idolondemand.com/1/api/async/ocrdocument/v1",
	apiKey = "7841412a-cc8a-491e-af94-2f23ab78d537",
	data = {apikey:apiKey, file:img};
	$.post(url, data, function(result) {
		console.log(result);
	});

}

imgFile = "/Users/suhong/hackmit/test.png";
ocr(imgFile);