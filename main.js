// global variables and initilizations
// this line will retrieve the saved array from local storage
// localStorage.clear()

const cssColors = { "#f0f8ff": "aliceblue", "#faebd7": "antiquewhite", "#00ffff": "aqua", "#7fffd4": "aquamarine", "#f0ffff": "azure", "#f5f5dc": "beige", "#ffe4c4": "bisque", "#000000": "black", "#ffebcd": "blanchedalmond", "#0000ff": "blue", "#8a2be2": "blueviolet", "#a52a2a": "brown", "#deb887": "burlywood", "#5f9ea0": "cadetblue", "#7fff00": "chartreuse", "#d2691e": "chocolate", "#ff7f50": "coral", "#6495ed": "cornflowerblue", "#fff8dc": "cornsilk", "#dc143c": "crimson", "#00008b": "darkblue", "#008b8b": "darkcyan", "#b8860b": "darkgoldenrod", "#a9a9a9": "darkgray", "#006400": "darkgreen", "#bdb76b": "darkkhaki", "#8b008b": "darkmagenta", "#556b2f": "darkolivegreen", "#ff8c00": "darkorange", "#9932cc": "darkorchid", "#8b0000": "darkred", "#e9967a": "darksalmon", "#8fbc8f": "darkseagreen", "#483d8b": "darkslateblue", "#2f4f4f": "darkslategray", "#00ced1": "darkturquoise", "#9400d3": "darkviolet", "#ff1493": "deeppink", "#00bfff": "deepskyblue", "#696969": "dimgray", "#1e90ff": "dodgerblue", "#b22222": "firebrick", "#fffaf0": "floralwhite", "#228b22": "forestgreen", "#ff00ff": "fuchsia", "#dcdcdc": "gainsboro", "#f8f8ff": "ghostwhite", "#ffd700": "gold", "#daa520": "goldenrod", "#808080": "gray", "#008000": "green", "#adff2f": "greenyellow", "#f0fff0": "honeydew", "#ff69b4": "hotpink", "#cd5c5c": "indianred", "#4b0082": "indigo", "#fffff0": "ivory", "#f0e68c": "khaki", "#e6e6fa": "lavender", "#fff0f5": "lavenderblush", "#7cfc00": "lawngreen", "#fffacd": "lemonchiffon", "#add8e6": "lightblue", "#f08080": "lightcoral", "#e0ffff": "lightcyan", "#fafad2": "lightgoldenrodyellow", "#d3d3d3": "lightgray", "#90ee90": "lightgreen", "#ffb6c1": "lightpink", "#ffa07a": "lightsalmon", "#20b2aa": "lightseagreen", "#87cefa": "lightskyblue", "#778899": "lightslategray", "#b0c4de": "lightsteelblue", "#ffffe0": "lightyellow", "#00ff00": "lime", "#32cd32": "limegreen", "#faf0e6": "linen", "#ff00ff": "magenta", "#800000": "maroon", "#66cdaa": "mediumaquamarine", "#0000cd": "mediumblue", "#ba55d3": "mediumorchid", "#9370db": "mediumpurple", "#3cb371": "mediumseagreen", "#7b68ee": "mediumslateblue", "#00fa9a": "mediumspringgreen", "#48d1cc": "mediumturquoise", "#c71585": "mediumvioletred", "#191970": "midnightblue", "#f5fffa": "mintcream", "#ffe4e1": "mistyrose", "#ffe4b5": "moccasin", "#ffdead": "navajowhite", "#000080": "navy", "#fdf5e6": "oldlace", "#808000": "olive", "#6b8e23": "olivedrab", "#ffa500": "orange", "#ff4500": "orangered", "#da70d6": "orchid", "#eee8aa": "palegoldenrod", "#98fb98": "palegreen", "#afeeee": "paleturquoise", "#db7093": "palevioletred", "#ffefd5": "papayawhip", "#ffdab9": "peachpuff", "#cd853f": "peru", "#ffc0cb": "pink", "#dda0dd": "plum", "#b0e0e6": "powderblue", "#800080": "purple", "#663399": "rebeccapurple", "#ff0000": "red", "#bc8f8f": "rosybrown", "#4169e1": "royalblue", "#8b4513": "saddlebrown", "#fa8072": "salmon", "#f4a460": "sandybrown", "#2e8b57": "seagreen", "#fff5ee": "seashell", "#a0522d": "sienna", "#c0c0c0": "silver", "#87ceeb": "skyblue", "#6a5acd": "slateblue", "#708090": "slategray", "#fffafa": "snow", "#00ff7f": "springgreen", "#4682b4": "steelblue", "#d2b48c": "tan", "#008080": "teal", "#d8bfd8": "thistle", "#ff6347": "tomato", "#40e0d0": "turquoise", "#ee82ee": "violet", "#f5deb3": "wheat", "#ffffff": "white", "#f5f5f5": "whitesmoke", "#ffff00": "yellow", "#9acd32": "yellowgreen" };
const megaArray = [...Object.values(cssColors), ...Object.keys(cssColors)];
let colorsILike;
let listBackgroundColors;
let defaultList;
let input;
let addYourOwnColor;
let addBaseColor;


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


