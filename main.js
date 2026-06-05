// global variables and initilizations
// this line will retrieve the saved array from local storage
// localStorage.clear()
let colorsILike;
let listBackgroundColors;
if (localStorage.getItem("colorsILike") !== null) {
	colorsILike = JSON.parse(localStorage.getItem("colorsILike"));
} else {
	colorsILike = {};
}
if (localStorage.getItem("listBackgroundColors") !== null) {
	listBackgroundColors = JSON.parse(localStorage.getItem("listBackgroundColors"));
} else {
	listBackgroundColors = {};
}

let currentList = "My Colors";
const genericListNames = [
	"Bathroom",
	"Kitchen",
	"Bedroom",
	"Living Room",
	"Dining Room",
	"Office",
	"Exterior",
	"Garage",
	"Laundry Room",
	"Nursery",
	"Patio",
	"webDesign"
];

const genericColorNames = [
	"Red",
	"Orange",
	"Yellow",
	"Green",
	"Blue",
	"Purple",
	"Pink",
	"Cyan",
	"Magenta",
	"Black",
	"White",
	"Gray",
]

const genericColors = [
	"#ff0000",
	"#ff7f00",
	"#ffff00",
	"#7fff00",
	"#00ff00",
	"#00ff7f",
	"#00ffff",
	"#007fff",
	"#0000ff",
	"#7f00ff",
	"#ff00ff",
	"#ff007f",
]

function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function customDropDownMenuMaker(arr, callbackFunction, classPrefix) {
	const dropDownMenu = document.createElement("div")
	dropDownMenu.classList.add(classPrefix + "-menu")
	const dropDownMenuPlaceholder = document.createElement("div")
	dropDownMenuPlaceholder.textContent = arr[0];
	dropDownMenuPlaceholder.classList.add(classPrefix + "-menu-placeholder")
	dropDownMenu.appendChild(dropDownMenuPlaceholder)

	dropDownMenuPlaceholder.addEventListener("click", function () {
		dropDownMenu.classList.toggle("open")
	})


	arr.slice(1).forEach(item => {
		const dropDownOption = document.createElement("div")
		dropDownOption.classList.add(classPrefix + "-option")
		dropDownOption.textContent = item
		dropDownMenu.appendChild(dropDownOption)

		dropDownOption.addEventListener("click", function () {
			callbackFunction(item)
		})
	})

	return dropDownMenu;
}


