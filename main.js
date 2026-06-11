// global variables and initilizations
// this line will retrieve the saved array from local storage
// localStorage.clear()

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


let addYourOwnColorEditListMenu = document.querySelector("#add-your-own-color-edit-list-menu")
let pickYourOwnColorDiv = document.querySelector("#add-your-own-color")
let pickBaseColorInputToolsDiv = document.querySelector("#pick-base-color-input-tools")
let baseColorPickerDropDownMenuDiv = document.querySelector("#base-color-picker")

let mainDisplay = document.querySelector("#colors-display");

let listEditToolsDiv = document.querySelector("#list-edit-tools");

let pageBackgroundColor = localStorage.getItem("pageBackgroundColor") || "";

const addYourOwnColorInputTools = inputToolMaker({
	levelOfNesting: 6,
	buttonText: `Add to ${defaultList}`,
	styleClass: "page ac-input ",
	callbackFunction: function (inputColor) {

		addColor(defaultList, inputColor)
	}
})
input = addYourOwnColorInputTools.querySelector("input");
addYourOwnColor = addYourOwnColorInputTools.querySelector("button");
pickYourOwnColorDiv.appendChild(addYourOwnColorInputTools);



const staticEditDropDownMenu = customDropDownMenuMaker({
	options: staticEditDropDownMenuItem,
	levelOfNesting: 6,
	styleClass: "page ac-menu ",
	callbackFunction: function (item) {

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

				const createNewListTools = inputToolMaker({
					placeholderText: getRandomItem(genericListNames),
					levelOfNesting: 6,
					styleClass: "edit ac-edit ",
					callbackFunction: function (newListName) {

						const validatedInput = validateInput("list", newListName);
						if (validatedInput === null) {
							return;
						}
						colorsILike[validatedInput] = [];
						localStorage.setItem("colorsILike", JSON.stringify(colorsILike))
						localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
						renderAndSync();

					}
				})

				listEditToolsDiv.appendChild(createNewListTools);

				break;
			case "Change Page Background Color":

				const changePageBackgroundColorInputTools = inputToolMaker({
					levelOfNesting: 6,
					styleClass: "edit ac-edit ",
					callbackFunction: function (inputColor) {

						const validatedInput = validateInput("color", inputColor);
						if (validatedInput === null) {
							return;
						}
						pageBackgroundColor = validatedInput.hexValue;
						localStorage.setItem("pageBackgroundColor", pageBackgroundColor);
						renderAndSync();
					}
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

	}
})

addYourOwnColorEditListMenu.appendChild(staticEditDropDownMenu)

const baseColorPickerInputTools = inputToolMaker({
	levelOfNesting: 6,
	styleClass: "page bc-input ",
	buttonText: `Add to ${defaultList}`,
	callbackFunction: function (inputColor) {

		addColor(defaultList, inputColor);

	}
})


pickBaseColorInputToolsDiv.appendChild(baseColorPickerInputTools)
addBaseColor = baseColorPickerInputTools.querySelector("button");
const pickerInput = baseColorPickerInputTools.querySelector("input")
pickerInput.readOnly = true; 

const baseColorPickerDropDownMenu = customDropDownMenuMaker({
	options: baseColorPickerDropDownMenuOptions,
	levelOfNesting: 6,
	styleClass: "page bc-menu ",
	callbackFunction: function (baseColor) {


		if (baseColor === "--Pick A Color--") {
			return;
		}
		pickerInput.value = genericColors[baseColor];
		pickerInput.focus();

	}
})

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
	listHeaderContainer.className = "list header plugin";

	const listHeader = document.createElement("h4");
	listHeader.textContent = listName;
	listHeader.className = "list header asset";
	listHeaderContainer.appendChild(listHeader)

	const listEditDiv = document.createElement("div")
	listEditDiv.className = "list edit division";
	listHeaderContainer.appendChild(listEditDiv);




	const listHeaderDropDownMenu = customDropDownMenuMaker({
		options: listHeaderMenuItem,
		levelOfNesting: 6,
		styleClass: "list menu ",
		callbackFunction: function (item) {

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

					const editListNameInputTools = inputToolMaker({
						placeholderText: getRandomItem(genericListNames),
						levelOfNesting: 5,
						styleClass: "edit list-input ",
						callbackFunction: function (newName) {

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

						}
					})

					listEditDiv.appendChild(editListNameInputTools);

					break;

				case "Add Color to List":

					const addColorToListInputTools = inputToolMaker({
						levelOfNesting: 5,
						styleClass: "edit list-input ",
						callbackFunction: function (inputColor) {

							addColor(listName, inputColor);

						}
					})

					listEditDiv.appendChild(addColorToListInputTools);

					break;

				case "Move List":

					const keys = Object.keys(colorsILike);

					const moveListToolsDiv = document.createElement("div");
					moveListToolsDiv.className = "edit list-move receptacle";

					const moveUpButton = document.createElement("button");
					moveUpButton.textContent = "▲ Move Up";
					moveUpButton.className = "edit list-move leaf";

					const moveDownButton = document.createElement("button");
					moveDownButton.textContent = "Move Down ▼";
					moveDownButton.className = "edit list-move leaf";

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


					const changeListBackgroundInputTools = inputToolMaker({
						levelOfNesting: 5,
						initialValue: listBackgroundColors[listName] || "",
						styleClass: "edit list-input ",
						callbackFunction: function (inputColor) {

							const validatedInput = validateInput("color", inputColor)
							if (validatedInput === null) {
								return;
							}
							listBackgroundColors[listName] = validatedInput.hexValue;
							localStorage.setItem("listBackgroundColors", JSON.stringify(listBackgroundColors))
							renderAndSync()

						}
					})

					listEditDiv.appendChild(changeListBackgroundInputTools);

					break;

				default:

					break;

			}
		}
	})

	listHeaderContainer.appendChild(listHeaderDropDownMenu);
	return listHeaderContainer;
}

