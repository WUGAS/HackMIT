function getBalance(){
	var apiurl = "https://api.coinbase.com/v1/accounts",
	api = 'prgctATJ4Q2A160N',
	apiSecret = "hBBArWmKPcz7kOQJPFGllRIcwus2w7Bi"

	nonce = "1",
	hash = CryptoJS.HmacSHA256(nonce + apiurl, apiSecret),

	xhr = new XMLHttpRequest();
	xhr.open('GET', apiurl, true);
	
	xhr.setRequestHeader("Accept", "*/*");
	// xhr.setRequestHeader("User-Agent", "Ruby");
	xhr.setRequestHeader("ACCESS_KEY", api);
	xhr.setRequestHeader("ACCESS_SIGNATURE", hash);
	xhr.setRequestHeader("ACCESS_NONCE", nonce);
	xhr.setRequestHeader("Connection", "close");
	xhr.setRequestHeader("Host", "coinbase.com");

	xhr.send();
	console.log(xhr.responseText);


	// if (this.headers) {
	// 	log("Setting HTTP headers");
	// 	var headers = this.headers;
	// 	$(headers).each(function(i) {
	// 		var header = headers[i];
	// 		var key = header.key;
	// 		var value = header.value;
	// 		xhr.setRequestHeader(key, value);
	// 	});
	// }
	// $.get
}

getBalance();