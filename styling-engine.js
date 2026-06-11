const SCHEMES = {
	"industrial": {
		1: "leaf",
		2: "partition",
		3: "packet",
		4: "bin",
		5: "receptacle",
		6: "container",
		7: "crate",
		8: "widget",
		9: "shell"

	},
	"document": {
		1: "item",
		2: "bundle",
		3: "block",
		4: "area",
		5: "support",
		6: "subsection",
		7: "section",
		8: "wrapper",
		9: "skeleton"
	},
	"collection": {
		1: "asset",
		2: "package",
		3: "case",
		4: "carrier",
		5: "subdivision",
		6: "division",
		7: "plugin",
		8: "frame",
		9: "framework"
	}
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

const staticEditDropDownMenuItem = [
	"--Edit Page--",
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

const baseColorPickerDropDownMenuOptions = [
	"--Pick A Color--",
	...Object.keys(genericColors),
]

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

function generate(config = {}) {
	if (config instanceof HTMLElement) {
		return config;
	}

	const {
		path = "industrial",
		level = 1,
		children = [],
		className = "",
		tag = "div",
		content = "",
		callbackFunction = null
	} = config;

	if (level === 1) {
		return level1({ tag, className, content, callbackFunction });
	}
	else {
		if (!children.length) {
			children = [{ level: level - 1, }];
		}

		const childrenArray = children.map(child => {
			if (!child.path) {
				child.path = path;
			}
			if (child.children) {

				if (!child.level) {
					child.level = level - 1;
				}
			}

			return generate(child);

		})
		return create({ path, levelOfNesting: level, children: childrenArray, className, callbackFunction });
	}
}


function create({
	path = "industrial",
	levelOfNesting = 1,
	children = [],
	className = "",
	callbackFunction = null
} = {}) {

	if (children.length === 0) {
		children = [level1({ tag: "div", className: "blank", content: "" })]
	}
	const chosenDesign = SCHEMES[path][levelOfNesting];


	const newElement = document.createElement("div");
	newElement.level = levelOfNesting;
	if (className !== "") {
		newElement.classList.add(className);

	}
	newElement.classList.add(chosenDesign);
	if (callbackFunction) {
		newElement.addEventListener("click", callbackFunction);
	}

	children.forEach(child => {
		if (child.level >= newElement.level) {
			throw new Error("Child level cannot be greater than or equal to parent level");
		}
		newElement.appendChild(child);
	})

	return newElement;

}



function level1({
	path = "industrial",
	children = [],
	tag = "div",
	className = "",
	content = "",
	callbackFunction = null } = {}) {
	
	const chosenDesign = SCHEMES[path][1];

	const newElement = document.createElement(tag);
	newElement.level = 1;
	if (tag === "option" || tag === "input") {
		newElement.value = content;
	} else {
		newElement.textContent = content;
	}
	if (callbackFunction && tag !== "option" && tag !== "input") { newElement.addEventListener("click", callbackFunction); }


	newElement.classList.add(chosenDesign);
	if (className !== "") {
		newElement.classList.add(className);
	}

	children.forEach(child => {
		newElement.appendChild(child)
	})
	return newElement;
}

function level2(config) {

	return generate({ ...config, level: 2 });
}

function level3(config) {

	return generate({ ...config, level: 3 });
}

function level4(config) {

	return generate({ ...config, level: 4 });
}

function level5(config) {

	return generate({ ...config, level: 5 });
}

function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function findSuffixAndPath(styleClass, levelOfNesting) {
	if (!styleClass) {
		styleClass = "edit menu";
	}
	const scope = styleClass.split(" ")[0];
	let path;


	switch (scope) {
		case "page":
			path = "document";
			break;
		case "list":
			path = "collection";
			break;
		case "swatch":
			path = "collection";
			break;
		case "edit":
			path = "industrial";
			break;
		default:
			path = "industrial";
	}
	if (!levelOfNesting) {

		if (scope === "edit") {
			levelOfNesting = 3
		} else {
			levelOfNesting = 2
		}
	}

	const containerClassSuffix = SCHEMES[path][levelOfNesting];
	const childrenClassSuffix = SCHEMES[path][1];
	return { containerClassSuffix, childrenClassSuffix };

}



function customDropDownMenuMaker({
	options = [],
	callbackFunction = null,
	styleClass = "",
	levelOfNesting = null
} = {}) {
	const makeClass = findSuffixAndPath(styleClass, levelOfNesting);
	const dropDownMenu = document.createElement("div")
	dropDownMenu.className = `${styleClass} ${makeClass.containerClassSuffix}`;

	options.forEach(item => {
		const dropDownOption = document.createElement("div")
		dropDownOption.className = `${styleClass} ${makeClass.childrenClassSuffix}`;

		if (item.startsWith("--")) {
			dropDownOption.classList.add("placeholder");
		} else {
			dropDownOption.classList.add("clickable");
		}

		if (dropDownOption.classList.contains("placeholder")) {
			dropDownOption.addEventListener("click", function () {
				dropDownMenu.classList.toggle("open");
			})
		} 
		dropDownOption.textContent = item
		dropDownMenu.appendChild(dropDownOption)
		if (dropDownOption.classList.contains("clickable")) {

			dropDownOption.addEventListener("click", function () {
				callbackFunction(item)
			})
		}
	})

	return dropDownMenu;
}




function inputToolMaker({
	initialValue = "",
	placeholderText = getRandomItem(megaArray),
	buttonText = "Confirm",
	styleClass = "",
	levelOfNesting = null,
	callbackFunction = null
} = {}) {
	const makeClass = findSuffixAndPath(styleClass, levelOfNesting);

	const inputToolContainer = document.createElement("div");
	inputToolContainer.className = `${styleClass} ${makeClass.containerClassSuffix}`;

	const inputToolInput = document.createElement("input");
	inputToolInput.className = `${styleClass} ${makeClass.childrenClassSuffix}`;
	inputToolInput.placeholder = placeholderText;
	inputToolInput.value = initialValue;

	const inputToolButton = document.createElement("button");
	inputToolButton.className = `${styleClass} ${makeClass.childrenClassSuffix}`;
	inputToolButton.textContent = buttonText;
	inputToolContainer.appendChild(inputToolInput);
	inputToolContainer.appendChild(inputToolButton);

	inputToolButton.addEventListener("click", function () {
		callbackFunction(inputToolInput.value)
	})

	inputToolInput.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			callbackFunction(inputToolInput.value)
		}
	});

	return inputToolContainer;
}
