// global variables and initilizations
// this line will retrieve the saved array from local storage
// localStorage.clear()
let colorsILike;
if (localStorage.getItem("colorsILike") !== null) {
	colorsILike = JSON.parse(localStorage.getItem("colorsILike"));
} else {
	colorsILike = {};
}
let currentList = "My Colors";
let color;
// push input box to array
// transfer and clean string to useable data
let input = document.querySelector("#input");
let addColor = document.querySelector("#submit");
let mainDisplay = document.querySelector("#colors-display");
let swatchBox = document.querySelector(".swatch-box");

function displayColors() {

	mainDisplay.textContent = ""

	Object.keys(colorsILike).forEach(listName => {
		const listDiv = document.createElement("div");
		listDiv.classList.add("list-div");
		const listHeader = document.createElement("h2");
		listHeader.textContent = listName;
		listDiv.appendChild(listHeader);

		colorsILike[listName].forEach(color => {
			const swatchContainer = document.createElement("div");
			swatchContainer.classList.add("swatch-container");
			const swatch = document.createElement("div");
			const header = document.createElement("h3");
			swatch.classList.add("swatch");
			swatch.style.backgroundColor = color.hexValue
			header.textContent = color.hexValue;
			swatchContainer.appendChild(header);

			if (color.customName !== "") {
				const colorName = document.createElement("p");
				colorName.textContent = color.customName;
				swatchContainer.appendChild(colorName);
			}
			swatchContainer.appendChild(swatch);
			const dropDownMenu = document.createElement("select");
			const menuItem = ["--Select --", "Delete Swatch", "Add Color Name", "Reorder", "Edit Swatch", "Make New List", "Move to List"]


			menuItem.forEach(item => {
				const option = document.createElement("option");
				option.textContent = item;
				dropDownMenu.appendChild(option);

			})
			dropDownMenu.addEventListener("change", function () {
				let action = dropDownMenu.value;
				switch (action) {
					case "Delete Swatch":
						colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
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
						colorNameSubmitBtn.textContent = "Add"
						colorNameDiv.appendChild(colorNameSubmitBtn);
						const colorNameCancelBtn = document.createElement("button")
						colorNameCancelBtn.textContent = "Cancel"
						colorNameDiv.appendChild(colorNameCancelBtn);

						colorNameSubmitBtn.addEventListener("click", function () {
							color.customName = nameInput.value;
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
					case "Reorder":

						break;
					case "Edit Swatch":

						break;
					case "Make New List":
						const newListDiv = document.createElement("div")
						newListDiv.classList.add("new-list-box")
						const newListInput = document.createElement("input")
						newListInput.classList.add("new-list-input")
						newListInput.placeholder = "Name of New List"
						newListDiv.appendChild(newListInput);
						const newListSubmitBtn = document.createElement("button")
						newListSubmitBtn.textContent = "Create"
						newListDiv.appendChild(newListSubmitBtn);
						const newListCancelBtn = document.createElement("button")
						newListCancelBtn.textContent = "Cancel"
						newListDiv.appendChild(newListCancelBtn);

						newListSubmitBtn.addEventListener("click", function () {
							colorsILike[newListInput.value] = [];
							colorsILike[newListInput.value].push(color);
							currentList = newListInput.value;
							displayColors();

						})
						newListCancelBtn.addEventListener("click", function () {
							newListInput.value = "";
							newListDiv.removeChild(newListInput);
							newListDiv.removeChild(newListSubmitBtn);
							newListDiv.removeChild(newListCancelBtn);
							displayColors();
						})

						swatchContainer.appendChild(newListDiv);
						break;
					case "Move to List":

						break;
					default:
						break;
				}
			})
			swatchContainer.appendChild(dropDownMenu);
			listDiv.appendChild(swatchContainer);



		});
		mainDisplay.appendChild(listDiv);

	});
	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));
}

displayColors();

addColor.addEventListener("click", function () {
	if (colorsILike[currentList] === undefined) {
		colorsILike[currentList] = [];
	}
	color = input.value.toLowerCase();
	color = color.trim();

	if (!color.startsWith("#")) {
		color = "#" + color;
	}

	// checks if input box is empty and if colorsILike array already has color
	if (color === "") {
		alert("Please enter a color");
		return;
	} else if (colorsILike[currentList].some(colorObject => colorObject.hexValue === color)) {
		alert("You already have this color");
		return;
	}

	// Check hex value for valid length
	else if (color.length !== 7 && color.length !== 4) {
		alert("Please enter a valid hex color value");
		return;
	}



	const typedColor = color.slice(1);



	for (const char of typedColor) {
		if ((char < 'a' || char > 'f') && (char < '0' || char > '9')) {
			alert("Please enter a valid hex color value");
			return;
		}
	}


	colorsILike[currentList].push({
		hexValue: color,
		customName: ""
	});
	input.value = "";
	displayColors();
});


