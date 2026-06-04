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
		const listHeader = document.createElement("h2");
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

		const listHeaderMenuItem = ["Rename List", "Add Color to List", "Delete List",]

		listHeaderMenuItem.forEach(item => {
			const listOption = document.createElement("div");
			listOption.classList.add("list-option")
			listOption.textContent = item;
			listHeaderDropDownMenu.appendChild(listOption);

			listOption.addEventListener("click", function () {


				let action = item;
				switch (action) {
					case "Delete List":
						delete colorsILike[listName];
						displayColors();

						break;
					case "Rename List":
						const editListName = document.createElement("input")
						editListName.classList.add("edit-list-input")
					editListName.value = listName;
					const editListNameSubmitBtn = document.createElement("button")
					editListNameSubmitBtn.textContent = "Confirm"
						editListNameSubmitBtn.classList.add("edit-list-button")
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
						listAddColor.classList.add("edit-list-input")
						listAddColor.placeholder = "Enter Color"
						let listAddColorSubmit = document.createElement("button");
						listAddColorSubmit.classList.add("edit-list-button")
					listAddColorSubmit.textContent = "Add Color";
					let listAddColorCancel = document.createElement("button");
						listAddColorCancel.classList.add("edit-list-button")
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

		})
		listHeaderContainer.appendChild(listHeaderDropDownMenu);

		const swatchContainerWrapper = document.createElement("div")
		swatchContainerWrapper.classList.add("swatch-container-wrapper")	

		colorsILike[listName].forEach(color => {
			const swatchContainer = document.createElement("div");
			swatchContainer.classList.add("swatch-container");
			const swatchColor = document.createElement("div");
			swatchColor.classList.add("swatch-color");
			const swatchHeader = document.createElement("h3");
			swatchHeader.classList.add("swatch-header")
			swatchColor.style.backgroundColor = color.hexValue
			swatchHeader.textContent = color.hexValue;
			swatchContainer.appendChild(swatchHeader);

			if (color.customName !== "") {
				const colorName = document.createElement("p");
				colorName.classList.add("swatch-new-name")
				colorName.textContent = color.customName;
				swatchContainer.appendChild(colorName);
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

			const swatchMenuItem = ["Add Color Name", "Reorder", "Edit Swatch", "Make New List", "Move to List", "Delete Swatch"] 


			swatchMenuItem.forEach(item => {
				const swatchOption = document.createElement("div");
				swatchOption.classList.add("swatch-option")
				swatchOption.textContent = item;
				swatchDropDownMenu.appendChild(swatchOption);

				swatchOption.addEventListener("click", function () {

					let action = item;
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
							colorNameDiv.appendChild(nameInput);
							const colorNameSubmitBtn = document.createElement("button")
							colorNameSubmitBtn.classList.add("swatch-add-name-button")
							colorNameSubmitBtn.textContent = "Add"
							colorNameDiv.appendChild(colorNameSubmitBtn);
							const colorNameCancelBtn = document.createElement("button")
							colorNameCancelBtn.classList.add("swatch-add-name-button")
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
							const editSwatchCancelBtn = document.createElement("button")
							editSwatchCancelBtn.textContent = "Cancel"
							editSwatchCancelBtn.classList.add("edit-swatch-button")
							editSwatchDiv.appendChild(editSwatchCancelBtn);

							editSwatchSubmitBtn.addEventListener("click", function () {
								color.hexValue = editSwatchInput.value;
								displayColors();
							})
						editSwatchCancelBtn.addEventListener("click", function () {
							editSwatchInput.value = "";
							editSwatchDiv.removeChild(editSwatchInput);
							editSwatchDiv.removeChild(editSwatchSubmitBtn);
							editSwatchDiv.removeChild(editSwatchCancelBtn);
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
							const newListCancelBtn = document.createElement("button")
							newListCancelBtn.textContent = "Cancel"
							newListCancelBtn.classList.add("new-list-button")
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


