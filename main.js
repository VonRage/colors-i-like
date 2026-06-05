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

let listEditToolsDiv = document.querySelector("#list-edit-tools");




const addYourOwnColorInputTools = inputToolMaker("", "#00000000", `Add to ${currentList}`, "static-add-color", function (inputColor) {

	addColor(currentList, inputColor)
})
input = addYourOwnColorInputTools.querySelector(".static-add-color-input");
addToMyColors = addYourOwnColorInputTools.querySelector(".static-add-color-button");
pickYourOwnColorDiv.appendChild(addYourOwnColorInputTools);

const staticEditDropDownMenuItem = [
	"--Colors I Like Options--",
	"Create New List",
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

const staticEditDropDownMenu = customDropDownMenuMaker(staticEditDropDownMenuItem, function (item) {
	let action = item;
	listEditToolsDiv.textContent = ""

	switch (action) {

		case "Randomize All Colors":

			break;
		case "Random Theme":

			break;

		case "Create New List":

			const createNewListTools = inputToolMaker("", getRandomItem(genericListNames), "Confirm", "create-new-list", function (newListName) {

				const validatedInput = validateInput("list", newListName);
				if (validatedInput === null) {
					return;
				}
				colorsILike[validatedInput] = [];
				localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
				localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
				renderAndSync();

			})

			listEditToolsDiv.appendChild(createNewListTools);

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

}, "static-edit")

addYourOwnColorEditListMenu.appendChild(staticEditDropDownMenu)

const baseColorPickerInputTools = inputToolMaker("", getRandomItem(genericColors), `Add to ${currentList}`, "static-base-color-picker", function (inputColor) {

	addColor(currentList, inputColor);

})
pickBaseColorInputToolsDiv.appendChild(baseColorPickerInputTools)
const baseColorPickerDropDownMenuOptions = [
	"--Pick A Color--",
	...genericColors
]
const baseColorPickerDropDownMenu = customDropDownMenuMaker(baseColorPickerDropDownMenuOptions, function (baseColor) {

	const pickerInput = baseColorPickerInputTools.querySelector(".static-base-color-picker-input")
	pickerInput.readOnly = true;
	pickerInput.value = baseColor;

}, "static-base-color-picker")

baseColorPickerDropDownMenuDiv.appendChild(baseColorPickerDropDownMenu)
let errorsDisplay = document.querySelector("#errors-display")

function validateInput(type, rawInput, list) {

	let text;

	switch (type) {
		case "color":
			text = rawInput.trim().toLowerCase();

			if (text === "") {
				errorsDisplay.textContent = "Please enter a color";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if (!text.startsWith("#")) {
				text = "#" + text;

			}
			if (text.length < 4) {
				errorsDisplay.textContent = "The color input is too short";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if ((text.length > 4 && text.length < 7) || (text.length > 7 && text.length < 9)) {
				errorsDisplay.textContent = "The color input must be either shorter or longer";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if (text.length > 9) {
				errorsDisplay.textContent = "The color input is too long";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			const typedColor = text.slice(1);
			for (const char of typedColor) {
				if ((char < 'a' || char > 'f') && (char < '0' || char > '9')) {
					errorsDisplay.textContent = "Hex Color values must include: a-f and 0-9";
					setTimeout(() => {
						errorsDisplay.textContent = ""
					}, 3000);
					return null;
				}
			}


			if (list !== undefined && colorsILike[list] !== undefined && colorsILike[list].some((item) => item.hexValue === text)) {
				errorsDisplay.textContent = "This color is already in this list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			return text;

			break;

		case "list":
			text = rawInput.trim();

			if (text === "") {
				errorsDisplay.textContent = "Please enter a name for the list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if (text !== list && colorsILike[text] !== undefined) {
				errorsDisplay.textContent = "You already have this list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if (text.length > 50) {
				errorsDisplay.textContent = "The list name is too long";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}
			return text;


			break;
		case "name":

			text = rawInput.trim()

			if (text === "") {
				errorsDisplay.textContent = "Please enter a name for the color";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			if (text.length > 20) {
				errorsDisplay.textContent = "The color name is too long";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 3000);
				return null;
			}

			return text;

			break;

		default:

			break;
	}
	return text;
}

function addColor(selectedList, selectedColor) {


	const color = validateInput("color", selectedColor, selectedList);

	if (color === null) {
		return;
	}

	if (colorsILike[selectedList] === undefined) {
		colorsILike[selectedList] = [];
	}




	colorsILike[selectedList].push({
		hexValue: color,
		customName: ""
	});
	input.value = "";
	renderAndSync();

}

function createListHeader(listName) {

	const listHeaderContainer = document.createElement("div")
	listHeaderContainer.classList.add("list-header-container")

	const listHeader = document.createElement("h4");
	listHeader.textContent = listName;
	listHeader.classList.add("list-header");
	listHeaderContainer.appendChild(listHeader)

	const listEditDiv = document.createElement("div")
	listEditDiv.classList.add("edit-list-container")
	listHeaderContainer.appendChild(listEditDiv);

	const listHeaderMenuItem = [
		"--Edit List--",
		"Rename List",
		"Add Color to List",
		"Move List",
		"Change List Background",
		"Revert to Default",
		"Delete List"
	];


	const listHeaderDropDownMenu = customDropDownMenuMaker(listHeaderMenuItem, function (item) {
		let action = item;

		listEditDiv.textContent = ""

		switch (action) {

			case "Revert to Default":

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
				renderAndSync();

				break;

			case "Rename List":

				const editListNameInputTools = inputToolMaker(listName, getRandomItem(genericListNames), "Confirm", "list-rename", function (newName) {

					const validatedInput = validateInput("list", newName, listName);
					if (validatedInput === null) {
						return;
					}
					if (validatedInput !== listName) {
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

					renderAndSync()

				})

				listEditDiv.appendChild(editListNameInputTools);

				break;

			case "Add Color to List":

				const addColorToListInputTools = inputToolMaker("", getRandomItem(genericColors), "Confirm", "list-add-color", function (inputColor) {

					addColor(listName, inputColor);

				})

				listEditDiv.appendChild(addColorToListInputTools);

				break;

			case "Move List":

				break;

			case "Change List Background":


				const changeListBackgroundInputTools = inputToolMaker(listBackgroundColors[listName] || "", getRandomItem(genericColors), "Confirm", "change-list-background", function (inputColor) {
					const validatedInput = validateInput("color", inputColor)
					if (validatedInput === null) {
						return;
					}
					listBackgroundColors[listName] = validatedInput
					localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
					renderAndSync()

				})

				listEditDiv.appendChild(changeListBackgroundInputTools);

				break;

			default:

				break;

		}
	}, "edit-list")

	listHeaderContainer.appendChild(listHeaderDropDownMenu);
	return listHeaderContainer;
}

function createColorCard(color, listName) {


	const swatchContainer = document.createElement("div");
	swatchContainer.classList.add("swatch-container");

	const cardHeaderContainer = document.createElement("div")
	cardHeaderContainer.classList.add("card-header-container");

	const cardBodyContainer = document.createElement("div")
	cardBodyContainer.classList.add("card-body-container");

	const cardEditContainer = document.createElement("div")
	cardEditContainer.classList.add("card-edit-container")

	if (color.cardBackgroundColor !== undefined) {
		cardBodyContainer.style.backgroundColor = color.cardBackgroundColor;
	}

	const swatchColor = document.createElement("div");
	swatchColor.classList.add("swatch-color");
	cardBodyContainer.appendChild(swatchColor);

	const swatchHeader = document.createElement("h5");
	swatchHeader.classList.add("swatch-header")
	swatchColor.style.backgroundColor = color.hexValue
	swatchHeader.textContent = color.hexValue;
	cardHeaderContainer.appendChild(swatchHeader);

	const colorName = document.createElement("h6");
	colorName.classList.add("swatch-new-name");
	colorName.textContent = "\u00A0"
	cardHeaderContainer.appendChild(colorName);


	if (color.customName !== "") {
		colorName.textContent = color.customName;
	}
	cardBodyContainer.appendChild(swatchColor);

	const swatchMenuItem = [
		"--Edit Color--",
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
		cardEditContainer.textContent = ""


		switch (action) {

			case "Revert to Default":

				break;

			case "Delete Color":
				colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
				renderAndSync();

				break;

			case "Add Color Name":

				const customNameTools = inputToolMaker(color.customName, getRandomItem(genericColorNames), "Confirm", "add-color-name", function (inputName) {
					const validatedInput = validateInput("name", inputName);
					if (validatedInput === null) {
						return;
					}
					color.customName = validatedInput;
					renderAndSync();

				});
				cardEditContainer.appendChild(customNameTools);

				break;

			case "Move Color":

				break;

			case "Change Color":

				const editSwatchTools = inputToolMaker(color.hexValue, getRandomItem(genericColors), "Confirm", "edit-swatch", function (inputColor) {
					const validatedInput = validateInput("color", inputColor, listName);
					if (validatedInput === null) {
						return;
					}
					color.hexValue = validatedInput;
					renderAndSync();
				});


				cardEditContainer.appendChild(editSwatchTools);
				break;

			case "Move to New List":

				const moveToNewListTools = inputToolMaker("", getRandomItem(genericListNames), "Confirm", "move-to-new-list", function (newListName) {

					const validatedInput = validateInput("list", newListName);
					if (validatedInput === null) {
						return;
					}
					colorsILike[newListName] = [];
					colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
					colorsILike[newListName].push(structuredClone(color));
					renderAndSync();

				});
				cardEditContainer.appendChild(moveToNewListTools);

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
					renderAndSync();

				}, "move-to-existing-list")

				cardEditContainer.appendChild(listMoveDropDownMenu);

				break;

			case "Change Background":
				const changeCardBackgroundTool = inputToolMaker(color.cardBackgroundColor || "", getRandomItem(genericColors), "Confirm", "change-card-background", function (inputColor) {
					const validatedInput = validateInput("color", inputColor);
					if (validatedInput === null) {
						return;
					}
					color.cardBackgroundColor = validatedInput;
					renderAndSync();
				})

				cardEditContainer.appendChild(changeCardBackgroundTool);

				break;
			case "Copy to List":

				const copyToListMenuItem = [
					"--Pick One--",
					...Object.keys(colorsILike)
				]

				const copyToListDropDownMenu = customDropDownMenuMaker(copyToListMenuItem, function (item) {
					const newList = item;
					colorsILike[newList].push(structuredClone(color));
					renderAndSync();

				}, "copy-to-list")

				cardEditContainer.appendChild(copyToListDropDownMenu);
				break;

			default:
				break;
		}
	}, "edit-swatch")

	cardBodyContainer.appendChild(editSwatchDropDownMenu);

	swatchContainer.appendChild(cardHeaderContainer)
	swatchContainer.appendChild(cardBodyContainer)
	swatchContainer.appendChild(cardEditContainer)

	return swatchContainer;

}

function createLColorLlist(listName) {

	const listDiv = document.createElement("div");
	listDiv.classList.add("list-div");

	if (listBackgroundColors[listName] !== undefined) {
		listDiv.style.backgroundColor = listBackgroundColors[listName];

	}

	const listHeader = createListHeader(listName);
	listDiv.appendChild(listHeader);


	const swatchContainerWrapper = document.createElement("div")
	swatchContainerWrapper.classList.add("swatch-container-wrapper")

	colorsILike[listName].forEach(color => {

		const colorCard = createColorCard(color, listName);
		swatchContainerWrapper.appendChild(colorCard);

	});
	listDiv.appendChild(swatchContainerWrapper);
	return listDiv
}

function renderAndSync() {

	listEditToolsDiv.textContent = ""
	mainDisplay.textContent = ""

	Object.keys(colorsILike).forEach(listName => {
		const list = createLColorLlist(listName);
		mainDisplay.appendChild(list);

	});

	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));

}

renderAndSync();

