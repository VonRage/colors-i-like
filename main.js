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
		swatch.style.backgroundColor = color.hexValue;
		header.textContent = color.customName || color.hexValue;
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
					const colorNameDiv = document.createElement("div")
					colorNameDiv.classList.add("color-name-box")
					const nameInput = document.createElement("input")
					nameInput.classList.add("color-name-input")
					nameInput.placeholder = "Enter Color Name"
					colorNameDiv.appendChild(nameInput);
					const colorNameSubmitBtn = document.createElement("button")
					colorNameSubmitBtn.textContent = "Submit"
					colorNameDiv.appendChild(colorNameSubmitBtn);
					const colorNameCancelBtn = document.createElement("button")
					colorNameCancelBtn.textContent = "Cancel"
					colorNameDiv.appendChild(colorNameCancelBtn);

					colorNameSubmitBtn.addEventListener("click", function () {
						const colorName = nameInput.value;
						color.customName = colorName;
						displayColors();
					})
					colorNameCancelBtn.addEventListener("click", function () {
						nameInput.value = "";
						colorNameDiv.removeChild(nameInput);
						colorNameDiv.removeChild(colorNameSubmitBtn);
						colorNameDiv.removeChild(colorNameCancelBtn);
						displayColors();
					})

					swatchContainer.appendChild(colorNameDiv);

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

	if (!color.startsWith("#")) {
		color = "#" + color;
	}

	// checks if input box is empty and if colorsILike array already has color
	if (color === "") {
		alert("Please enter a color");
		return;
	} else if (colorsILike.some(colorObject => colorObject.hexValue === color)) {
		alert("You already have this color");
		return;
	}

	// Check hex value for valid length
	else if (color.length !== 7 && color.length !== 4) {
		alert("Please enter a valid hex color value");
		return;
	}

	// Check hex values are numerically valid


	const typedColor = color.slice(1);



	for (const char of typedColor) {
		if ((char < 'a' || char > 'f') && (char < '0' || char > '9')) {
			alert("Please enter a valid hex color value");
			return;
		}
	}


	colorsILike.push({
		hexValue: color,
		customName: ""
	});
	input.value = "";
	displayColors();
});