function inputToolMaker(initialValue, placeholderText, buttonText, classPrefix, callbackFunction,) {
	const inputToolContainer = document.createElement("div");
	inputToolContainer.classList.add(classPrefix + "-container");
	const inputToolInput = document.createElement("input");
	inputToolInput.classList.add(classPrefix + "-input");
	inputToolInput.placeholder = placeholderText;
	inputToolInput.value = initialValue;
	const inputToolButton = document.createElement("button");
	inputToolButton.classList.add(classPrefix + "-button");
	inputToolButton.textContent = buttonText;
	inputToolContainer.appendChild(inputToolInput);
	inputToolContainer.appendChild(inputToolButton);
	inputToolButton.addEventListener("click", function () {
		callbackFunction(inputToolInput.value)
	})
	return inputToolContainer;
}



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

		if (listBackgroundColors[listName] !== undefined) {
			listDiv.style.backgroundColor = listBackgroundColors[listName];

		}

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

		const listHeaderMenuItem = [
			"--Edit List--",
			"Rename List",
			"Add Color to List",
			"Move List",
			"Change List Background",
			"Delete List"
		];
		const listHeaderDropDownMenu = customDropDownMenuMaker(listHeaderMenuItem, function (item) {
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

					const editListNameInputTools = inputToolMaker(listName, getRandomItem(genericListNames), "Confirm", "list-rename", function (newName) {
						if (newName === "") {
								alert("Please add a name for the list")
								return;
						} else if (newName !== listName) {
							// this line is replacing the key value 
							colorsILike[newName] = colorsILike[listName];
							delete colorsILike[listName];

							listBackgroundColors[newName] = listBackgroundColors[listName];
							delete listBackgroundColors[listName];
							localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
							localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
							currentList = newName;
						}

						displayColors()

					})

					listEditDiv.appendChild(editListNameInputTools);

					break;

				case "Add Color to List":

					const addColorToListInputTools = inputToolMaker(getRandomItem(genericColors), "Enter Color", "Confirm", "list-add-color", function (inputColor) {
						if (inputColor === "") {
							alert("Please add a color")
							return;
						}
						addColor(listName, inputColor);

					})

					listEditDiv.appendChild(addColorToListInputTools);

					break;

				case "Move List":

					break;

				case "Change List Background":


					const changeListBackgroundInputTools = inputToolMaker(listBackgroundColors[listName] || getRandomItem(genericColors), getRandomItem(genericColors), "Confirm", "change-list-background", function (inputColor) {
						if (inputColor === "") {
							alert("Please add a color")
							return;
						}

						listBackgroundColors[listName] = inputColor
						localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
						displayColors()

					})

					listEditDiv.appendChild(changeListBackgroundInputTools);

					break;

				default:

					break;

				}
		}, "edit-list")

		listHeaderContainer.appendChild(listHeaderDropDownMenu);

		const swatchContainerWrapper = document.createElement("div")
		swatchContainerWrapper.classList.add("swatch-container-wrapper")	


		colorsILike[listName].forEach(color => {
			const swatchContainer = document.createElement("div");
			swatchContainer.classList.add("swatch-container");

			if (color.cardBackgroundColor !== undefined) {
				swatchContainer.style.backgroundColor = color.cardBackgroundColor;
			}

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



			const swatchMenuItem = [
				"--Edit Swatch--",
				"Add Color Name",
				"Change Color",
				"Move Swatch",
				"Copy to List",
				"Change Background",
				"Make New List",
				"Move to List",
				"Delete Swatch"
			];

			const editSwatchDropDownMenu = customDropDownMenuMaker(swatchMenuItem, function (item) {
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

						const customNameTools = inputToolMaker(color.customName || getRandomItem(genericColorNames), getRandomItem(genericColorNames), "Confirm", "add-color-name", function (inputName) {
							if (inputName === "") {
								alert("Please add a name for the color");
								return;
							}
							color.customName = inputName;
							displayColors();

						});
						swatchContainer.appendChild(customNameTools);

						break;

						case "Move Swatch":

						break;

					case "Change Color":

						const editSwatchTools = inputToolMaker(color.hexValue, getRandomItem(genericColors), "Confirm", "edit-swatch", function (inputColor) {
							if (inputColor === "") {
								alert("Please add a color");
								return;
							}
							color.hexValue = inputColor;
							displayColors();
						});


						swatchContainer.appendChild(editSwatchTools);
						break;

					case "Make New List":

						const newListTools = inputToolMaker(getRandomItem(genericListNames), getRandomItem(genericListNames), "Confirm", "new-list", function (newListName) {
							if (newListName === "") {
								alert("Please add a name for the list");
								return;
							}
							colorsILike[newListName] = [];
							currentList = newListName;
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							colorsILike[currentList].push(structuredClone(color));
							displayColors();

						});
						swatchContainer.appendChild(newListTools);

						break;

					case "Move to List":

						const listMoveMenuItem = [
							"--Pick One--",
							...Object.keys(colorsILike)
						]
						const listMoveDropDownMenu = customDropDownMenuMaker(listMoveMenuItem, function (item) {

							const newList = item;
							colorsILike[newList].push(structuredClone(color));
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							displayColors();

						}, "list-move")

							swatchContainer.appendChild(listMoveDropDownMenu);

						break;

					case "Change Background":
						const changeCardBackgroundTool = inputToolMaker(color.cardBackgroundColor || getRandomItem(genericColors), "Enter a Color", "Confirm", "change-card-background", function (inputColor) {
							color.cardBackgroundColor = inputColor;
							displayColors();
						})

						swatchContainer.appendChild(changeCardBackgroundTool);

						break;
					case "Copy to List":

						const copyToListMenuItem = [
							"--Pick One--",
							...Object.keys(colorsILike)
						]
						const copyToListDropDownMenu = customDropDownMenuMaker(copyToListMenuItem, function (item) {

							const newList = item;
							colorsILike[newList].push(structuredClone(color));
							displayColors();

						}, "copy-to-list")

						swatchContainer.appendChild(copyToListDropDownMenu);
							break;

						default:
							break;
					}
			}, "edit-swatch")

			swatchContainer.appendChild(editSwatchDropDownMenu);
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