if (localStorage.getItem("defaultList") !== null) {
	defaultList = JSON.parse(localStorage.getItem("defaultList"));
} else {
	defaultList = "My Colors";
}

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


const genericColors = {
	"red": "#ff0000",
	"orange": "#ff7f00",
	"yellow": "#ffff00",
	"green": "#7fff00",
	"lime": "#00ff00",
	"springgreen": "#00ff7f",
	"cyan": "#00ffff",
	"blue": "#007fff",
	"midnightblue": "#0000ff",
	"blueviolet": "#7f00ff",
	"indigo": "#4b0082",
	"purple": "#800080",
	"violet": "#ee82ee",
	"fuchsia": "#ff00ff",
	"hotpink": "#ff69b4",
	"deeppink": "#ff007f",
	"pink": "#ffc0cb",
}

let addYourOwnColorEditListMenu = document.querySelector("#add-your-own-color-edit-list-menu")
let pickYourOwnColorDiv = document.querySelector("#add-your-own-color")
let pickBaseColorInputToolsDiv = document.querySelector("#pick-base-color-input-tools")
let baseColorPickerDropDownMenuDiv = document.querySelector("#base-color-picker")

let mainDisplay = document.querySelector("#colors-display");
let swatchBox = document.querySelector(".swatch-box");

let listEditToolsDiv = document.querySelector("#list-edit-tools");

let pageBackgroundColor = localStorage.getItem("pageBackgroundColor") || "";

const addYourOwnColorInputTools = inputToolMaker("", getRandomItem(megaArray), `Add to ${defaultList}`, "static-add-color", function (inputColor) {

	addColor(defaultList, inputColor)
})
input = addYourOwnColorInputTools.querySelector(".static-add-color-input");
addYourOwnColor = addYourOwnColorInputTools.querySelector(".static-add-color-button");
pickYourOwnColorDiv.appendChild(addYourOwnColorInputTools);

const staticEditDropDownMenuItem = [
	"--Colors I Like Options--",
	"Create New List",
	"Change Page Background Color",
	"Revert To Default",
	"Export Page to CSS (WIP)",
	"--Delete Options--",
	"Revert All to Default",
	"Delete All Lists",
	"Delete All Colors",
	"Delete All Colors And Lists",
	"--Just For Fun--",
	"Randomize All Colors (WIP)",
	"Random Theme (WIP)",

];

