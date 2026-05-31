// global variables and initilizations
// this line will retrieve the saved array from local storage
let colorsILike;
if (localStorage.getItem("colorsILike") !== null) {
	colorsILike = JSON.parse(localStorage.getItem("colorsILike"));
} else {
	colorsILike = [];
}

let color;
// push input box to array
// transfer and clean string to useable data
let input = document.querySelector("#input");
let addColor = document.querySelector("#submit");
let mainDisplay = document.querySelector("#colors-display");

addColor.addEventListener("click", function () {
	color = input.value.toLowerCase();
	color = color.trim();

	if (color === "") {
		alert("Please enter a color");
		return;
	}

	if (colorsILike.includes(color)) {
		alert("You already have this color");
		return;
	}

	// Check hex value for valid length
	let validHexLength = 7
	if color.length > validHexLength {
		alert("Please enter a valid hex color value");
		return;
	}

	// Check hex values are numerically valid
	// Starts at 1 due to `#` at start
	for (let i = 1; i < color.length; i += 2) {
		let hexSlice = color.slice(i, i + 2);
		let decValue = parseInt(hexSlice, 16);
		if (isNaN(decValue)) {
			alert("Please enter a valid hex color value");
			return;
		}
	}

	colorsILike.push(color);
	alert(`You added ${color} to your list!`);
	input.value = "";

	mainDisplay.textContent = "";

	colorsILike.forEach((color) => {
		let container = document.createElement("div");
		container.classList.add("swatch-container");
		let swatch = document.createElement("div");
		let header = document.createElement("h3");
		swatch.classList.add("swatch");
		swatch.style.backgroundColor = color;
		header.textContent = color;
		container.appendChild(header);
		container.appendChild(swatch);
		mainDisplay.appendChild(container);
	});

	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));
});

// let test1Colors = [
// 	{ name: "Oxford Blue", hex: "#070F34" },
// 	{ name: "Zaffre", hex: "#0313A6" },
// 	{ name: "Dark violet", hex: "#9201CB" },
// 	{ name: "Hollywood cerise", hex: "#F715AB" },
// 	{ name: "Fluorescent cyan", hex: "#34EDF3" },
// ];

// function createTable() {
// 	let headers = ["Name", "Hex Value"];
// 	let table = document.createElement("TABLE");

// 	for (let i = 0; i < test1Colors.length; i++) {
// 		let row = table.insertRow(i);
// 		row.insertCell(0).innerHTML = test1Colors[i].name;
// 		(row.insertCell(1), (innerHTML = test1Colors[i].hex));
// 	}

// 	let header = table.createTHead();
// 	let headerRow = header.insertRow(0);
// 	for (let i = 0; i < headers.length; i++) {
// 		(headerRow.insertCell(i), (innerHTML = headers[i]));
// 	}

// 	let tableDiv = document.getElementByID("tableDisplay");
// 	document.tableDisplay.append(table);
// }

// createTable();
