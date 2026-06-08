const SCHEMES = {
	"industrial": {
		1: "leaf",
		2: "part",
		3: "packet",
		4: "box",
		5: "bin",
		6: "receptacle",
		7: "partition",
		8: "container",
		9: "crate",
		10: "widget",
		11: "shell"
	},
	"document": {
		1: "item",
		2: "element",
		3: "bundle",
		4: "frame",
		5: "block",
		6: "support",
		7: "area",
		8: "subsection",
		9: "section",
		10: "wrapper",
		11: "skeleton"
	},
	"collection": {
		1: "asset",
		2: "component",
		3: "package",
		4: "holder",
		5: "case",
		6: "carrier",
		7: "bundle",
		8: "subdivision",
		9: "division",
		10: "plugin",
		11: "framework"
	},

}

function generate({
	path = "industrial",
	level = 1,
	children = [],
	className = "",
	tag = "div",
	content = "",
	callbackFunction = null
} = {}) {

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

function level6(config) {

	return generate({ ...config, level: 6 });
}

function level7(config) {

	return generate({ ...config, level: 7 });
}

function level8(config) {

	return generate({ ...config, level: 8 });
}

function level9(config) {

	return generate({ ...config, level: 9 });
}

function level10(config) {

	return generate({ ...config, level: 10 });
}

function level11(config) {

	return generate({ ...config, level: 11 });
}

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

	inputToolInput.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			callbackFunction(inputToolInput.value)
		}
	});

	return inputToolContainer;
}
