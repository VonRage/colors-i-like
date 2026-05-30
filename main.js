var test1Colors = [
	{ name: "Oxford Blue", hex: "#070F34" },
	{ name: "Zaffre", hex: "#0313A6" },
	{ name: "Dark violet", hex: "#9201CB" },
	{ name: "Hollywood cerise", hex: "#F715AB" },
	{ name: "Fluorescent cyan", hex: "#34EDF3" }
];

function createTable() {
	var headers = ["Name", "Hex Value"];
	var table = document.createElement("TABLE");

	for(var i = 0; i < test1Colors.length; i++) {
		var row = table.insertRow(i);
		row.insertCell(0).innerHTML = test1Colors[i].name;
		row.insertCell(1),innerHTML = test1Colors[i].hex;
	}

	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	for(var i = 0; i < headers.length; i++) {
		headerRow.insertCell(i),innerHTML = headers[i];
	}

	var tableDiv = document.getElementByID("tableDisplay");
	document.tableDisplay.append(table);
}

createTable();
