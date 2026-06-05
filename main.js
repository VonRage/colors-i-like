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

const baseColorPickerDropDownMenuOptions = [
	"--Pick A Color--",
	...genericColors
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
		dropDownOption.classList.add(classPrefix + "-menu-option")
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

let input;
let addToMyColors;


// push input box to array
// transfer and clean string to useable data

let addYourOwnColorEditListMenu = document.querySelector("#add-your-own-color-edit-list-menu")
let pickYourOwnColorDiv = document.querySelector("#add-your-own-color")
let pickBaseColorInputToolsDiv = document.querySelector("#pick-base-color-input-tools")
let baseColorPickerDropDownMenuDiv = document.querySelector("#base-color-picker")

let mainDisplay = document.querySelector("#colors-display");
let swatchBox = document.querySelector(".swatch-box");


const addYourOwnColorInputTools = inputToolMaker("", "#00000000", `Add to ${currentList}`, "static-add-color", function (inputColor) {
	if (inputColor === "") {
		alert("Please add a color")
		return;
	}
	addColor(currentList, inputColor)
})
input = addYourOwnColorInputTools.querySelector(".static-add-color-input");
addToMyColors = addYourOwnColorInputTools.querySelector(".static-add-color-button");
pickYourOwnColorDiv.appendChild(addYourOwnColorInputTools);

const staticEditListMenuItem = [
	"--Colors I Like Options--",
	"Add Color to List",
	"Change Background Color",
	"Revert To Default",
	"--Delete Options--",
	"Delete All Lists",
	"Delete All Colors",
	"Delete All Colors And Lists",
	"--Just For Fun--",
	"Randomize All Colors",
	"Random Theme",

];



const staticEditList = customDropDownMenuMaker(staticEditListMenuItem, function (item) {
	let action = item;

	switch (action) {

		case "Randomize All Colors":

			break;
		case "Random Theme":

			break;

		case "Add Color to List":

			break;
		case "Change Background Color":

			break;
		case "Revert To Default":

			break;
		case "Delete All Lists":

			break;
		case "Delete All Colors":

			break;
		case "Delete All Colors And Lists":

			break;

		default:

			break;

	}


}, "static-edit-list")


addYourOwnColorEditListMenu.appendChild(staticEditList)


const baseColorPickerInputTools = inputToolMaker("", getRandomItem(genericColors), "Confirm", "static-base-color-picker", function (inputColor) {
	if (inputColor === "") {
		alert("Please add a color")
		return;
	}
	addColor(currentList, inputColor);

})
pickBaseColorInputToolsDiv.appendChild(baseColorPickerInputTools)

const baseColorPickerDropDownMenu = customDropDownMenuMaker(baseColorPickerDropDownMenuOptions, function (baseColor) {

	const pickerInput = baseColorPickerInputTools.querySelector(".static-base-color-picker-input")
	pickerInput.readOnly = true;
	pickerInput.value = baseColor;

}, "static-base-color-picker")

baseColorPickerDropDownMenuDiv.appendChild(baseColorPickerDropDownMenu)


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

		const listHeader = document.createElement("h4");
		listHeader.textContent = listName;
		listHeader.classList.add("list-header");
		listHeaderContainer.appendChild(listHeader)
		listDiv.appendChild(listHeaderContainer);

		const listEditDiv = document.createElement("div")
		listEditDiv.classList.add("edit-list-container")
		listHeaderContainer.appendChild(listEditDiv);

		const listHeaderMenuItem = [
			"--Edit List--",
			"Create New List",
			"Rename List",
			"Add Color to List",
			"Move List",
			"Change List Background",
			"Revert to Default",
			"Delete List"
		];


		const listHeaderDropDownMenu = customDropDownMenuMaker(listHeaderMenuItem, function (item) {
			if (appendContainer.children.length > 0 && action !== "Delete List") {
				return;
			}
			switch (action) {

				case "Revert to Default":

					break;



				case "Create New List":

					const createNewListTools = inputToolMaker("", getRandomItem(genericListNames), "Confirm", "create-new-list", function (newListName) {

						if (newListName === "") {
							alert("Please add a name for the list");
							return;
						}
						colorsILike[newListName] = [];
						localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
						localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
						displayColors();

					})

					appendContainer.appendChild(createNewListTools);

					break;

				case "Delete List":

					if (listName === currentList) {
						currentList = "My Colors";
						addToMyColors.textContent = "Add to My Colors";
					}

					delete colorsILike[listName];
					delete listBackgroundColors[listName];
					localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
					localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
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
							if (listName === currentList) {
								currentList = newName;
								addToMyColors.textContent = `Add to ${newName}`;
							}

						}

						displayColors()

					})

					appendContainer.appendChild(editListNameInputTools);

					break;

				case "Add Color to List":

					const addColorToListInputTools = inputToolMaker("", getRandomItem(genericColors), "Confirm", "list-add-color", function (inputColor) {
						if (inputColor === "") {
							alert("Please add a color")
							return;
						}
						addColor(listName, inputColor);

					})

					appendContainer.appendChild(addColorToListInputTools);

					break;

				case "Move List":

					break;

				case "Change List Background":


					const changeListBackgroundInputTools = inputToolMaker(listBackgroundColors[listName], getRandomItem(genericColors), "Confirm", "change-list-background", function (inputColor) {
						if (inputColor === "") {
							alert("Please add a color")
							return;
						}

						listBackgroundColors[listName] = inputColor
						localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
						displayColors()

					})

					appendContainer.appendChild(changeListBackgroundInputTools);

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

			const swatchHeader = document.createElement("h5");
			swatchHeader.classList.add("swatch-header")
			swatchColor.style.backgroundColor = color.hexValue
			swatchHeader.textContent = color.hexValue;
			swatchContainer.appendChild(swatchHeader);

			const colorName = document.createElement("h6");
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
				"Move Color",
				"Copy to List",
				"Change Background",
				"Revert to Default",
				"Move to New List",
				"Move to Existing List",
				"Delete Color"
			];

			const editSwatchDropDownMenu = customDropDownMenuMaker(swatchMenuItem, function (item) {
				let action = item;

					if (swatchContainer.querySelector(
						`.swatch-add-name-container,
						.edit-swatch-container,
						.new-list-container,
						.list-move-menu`
					) && action !== "Delete Color") {
						return;
					}

				switch (action) {

					case "Revert to Default":

						break;

					case "Delete Color":
						colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
						displayColors();

						break;

					case "Add Color Name":

						const customNameTools = inputToolMaker(color.customName, getRandomItem(genericColorNames), "Confirm", "add-color-name", function (inputName) {
							if (inputName === "") {
								alert("Please add a name for the color");
								return;
							}
							color.customName = inputName;
							displayColors();

						});
						swatchContainer.appendChild(customNameTools);

						break;

					case "Move Color":

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

					case "Move to New List":

						const moveToNewListTools = inputToolMaker("", getRandomItem(genericListNames), "Confirm", "move-to-new-list", function (newListName) {
							if (newListName === "") {
								alert("Please add a name for the list");
								return;
							}
							colorsILike[newListName] = [];
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							colorsILike[newListName].push(structuredClone(color));
							displayColors();

						});
						swatchContainer.appendChild(moveToNewListTools);

						break;

					case "Move to Existing List":

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
						const changeCardBackgroundTool = inputToolMaker(color.cardBackgroundColor, getRandomItem(genericColors), "Confirm", "change-card-background", function (inputColor) {
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
	else if (color.length !== 7 && color.length !== 4 && color.length !== 9) {
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




