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

// push input box to array
// transfer and clean string to useable data
let input = document.querySelector("#input");
let addToMyColors = document.querySelector("#submit");
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
		const listEditDiv = document.createElement("div")
		listEditDiv.classList.add("list-edit-div")
		listDiv.appendChild(listEditDiv);
		const listHeaderDropDownMenu = document.createElement("select");
		const listHeaderMenuItem = ["--Edit List--", "Delete List", "Rename List", "Add Color to List"]

		listHeaderMenuItem.forEach(item => {
			const listOption = document.createElement("option");
			listOption.textContent = item;
			listHeaderDropDownMenu.appendChild(listOption);

		})
		listHeaderDropDownMenu.addEventListener("change", function () {
			let action = listHeaderDropDownMenu.value;
			switch (action) {
				case "Delete List":
					delete colorsILike[listName];
					displayColors();

					break;
				case "Rename List":
					const editListName = document.createElement("input")
					editListName.classList.add("edit-list-name-input")
					editListName.value = listName;
					const editListNameSubmitBtn = document.createElement("button")
					editListNameSubmitBtn.textContent = "Confirm"
					listEditDiv.appendChild(editListName);
					listEditDiv.appendChild(editListNameSubmitBtn);

					editListNameSubmitBtn.addEventListener("click", function () {
						if (editListName.value === "") {
							alert("Please add a name for the list")
							return;
						}
						else if (editListName.value !== listName) {
							// this line is replacing the key value 
							colorsILike[editListName.value] = colorsILike[listName];
							delete colorsILike[listName];
							currentList = editListName.value;
						}

						displayColors()

					})

					break;
				case "Add Color to List":
					let listAddColor = document.createElement("input");
					listAddColor.placeholder = "Enter Color"
					let listAddColorSubmit = document.createElement("button");
					listAddColorSubmit.textContent = "Add Color";
					let listAddColorCancel = document.createElement("button");
					listAddColorCancel.textContent = "Cancel";
					listEditDiv.appendChild(listAddColor);
					listEditDiv.appendChild(listAddColorSubmit);
					listEditDiv.appendChild(listAddColorCancel);

					listAddColorSubmit.addEventListener("click", function () {

						addColor(listName, listAddColor.value);
					})
					listAddColorCancel.addEventListener("click", function () {
						listAddColor.value = "";
						listAddColorSubmit.remove();
						listAddColorCancel.remove();
						displayColors();
					})

					break;

				default:
					break;
			}
		})
		listDiv.appendChild(listHeaderDropDownMenu);	


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
			const swatchDropDownMenu = document.createElement("select");
			const swatchMenuItem = ["--Edit Swatch--", "Delete Swatch", "Add Color Name", "Reorder", "Edit Swatch", "Make New List", "Move to List"]


			swatchMenuItem.forEach(item => {
				const swatchOption = document.createElement("option");
				swatchOption.textContent = item;
				swatchDropDownMenu.appendChild(swatchOption);

			})
			swatchDropDownMenu.addEventListener("change", function () {
				let action = swatchDropDownMenu.value;
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
							currentList = newListInput.value;
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							colorsILike[currentList].push(structuredClone(color));
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
						const listMoveDropDownMenu = document.createElement("select");
						listMoveDropDownMenu.id = "list-move-dropdown-menu";
						const listMovePlaceholder = document.createElement("option");
						listMovePlaceholder.textContent = "--Pick One--";
						listMoveDropDownMenu.appendChild(listMovePlaceholder);

						for (const list of Object.keys(colorsILike)) {
							const listMoveDropDownOption = document.createElement("option");
							if (list === listName) {
								continue;
							}
							listMoveDropDownOption.textContent = list;
							listMoveDropDownMenu.appendChild(listMoveDropDownOption);
						}
						listMoveDropDownMenu.addEventListener("change", function () {
							if (listMoveDropDownMenu.value === "--Pick One--") {
								return;
							}
							const newList = listMoveDropDownMenu.value;
							colorsILike[newList].push(structuredClone(color));
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							displayColors();
						})

						swatchContainer.appendChild(listMoveDropDownMenu);

						break;
					default:
						break;
				}
			})
			swatchContainer.appendChild(swatchDropDownMenu);
			listDiv.appendChild(swatchContainer);

		});
		mainDisplay.appendChild(listDiv);

	});
	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));
}

function addColor(selectedList, selectedColor) {
	let color = selectedColor.trim().toLowerCase();
	if (colorsILike[selectedList] === undefined) {
		colorsILike[selectedList] = [];
	}

	if (!color.startsWith("#")) {
		color = "#" + color;
	}

	// checks if input box is empty and if colorsILike array already has color
	if (color === "") {
		alert("Please enter a color");
		return;
	} else if (colorsILike[selectedList].some(colorObject => colorObject.hexValue === color)) {
		alert("You already have this color");
		return;
	}

	// Check hex value for valid length
	else if (color.length !== 7 && color.length !== 4) {
		alert("Please enter a valid hex color value");
		return;
	}
	// removes # from hex value
	const typedColor = color.slice(1);
	// checks if hex value contains valid characters
	for (const char of typedColor) {
		if ((char < 'a' || char > 'f') && (char < '0' || char > '9')) {
			alert("Please enter a valid hex color value");
			return;
		}
	}

	colorsILike[selectedList].push({
		hexValue: color,
		customName: ""
	});
	input.value = "";
	displayColors();

}

displayColors();

addToMyColors.addEventListener("click", function () {
	addColor(currentList, input.value);
});


