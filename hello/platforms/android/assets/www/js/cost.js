function figureIndividualCost(numPeople, totalCost, myCost, tip, tax) {
	var ratioCost = myCost / totalCost;
	var extraPay = ratioCost * (tip + tax);
	var totalToPay = extraPay + myCost;

	// round up two decimal places
	var finalPayment = (Math.ceil(totalToPay * 100) / 100).toFixed(2);
	return finalPayment;
}

function figureGroupCost(peopleDict, dishDict, numPeople, totalCost, tip, tax) {
	var peoplePriceDict = {};

	for (var people in peopleDict) {
		myEntreeCost = 0;
		for (var food in peopleDict[people]) {
			numPeopleSharing = sharing(peopleDict, peopleDict[people][food]);
			console.log("sharing: " + numPeopleSharing);
			myEntreeCost += (dishDict[peopleDict[people][food]] / numPeopleSharing);
		}
		console.log("inidiviaul entree: " + myEntreeCost);
		var myFinalPayment = figureIndividualCost(numPeople, totalCost, myEntreeCost, tip, tax);
		console.log("inidiviaul: " + myFinalPayment);
		peoplePriceDict[people] = myFinalPayment;
	}

	return peoplePriceDict;
}

function sharing(peopleDict, dish) {
	var count = 0;
	for (var people in peopleDict) {
		if (peopleDict[people].indexOf(dish) > -1) {
			count += 1;
		}
	}
	return count;
}

var peopleDict = {};
function addToPeopleDict(person, dish) {
	if (peopleDict[person] == undefined) {
		peopleDict[person] = [dish];
	} else if (peopleDict[person].indexOf(dish) < 0) {
		peopleDict[person].push(dish);
	} else if (peopleDict[person].indexOf(dish) >= 0) {
		peopleDict[person].splice(peopleDict[person].indexOf(dish), 1);
	}
	return peopleDict;
}

// TEST
// figureIndividualCost(2, 10, 4, 2, 1);

// var peopleDict = {};
// peopleDict["Suhong"] = ["Burger", "Fries"];
// peopleDict["Greg"] = ["Fries"];
// var tip = 2,
// tax = 1,
// numPeople = 2,
// totalCost = 15,
// dishDict = {};
// dishDict["Burger"] = 10.00;
// dishDict["Fries"] = 5.00;
// var finalPayment = figureGroupCost(peopleDict, dishDict, numPeople, totalCost, tip, tax);
// console.log(finalPayment["Suhong"]);