const staticEditDropDownMenu = customDropDownMenuMaker(staticEditDropDownMenuItem, function (item) {
	let action = item;
	listEditToolsDiv.textContent = ""

	switch (action) {

		case "Revert All to Default":

			const userConfirmedRevertAllToDefault = confirm("Are you sure you want to revert to default settings? This action cannot be undone.");
			if (!userConfirmedRevertAllToDefault) {
				return;
			}

			Object.keys(colorsILike).forEach(listName => {
				colorsILike[listName].forEach(color => {
					delete color.cardBackgroundColor;
				})
			})

			listBackgroundColors = {};
			localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))

			pageBackgroundColor = "";
			localStorage.setItem("pageBackgroundColor", pageBackgroundColor)

			renderAndSync();

			break;

		case "Export Page to CSS":

			break;

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
		case "Change Page Background Color":

			const changePageBackgroundColorInputTools = inputToolMaker("", getRandomItem(megaArray), "Confirm", "change-page-background-color", function (inputColor) {
				const validatedInput = validateInput("color", inputColor);
				if (validatedInput === null) {
					return;
				}
				pageBackgroundColor = validatedInput.hexValue;
				localStorage.setItem("pageBackgroundColor", pageBackgroundColor);
				renderAndSync();
			})

			listEditToolsDiv.appendChild(changePageBackgroundColorInputTools);

			break;
		case "Revert To Default":

			pageBackgroundColor = "";
			localStorage.setItem("pageBackgroundColor", pageBackgroundColor)
			renderAndSync();

			break;
		case "Delete All Lists":

			const userConfirmedDeleteAllLists = confirm("Are you sure you want to delete all lists? This action cannot be undone.");

			if (userConfirmedDeleteAllLists) {
				colorsILike = {};
				localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
				renderAndSync();
			} else {
				return;
			}

			break;
		case "Delete All Colors":

			const userConfirmedDeleteAllColors = confirm("Are you sure you want to delete all colors? This action cannot be undone.");
			if (userConfirmedDeleteAllColors === null) {
				return;
			}
			if (userConfirmedDeleteAllColors === true) {
				Object.keys(colorsILike).forEach(listName => {
					colorsILike[listName] = [];
				});
				localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
				renderAndSync();
			} else {
				return;
			}

			break;
		case "Delete All Colors And Lists":

			const userInputForDeleteAllColorsAndLists = prompt("Are you sure you want to delete all colors and lists? This action cannot be undone. Type 'yes' to confirm.");
			if (userInputForDeleteAllColorsAndLists === null) {
				return;
			}
			if (userInputForDeleteAllColorsAndLists.trim().toLowerCase() === "yes") {
				colorsILike = {};
				listBackgroundColors = {};
				localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
				localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
				renderAndSync();
			} else {
				return;
			}

			break;

		default:

			break;

	}

}, "static-edit")

addYourOwnColorEditListMenu.appendChild(staticEditDropDownMenu)

const baseColorPickerInputTools = inputToolMaker("", getRandomItem(megaArray), `Add to ${defaultList}`, "static-base-color-picker", function (inputColor) {

	addColor(defaultList, inputColor);

})


pickBaseColorInputToolsDiv.appendChild(baseColorPickerInputTools)
addBaseColor = baseColorPickerInputTools.querySelector(".static-base-color-picker-button")


const baseColorPickerDropDownMenuOptions = [
	"--Pick A Color--",
	...Object.keys(genericColors),
]