function createColorCard(color, listName) {


	const swatchContainer = document.createElement("div");
	swatchContainer.className = "swatch color division";

	const cardHeaderContainer = document.createElement("div")
	cardHeaderContainer.className = "swatch header subdivision";

	const cardBodyContainer = document.createElement("div")
	cardBodyContainer.className = "swatch body subdivision";

	const cardEditContainer = document.createElement("div")
	cardEditContainer.className = "swatch edit subdivision";
	const swatchColor = document.createElement("div");

	if (color.cardBackgroundColor !== undefined) {
		swatchColor.style.borderColor = color.cardBackgroundColor;
	}

	swatchColor.className = "swatch preview asset";
	cardBodyContainer.appendChild(swatchColor);


	const hexValue = document.createElement("h5");
	hexValue.className = "swatch value asset";
	swatchColor.style.backgroundColor = color.hexValue
	hexValue.textContent = color.hexValue;
	cardHeaderContainer.appendChild(hexValue);

	const rgbaValue = document.createElement("h5");
	rgbaValue.className = "swatch value asset";
	rgbaValue.textContent = color.rgbaValue;
	cardHeaderContainer.appendChild(rgbaValue);

	const hslValue = document.createElement("h5");
	hslValue.className = "swatch value asset";
	hslValue.textContent = color.hslValue;
	cardHeaderContainer.appendChild(hslValue);

	const cssKeyword = document.createElement("h5");
	cssKeyword.className = "swatch value asset";
	cssKeyword.textContent = color.cssKeyword || "\u00A0";
	cardHeaderContainer.appendChild(cssKeyword);


	const customName = document.createElement("h6");
	customName.className = "swatch custom-name asset";
	customName.textContent = "\u00A0"
	cardHeaderContainer.appendChild(customName);


	if (color.customName !== "") {
		customName.textContent = color.customName;
	}
	cardBodyContainer.appendChild(swatchColor);



	const editSwatchDropDownMenu = customDropDownMenuMaker({
		options: swatchMenuItem,
		levelOfNesting: 4,
		styleClass: "swatch menu ",
		callbackFunction: function (item) {

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

					const customNameTools = inputToolMaker({
						levelOfNesting: 4,
						initialValue: color.customName,
						placeholderText: getRandomItem(Object.values(cssColors)),
						styleClass: "edit swatch-input ",
						callbackFunction: function (inputName) {

							const validatedInput = validateInput("name", inputName);
							if (validatedInput === null) {
								return;
							}
							color.customName = validatedInput;
							renderAndSync();

						}
					});
					cardEditContainer.appendChild(customNameTools);

					break;

				case "Move Color":


					const moveColorToolsDiv = document.createElement("div");
					moveColorToolsDiv.className = "edit swatch-move bin";

					const moveLeftButton = document.createElement("button");
					moveLeftButton.textContent = "◀ Move Left";
					moveLeftButton.className = "edit swatch-move leaf";

					const moveRightButton = document.createElement("button");
					moveRightButton.textContent = "Move Right ▶";
					moveRightButton.className = "edit swatch-move leaf";

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

					const editSwatchTools = inputToolMaker({
						levelOfNesting: 4,
						initialValue: color.hexValue,
						styleClass: "edit swatch-input ",
						callbackFunction: function (inputColor) {

							const validatedInput = validateInput("color", inputColor, listName);
							if (validatedInput === null) {
								return;
							}
							color.hexValue = validatedInput.hexValue;
							color.hslValue = validatedInput.hslValue;
							color.rgbaValue = validatedInput.rgbaValue;
							color.cssKeyword = validatedInput.cssKeyword;
							renderAndSync();
						}
					});


					cardEditContainer.appendChild(editSwatchTools);
					break;

				case "Move to New List":

					const moveToNewListTools = inputToolMaker({
						levelOfNesting: 4,
						placeholderText: getRandomItem(genericListNames),
						styleClass: "edit swatch-input ",
						callbackFunction: function (newListName) {

							const validatedInput = validateInput("list", newListName);
							if (validatedInput === null) {
								return;
							}
							colorsILike[newListName] = [];
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							colorsILike[newListName].push(structuredClone(color));
							renderAndSync();

						}
					});
					cardEditContainer.appendChild(moveToNewListTools);

					break;

				case "Move to Existing List":

					const listMoveMenuItem = [
						"--Pick One--",
						...Object.keys(colorsILike)
					]
					const listMoveDropDownMenu = customDropDownMenuMaker({
						options: listMoveMenuItem,
						styleClass: "edit swatch-menu ",
						levelOfNesting: 4,
						callbackFunction: function (item) {

							const newList = item;
							colorsILike[newList].push(structuredClone(color));
							colorsILike[listName].splice(colorsILike[listName].indexOf(color), 1);
							renderAndSync();

						}
					});

					cardEditContainer.appendChild(listMoveDropDownMenu);

					break;

				case "Change Card Background Color":
					const changeCardBackgroundTool = inputToolMaker({
						levelOfNesting: 4,
						initialValue: color.cardBackgroundColor,
						styleClass: "edit swatch-input ",
						callbackFunction: function (inputColor) {

							const validatedInput = validateInput("color", inputColor);
							if (validatedInput === null) {
								return;
							}
							color.cardBackgroundColor = validatedInput.hexValue;
							renderAndSync();
						}
					})

					cardEditContainer.appendChild(changeCardBackgroundTool);

					break;
				case "Copy to List":

					const copyToListMenuItem = [
						"--Pick One--",
						...Object.keys(colorsILike)
					]

					const copyToListDropDownMenu = customDropDownMenuMaker({
						options: copyToListMenuItem,
						styleClass: "edit swatch-menu ",
						levelOfNesting: 4,
						callbackFunction: function (item) {

							const newList = item;
							colorsILike[newList].push(structuredClone(color));
							renderAndSync();

						}
					});

					cardEditContainer.appendChild(copyToListDropDownMenu);
					break;

				default:
					break;
			}

		}
	});

	cardBodyContainer.appendChild(editSwatchDropDownMenu);

	swatchContainer.appendChild(cardHeaderContainer)
	swatchContainer.appendChild(cardBodyContainer)
	swatchContainer.appendChild(cardEditContainer)

	return swatchContainer;

}

function createColorList(listName) {

	const listDiv = document.createElement("div");
	listDiv.className = "list color frame";

	if (listBackgroundColors[listName] !== undefined) {
		listDiv.style.backgroundColor = listBackgroundColors[listName];

	}

	const listHeader = createListHeader(listName);
	listDiv.appendChild(listHeader);


	const swatchContainerWrapper = document.createElement("div")
	swatchContainerWrapper.className = "swatch color plugin";

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

