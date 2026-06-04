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
		const listHeaderContainer = document.createElement("div")
		listHeaderContainer.classList.add("list-header-container")
		const listHeader = document.createElement("h3");
		listHeader.textContent = listName;
		listHeader.classList.add("list-header");
		listHeaderContainer.appendChild(listHeader)
		listDiv.appendChild(listHeaderContainer);
		const listEditDiv = document.createElement("div")
		listEditDiv.classList.add("edit-list-container")
		listHeaderContainer.appendChild(listEditDiv);

		const listHeaderDropDownMenu = document.createElement("div");
		listHeaderDropDownMenu.classList.add("edit-list-menu")
		const listHeaderDropDownMenuPlaceholder = document.createElement("div")
		listHeaderDropDownMenuPlaceholder.textContent = "--Edit List--"
		listHeaderDropDownMenuPlaceholder.classList.add("edit-list-menu-placeholder")
		listHeaderDropDownMenu.appendChild(listHeaderDropDownMenuPlaceholder);

		listHeaderDropDownMenuPlaceholder.addEventListener("click", function () {
			listHeaderDropDownMenu.classList.toggle("open");
		})

		const listHeaderMenuItem = ["Rename List", "Add Color to List", "Move List", "Change List Background", "Delete List"]

		listHeaderMenuItem.forEach(item => {
			const listOption = document.createElement("div");
			listOption.classList.add("list-option")
			listOption.textContent = item;
			listHeaderDropDownMenu.appendChild(listOption);

			listOption.addEventListener("click", function () {

				let action = item;

				if (listEditDiv.children.length > 0 && action !== "Delete List") {
					return;
				}
				switch (action) {
					case "Delete List":
						delete colorsILike[listName];
						displayColors();

						break;
					case "Rename List":
						const editListName = document.createElement("input")
						editListName.classList.add("list-rename-input")
						editListName.value = listName;
						const editListNameSubmitBtn = document.createElement("button")
						editListNameSubmitBtn.textContent = "Confirm"
						editListNameSubmitBtn.classList.add("list-rename-submit-button")
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
						const listAddColor = document.createElement("input");
						listAddColor.classList.add("list-add-color-input")
						listAddColor.placeholder = "Enter Color"
						const listAddColorSubmit = document.createElement("button");
						listAddColorSubmit.classList.add("list-add-color-submit-button")
						listAddColorSubmit.textContent = "Add Color";

						listEditDiv.appendChild(listAddColor);
						listEditDiv.appendChild(listAddColorSubmit);

						listAddColorSubmit.addEventListener("click", function () {

							addColor(listName, listAddColor.value);
						})

						break;
					case "Move List":

						break;
					case "Change List Background":

						break;
					default:
						break;
				}
			})

		})
		listHeaderContainer.appendChild(listHeaderDropDownMenu);

		const swatchContainerWrapper = document.createElement("div")
		swatchContainerWrapper.classList.add("swatch-container-wrapper")	

		colorsILike[listName].forEach(color => {
			const swatchContainer = document.createElement("div");
			swatchContainer.classList.add("swatch-container");
			const swatchColor = document.createElement("div");
			swatchColor.classList.add("swatch-color");
			const swatchHeader = document.createElement("h4");
			swatchHeader.classList.add("swatch-header")
			swatchColor.style.backgroundColor = color.hexValue
			swatchHeader.textContent = color.hexValue;
			swatchContainer.appendChild(swatchHeader);
			const colorName = document.createElement("h5");
			colorName.classList.add("swatch-new-name");
			colorName.textContent = "\u00A0"
			swatchContainer.appendChild(colorName);


			if (color.customName !== "") {
				colorName.textContent = color.customName;
			}
			swatchContainer.appendChild(swatchColor);

			const swatchDropDownMenu = document.createElement("div");
			swatchDropDownMenu.classList.add("swatch-menu")
			const swatchMenuPlaceholder = document.createElement("div")
			swatchMenuPlaceholder.textContent = "--Edit Swatch--"
			swatchMenuPlaceholder.classList.add("swatch-menu-placeholder")
			swatchDropDownMenu.appendChild(swatchMenuPlaceholder);

			swatchMenuPlaceholder.addEventListener("click", function () {
				swatchDropDownMenu.classList.toggle("open");
			})

			const swatchMenuItem = ["Add Color Name",
				"Edit Swatch",
				"Move Swatch",
				"Copy to List",
				"Change Background",
				"Make New List",
				"Move to List",
				"Delete Swatch"] 


			swatchMenuItem.forEach(item => {
				const swatchOption = document.createElement("div");
				swatchOption.classList.add("swatch-option")
				swatchOption.textContent = item;
				swatchDropDownMenu.appendChild(swatchOption);

				swatchOption.addEventListener("click", function () {

					let action = item;
					if (swatchContainer.querySelector(
						`.swatch-add-name-container,
						.edit-swatch-container,
						.new-list-container,
						.list-move-menu`
					) && action !== "Delete Swatch") {
						return;
					}
					switch (action) {
						case "Delete Swatch":
						colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
						displayColors();

						break;
						case "Add Color Name":
							const colorNameDiv = document.createElement("div")
							colorNameDiv.classList.add("swatch-add-name-container")
							const nameInput = document.createElement("input")
							nameInput.classList.add("swatch-add-name-input")
							nameInput.placeholder = "Enter Color Name"
							nameInput.value = "Enter Color Name"
							colorNameDiv.appendChild(nameInput);
							const colorNameSubmitBtn = document.createElement("button")
							colorNameSubmitBtn.classList.add("swatch-add-name-button")
							colorNameSubmitBtn.textContent = "Add"
							colorNameDiv.appendChild(colorNameSubmitBtn);


							colorNameSubmitBtn.addEventListener("click", function () {
								color.customName = nameInput.value;
								displayColors();
							})

						swatchContainer.appendChild(colorNameDiv);

						break;
						case "Move Swatch":

							break;
						case "Edit Swatch":
							const editSwatchDiv = document.createElement("div")
							editSwatchDiv.classList.add("edit-swatch-container")
							const editSwatchInput = document.createElement("input")
							editSwatchInput.classList.add("edit-swatch-input")
							editSwatchInput.value = color.hexValue;
							editSwatchDiv.appendChild(editSwatchInput);
							const editSwatchSubmitBtn = document.createElement("button")
							editSwatchSubmitBtn.textContent = "Confirm"
							editSwatchSubmitBtn.classList.add("edit-swatch-button")
							editSwatchDiv.appendChild(editSwatchSubmitBtn);


							editSwatchSubmitBtn.addEventListener("click", function () {
								color.hexValue = editSwatchInput.value;
								displayColors();
							})


						swatchContainer.appendChild(editSwatchDiv);
						break;
						case "Make New List":
							const newListDiv = document.createElement("div")
							newListDiv.classList.add("new-list-container")
							const newListInput = document.createElement("input")
							newListInput.classList.add("new-list-input")
							newListInput.placeholder = "Name of New List"
							newListDiv.appendChild(newListInput);
							const newListSubmitBtn = document.createElement("button")
							newListSubmitBtn.textContent = "Create"
							newListSubmitBtn.classList.add("new-list-button")
							newListDiv.appendChild(newListSubmitBtn);


							newListSubmitBtn.addEventListener("click", function () {
								colorsILike[newListInput.value] = [];
								currentList = newListInput.value;
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							colorsILike[currentList].push(structuredClone(color));
							displayColors();

						})


						swatchContainer.appendChild(newListDiv);
						break;
						case "Move to List":
							const listMoveDropDownMenu = document.createElement("div");
							listMoveDropDownMenu.classList.add("list-move-menu")
							const listMovePlaceholder = document.createElement("div");
							listMovePlaceholder.textContent = "--Pick One--";
							listMovePlaceholder.classList.add("list-move-placeholder")
							listMoveDropDownMenu.appendChild(listMovePlaceholder);

							listMovePlaceholder.addEventListener("click", function () {
								listMoveDropDownMenu.classList.toggle("open");
							})

							for (const list of Object.keys(colorsILike)) {
								const listMoveDropDownOption = document.createElement("div");
								listMoveDropDownOption.classList.add("list-move-option")

								if (list === listName) {
									continue;
								}
								listMoveDropDownOption.textContent = list;
								listMoveDropDownMenu.appendChild(listMoveDropDownOption);
								listMoveDropDownOption.addEventListener("click", function () {

									const newList = listMoveDropDownOption.textContent;
									colorsILike[newList].push(structuredClone(color));
									colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
									displayColors();
								})
							}

							swatchContainer.appendChild(listMoveDropDownMenu);

							break;
						case "Change Background":




							break;
						case "Copy to List":



							break;

						default:
							break;
					}
				})

			})
			swatchContainer.appendChild(swatchDropDownMenu);
			swatchContainerWrapper.appendChild(swatchContainer);

		});
		listDiv.appendChild(swatchContainerWrapper);
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