const baseColorPickerDropDownMenu = customDropDownMenuMaker(baseColorPickerDropDownMenuOptions, function (baseColor) {

	const pickerInput = baseColorPickerInputTools.querySelector(".static-base-color-picker-input")
	pickerInput.readOnly = true;
	if (baseColor === "--Pick A Color--") {
		return;
	}
	pickerInput.value = genericColors[baseColor];
	pickerInput.focus();

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
				}, 5000);
				return null;
			}


			const dummyElement = document.createElement("div")
			document.body.appendChild(dummyElement);
			dummyElement.style.color = text;

			if (!dummyElement.style.color) {

				text = "#" + text;
				dummyElement.style.color = text

				if (!dummyElement.style.color) {
					errorsDisplay.textContent = "The color input is not a valid color";
					setTimeout(() => {
						errorsDisplay.textContent = ""
					}, 5000);
					document.body.removeChild(dummyElement); 
					return null;
				}

			}

			const rgbaString = window.getComputedStyle(dummyElement).color;
			const rgbaCode = rgbaString;
			document.body.removeChild(dummyElement);

			const rgbaArray = rgbaCode.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
			let r = Number(rgbaArray[1]);
			let g = Number(rgbaArray[2]);
			let b = Number(rgbaArray[3]);
			let a = Number(rgbaArray[4] !== undefined ? Number(rgbaArray[4]) : 1);

			const rHexString = r.toString(16).padStart(2, "0");
			const gHexString = g.toString(16).padStart(2, "0");
			const bHexString = b.toString(16).padStart(2, "0");
			const aHexString = Math.round(a * 255).toString(16).padStart(2, "0");

			let hexCode;

			if (a === 1) {
				hexCode = `#${rHexString}${gHexString}${bHexString}`;
			} else {
				hexCode = `#${rHexString}${gHexString}${bHexString}${aHexString}`;
			}

			if (list !== undefined && colorsILike[list] !== undefined && colorsILike[list].some((item) => item.hexValue === hexCode)) {
				errorsDisplay.textContent = "This color is already in this list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 5000);
				return null;
			}

			const hslDecimals = [r, g, b].map((rgbValue) => rgbValue / 255);

			const hslDecimalsMax = Math.max(...hslDecimals);
			const hslDecimalsMin = Math.min(...hslDecimals);
			let saturation;
			let lightness = (hslDecimalsMax + hslDecimalsMin) / 2;
			let hue;
			let delta = hslDecimalsMax - hslDecimalsMin;

			if (hslDecimalsMax === hslDecimalsMin) {
				saturation = 0;
			} else if (lightness < 0.5) {
				saturation = delta / (hslDecimalsMax + hslDecimalsMin);
			} else {
				saturation = delta / (2 - hslDecimalsMax - hslDecimalsMin);
			}
			const [R, G, B, A] = hslDecimals;

			if (delta > 0) {

				switch (hslDecimalsMax) {
					case R:
						hue = (G - B) / delta % 6;
						break;
					case G:
						hue = (B - R) / delta + 2;
						break;
					case B:
						hue = (R - G) / delta + 4;
						break;
				}
			} else if (delta === 0) {
				hue = 0;
			}
			let hslCode;
			hue = hue / 6;
			hue = Math.round(hue * 360);
			saturation = Math.round(saturation * 100);
			lightness = Math.round(lightness * 100);	

			if (a === 1) {
				hslCode = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
			} else if (a < 1) {
				hslCode = `hsla(${hue}, ${saturation}%, ${lightness}%, ${a})`;
			}

			let cssCode = cssColors[hexCode] || "";

			return { hexValue: hexCode, hslValue: hslCode, rgbaValue: rgbaCode, cssKeyword: cssCode }

			break;

		case "list":
			text = rawInput.trim();

			if (text === "") {
				errorsDisplay.textContent = "Please enter a name for the list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 5000);
				return null;
			}

			if (text !== list && colorsILike[text] !== undefined) {
				errorsDisplay.textContent = "You already have this list";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 5000);
				return null;
			}

			if (text.length > 50) {
				errorsDisplay.textContent = "The list name is too long";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 5000);
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
				}, 5000);
				return null;
			}

			if (text.length > 20) {
				errorsDisplay.textContent = "The color name is too long";
				setTimeout(() => {
					errorsDisplay.textContent = ""
				}, 5000);
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


	const colorsObject = validateInput("color", selectedColor, selectedList);

	if (colorsObject === null) {
		return;
	}

	if (colorsILike[selectedList] === undefined) {
		colorsILike[selectedList] = [];
	}

	colorsILike[selectedList].push({
		hexValue: colorsObject.hexValue,
		hslValue: colorsObject.hslValue,
		rgbaValue: colorsObject.rgbaValue,
		cssKeyword: colorsObject.cssKeyword,
		cardBackgroundColor: undefined,
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
		"Change List Background Color",
		"Revert to Default",
		"Export List to CSS (WIP)",
		"Delete List"
	];


	const listHeaderDropDownMenu = customDropDownMenuMaker(listHeaderMenuItem, function (item) {
		let action = item;

		listEditDiv.textContent = ""

		switch (action) {
			case "Export List to CSS":

				break;

			case "Revert to Default":

				delete listBackgroundColors[listName];
				localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors));
				renderAndSync();

				break;


			case "Delete List":

				const userConfirmedDeleteList = confirm(`Are you sure you want to delete the list ${listName}?`);

				if (!userConfirmedDeleteList) {
					return;
				}

				if (listName === defaultList) {
					defaultList = "My Colors";
					localStorage.setItem("defaultList", JSON.stringify(defaultList));
					addYourOwnColor.textContent = "Add to My Colors";
					addBaseColor.textContent = "Add to My Colors";
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
						if (listName === defaultList) {
							defaultList = newName;
							localStorage.setItem("defaultList", JSON.stringify(defaultList));
							addYourOwnColor.textContent = `Add to ${newName}`;
							addBaseColor.textContent = `Add to ${newName}`;
						}

					}

					renderAndSync()

				})

				listEditDiv.appendChild(editListNameInputTools);

				break;

			case "Add Color to List":

				const addColorToListInputTools = inputToolMaker("", getRandomItem(megaArray), "Confirm", "list-add-color", function (inputColor) {

					addColor(listName, inputColor);

				})

				listEditDiv.appendChild(addColorToListInputTools);

				break;

			case "Move List":

				const keys = Object.keys(colorsILike);

				const moveListToolsDiv = document.createElement("div");
				moveListToolsDiv.classList.add("move-list-tools-div");

				const moveUpButton = document.createElement("button");
				moveUpButton.textContent = "▲ Move Up";
				moveUpButton.classList.add("move-up-button");

				const moveDownButton = document.createElement("button");
				moveDownButton.textContent = "Move Down ▼";
				moveDownButton.classList.add("move-down-button");

				moveUpButton.addEventListener("click", () => {
					let listIndex = keys.indexOf(listName);
					let holdList = listName;
					if (listIndex === 0) {
						moveUpButton.disabled = true;
						return;
					}

					keys[listIndex] = keys[listIndex - 1];
					keys[listIndex - 1] = holdList;
					const tempObj = {}
					keys.forEach(key => {
						tempObj[key] = colorsILike[key];
					})
					colorsILike = tempObj;
					renderAndSync();
				});

				moveDownButton.addEventListener("click", () => {
					let listIndex = keys.indexOf(listName);
					let holdList = listName;
					if (listIndex === keys.length - 1) {
						moveDownButton.disabled = true;
						return;
					}
					keys[listIndex] = keys[listIndex + 1];
					keys[listIndex + 1] = holdList;
					const tempObj = {}
					keys.forEach(key => {
						tempObj[key] = colorsILike[key];
					})
					colorsILike = tempObj;
					renderAndSync();
				});
				moveListToolsDiv.appendChild(moveUpButton);
				moveListToolsDiv.appendChild(moveDownButton);
				listEditDiv.appendChild(moveListToolsDiv);
				break;

			case "Change List Background Color":


				const changeListBackgroundInputTools = inputToolMaker(listBackgroundColors[listName] || "", getRandomItem(megaArray), "Confirm", "change-list-background", function (inputColor) {
					const validatedInput = validateInput("color", inputColor)
					if (validatedInput === null) {
						return;
					}
					listBackgroundColors[listName] = validatedInput.hexValue;
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
	swatchContainer.classList.add("swatch-card");

	const cardHeaderContainer = document.createElement("div")
	cardHeaderContainer.classList.add("swatch-card-header-wrapper");

	const cardBodyContainer = document.createElement("div")
	cardBodyContainer.classList.add("swatch-card-body-wrapper");

	const cardEditContainer = document.createElement("div")
	cardEditContainer.classList.add("swatch-card-edit-wrapper")
	const swatchColor = document.createElement("div");

	if (color.cardBackgroundColor !== undefined) {
		swatchColor.style.borderColor = color.cardBackgroundColor;
	}

	swatchColor.classList.add("swatch-color");
	cardBodyContainer.appendChild(swatchColor);


	const hexValue = document.createElement("h5");
	hexValue.classList.add("swatch-hex-value")
	swatchColor.style.backgroundColor = color.hexValue
	hexValue.textContent = color.hexValue;
	cardHeaderContainer.appendChild(hexValue);

	const rgbaValue = document.createElement("h5");
	rgbaValue.classList.add("swatch-rgba-value")
	rgbaValue.textContent = color.rgbaValue;
	cardHeaderContainer.appendChild(rgbaValue);

	const hslValue = document.createElement("h5");
	hslValue.classList.add("swatch-hsl-value")
	hslValue.textContent = color.hslValue;
	cardHeaderContainer.appendChild(hslValue);

	const cssKeyword = document.createElement("h5");
	cssKeyword.classList.add("swatch-css-keyword")
	cssKeyword.textContent = color.cssKeyword || "\u00A0";
	cardHeaderContainer.appendChild(cssKeyword);


	const customName = document.createElement("h6");
	customName.classList.add("swatch-new-name");
	customName.textContent = "\u00A0"
	cardHeaderContainer.appendChild(customName);


	if (color.customName !== "") {
		customName.textContent = color.customName;
	}
	cardBodyContainer.appendChild(swatchColor);

	const swatchMenuItem = [
		"--Edit Color--",
		"Add Color Name",
		"Change Color",
		"Move Color",
		"Change Card Background Color",
		"Revert to Default",
		"Suggested Color Palettes (WIP)",
		"Contrast Checker (WIP)",
		"Copy to List",
		"Move to New List",
		"Move to Existing List",
		"Delete Color"
	];

	const editSwatchDropDownMenu = customDropDownMenuMaker(swatchMenuItem, function (item) {
		let action = item;
		cardEditContainer.textContent = ""


		switch (action) {
			case "Contrast Checker":

				break;

			case "Suggested Color Palettes":

				break;

			case "Revert to Default":
				delete color.cardBackgroundColor;
				renderAndSync();

				break;

			case "Delete Color":

				const userConfirmedDeleteColor = confirm(`Are you sure you want to delete the color ${color.customName || color.hexValue} from the list ${listName}?`);


				if (!userConfirmedDeleteColor) {
					return;
				}
				colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
				renderAndSync();

				break;

			case "Add Color Name":

				const customNameTools = inputToolMaker(color.customName, getRandomItem(Object.values(cssColors)), "Confirm", "add-color-name", function (inputName) {
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


				const moveColorToolsDiv = document.createElement("div");
				moveColorToolsDiv.classList.add("move-color-tools-div");

				const moveLeftButton = document.createElement("button");
				moveLeftButton.textContent = "◀ Move Left";
				moveLeftButton.classList.add("move-left-button");

				const moveRightButton = document.createElement("button");
				moveRightButton.textContent = "Move Right ▶";
				moveRightButton.classList.add("move-right-button");

				let colorIndex = colorsILike[listName].indexOf(color);

				moveLeftButton.addEventListener("click", function () {
					const swatchList = colorsILike[listName];

					if (colorIndex === 0) {
						moveLeftButton.disabled = true;
						return;
					}

					let holdColor = swatchList[colorIndex];

					swatchList[colorIndex] = swatchList[colorIndex - 1];
					swatchList[colorIndex - 1] = holdColor;
					renderAndSync();
				})

				moveRightButton.addEventListener("click", function () {
					const swatchList = colorsILike[listName];

					if (colorIndex === swatchList.length - 1) {
						moveRightButton.disabled = true;
						return;
					}

					let holdColor = swatchList[colorIndex];

					swatchList[colorIndex] = swatchList[colorIndex + 1];
					swatchList[colorIndex + 1] = holdColor;
					renderAndSync();
				})

				moveColorToolsDiv.appendChild(moveLeftButton);
				moveColorToolsDiv.appendChild(moveRightButton);
				cardEditContainer.appendChild(moveColorToolsDiv);

				break;

			case "Change Color":

				const editSwatchTools = inputToolMaker(color.hexValue, getRandomItem(megaArray), "Confirm", "edit-swatch", function (inputColor) {
					const validatedInput = validateInput("color", inputColor, listName);
					if (validatedInput === null) {
						return;
					}
					color.hexValue = validatedInput.hexValue;
					color.hslValue = validatedInput.hslValue;
					color.rgbaValue = validatedInput.rgbaValue;
					color.cssKeyword = validatedInput.cssKeyword;
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

			case "Change Card Background Color":
				const changeCardBackgroundTool = inputToolMaker(color.cardBackgroundColor || "", getRandomItem(megaArray), "Confirm", "change-card-background", function (inputColor) {
					const validatedInput = validateInput("color", inputColor);
					if (validatedInput === null) {
						return;
					}
					color.cardBackgroundColor = validatedInput.hexValue;
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

function createColorList(listName) {

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
	document.body.style.backgroundColor = pageBackgroundColor;

	listEditToolsDiv.textContent = ""
	mainDisplay.textContent = ""

	Object.keys(colorsILike).forEach(listName => {
		const list = createColorList(listName);
		mainDisplay.appendChild(list);

	});

	localStorage.setItem("colorsILike", JSON.stringify(colorsILike));

}

renderAndSync();

