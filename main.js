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
let swatchBox = document.querySelector(".swatch-box");

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


