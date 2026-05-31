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

function displayColors() {

	mainDisplay.textContent = ""

	colorsILike.forEach(color => {
		const swatchContainer = document.createElement("div");
		swatchContainer.classList.add("swatch-container");
		const swatch = document.createElement("div");
		const header = document.createElement("h3");
		swatch.classList.add("swatch");
		swatch.style.backgroundColor = color;
		header.textContent = color;
		swatchContainer.appendChild(header);
		swatchContainer.appendChild(swatch);
		const dropDownMenu = document.createElement("select");
		const menuItem = ["--Select --", "Delete Swatch", "Add Color Name", "Move Swatch", "Edit Swatch"]

		menuItem.forEach(item => {
			const option = document.createElement("option");
			option.textContent = item;
			dropDownMenu.appendChild(option);

		})
		dropDownMenu.addEventListener("change", function () {
			let action = dropDownMenu.value;
			switch (action) {
				case "Delete Swatch":
					colorsILike.splice(colorsILike.indexOf(color), 1);
					displayColors();

					break;
				case "Add Color Name":

					break;
				case "Move Swatch":

					break;
				case "Edit Swatch":

					break;
				default:
					break;
			}
		})
		swatchContainer.appendChild(dropDownMenu);
		mainDisplay.appendChild(swatchContainer);



	});
	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));

}

displayColors();

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
	colorsILike.push(color);
	// alert(`You added ${color} to your list!`);
	input.value = "";
	displayColors();
});


