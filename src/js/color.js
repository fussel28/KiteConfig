const selectedModell = localStorage.getItem("Modell");
document.getElementById("modellNameSidebar").innerHTML = selectedModell;
const selectedWind = localStorage.getItem("Wind");
document.getElementById("WindSidebar").innerHTML = selectedWind;
const selectedMuster = localStorage.getItem("Muster");
document.getElementById("MusterSidebar").innerHTML = selectedMuster;

localStorage.removeItem("Farbe 1");
localStorage.removeItem("Farbe 2");
localStorage.removeItem("Farbe 3");
localStorage.removeItem("Farbe 4");
localStorage.removeItem("Farbe 5");
localStorage.removeItem("Farbe 6");

document.addEventListener('DOMContentLoaded', function () {
    const kiteImage = document.getElementById('kiteImage');
    const modelValue = localStorage.getItem("Modell");
    const musterValue = localStorage.getItem("Muster");

    // check against lower case to prevent case sensitivity
    switch(modelValue.toLowerCase()){
        case 'rev':
            document.querySelector(".kite02Umrandung").classList.add("unvisable");
            document.querySelector(".kite02Tria").classList.add("unvisable");
            document.querySelector(".kite02Cube").classList.add("unvisable");

            if (musterValue === "cube") {
                document.querySelector(".kite01Tria").classList.add("unvisable");
            } else if (musterValue === "triangular") {
                document.querySelector(".kite01Cube").classList.add("unvisable");
            } else {
                console.log("no muster given");
            }
            break;

        case 'skyknife':
            document.querySelector(".kite01Umrandung").classList.add("unvisable");
            document.querySelector(".kite01Tria").classList.add("unvisable");
            document.querySelector(".kite01Cube").classList.add("unvisable");

            if (musterValue === "cube") {
                document.querySelector(".kite02Tria").classList.add("unvisable");
            } else if (musterValue === "triangular") {
                document.querySelector(".kite02Cube").classList.add("unvisable");
            } else {
                console.log("no muster given");
            }
            break;

        default:
            kiteImage.alt = 'Unbekanntes Modell';
            console.warn('Unbekanntes Modell');
    }

    createColorButtons('Farbe1');
    createColorButtons('Farbe2');
    createColorButtons('Farbe3');
    updateColorOptions('nothing')
});


const ACTIVE_COLOR_PICKER_INDICES = {
    nothing: [],
    single: ["1"],
    double: ["1","2"],
    triple: ["1","2","3"]
}

let AVAILABLE_COLORS = [
    {name: 'red', hex: '#FF0000'},
    {name: 'white', hex: '#FFFFFF'},
    {name: 'black', hex: '#000000'},
    {name: 'gray', hex: '#808080'},
    {name: 'anthrazit', hex: '#353535'},
    {name: 'yellow', hex: '#FFFF00'},
    {name: 'gold', hex: '#FFD700'},
    {name: 'orange', hex: '#FFA500'},
    {name: 'lightblue', hex: '#ADD8E6'},
    {name: 'blue', hex: '#0000FF'},
    {name: 'darkblue', hex: '#00008B'},
    {name: 'bluegreen', hex: '#0D98BA'},
    {name: 'lila', hex: '#800080'},
    {name: 'green', hex: '#008000'},
    {name: 'cedar', hex: '#4B3621'},
    {name: 'neonyellow', hex: '#CCFF00'},
    {name: 'neongreen', hex: '#39FF14'},
    {name: 'neonpink', hex: '#FF6EC7'},
    {name: 'neonorange', hex: '#FF6700'}
];

let selectedColors = {
    color1: null,
    color2: null,
    color3: null
}

function createColorButtons(colorPickerId) {
    const colorPicker = document.getElementById(colorPickerId);
    const colorPickerIndex = getColorPickerIndex(colorPicker);

    AVAILABLE_COLORS.forEach(color => {

        const button = document.createElement('div');
        button.className = `color-button ${color.name}`;
        button.style.backgroundColor = color.hex;
        button.onclick = () => onSelectColor(colorPickerIndex, color.name, button);
        colorPicker.appendChild(button);
    });
}

// checks if the specified color is selected in a different color picker than the one with the given index
function isColorSelectedElsewhere(color, colorPickerIndex){
    for (let key in selectedColors){
        if(selectedColors.hasOwnProperty(key) && selectedColors[key]){
            // if this color is selected in another color picker
            if(selectedColors[key].name === color.name && key[key.length-1] !== colorPickerIndex){
                return true;
            }
        }
    }
    return false;
}

function onSelectColor(colorPickerIndex, colorName, button){
    // find corresponding color object in AVAILABLE_COLORS and set it as a selectedColor according to the colorPickerIndex
    selectedColors[`color${colorPickerIndex}`] = AVAILABLE_COLORS.find((color) => color.name === colorName)
    localStorage.setItem(`Farbe ${colorPickerIndex}`, colorName);
    updateColorButtons(colorPickerIndex);
    button.classList.add("selected");
    changeSVGColors();
}

function updateColorButtons(currentColorPickerIndex){
    // get all colorPickers
    const colorPickers = document.querySelectorAll(".color-picker");

    // iterate over colorPickers
    colorPickers.forEach(colorPicker => {

        // get current color Picker index and all children buttons
        const colorPickerIndex = getColorPickerIndex(colorPicker);
        const colorButtons = Array.from(colorPicker.children);

        // iterate over every available color to check whether it should be displayed by this color picker
        AVAILABLE_COLORS.forEach(color => {
            const correspondingButton = colorButtons.find(button => button.classList.contains(color.name));
            const colorAlreadyChosen = isColorSelectedElsewhere(color, colorPickerIndex)
            // if button exists, but color is already chosen, make button invisible
            if(correspondingButton && colorAlreadyChosen){
                correspondingButton.classList.add("invisible");
            } else {
                correspondingButton.classList.remove("invisible");
            }
        })

        // remove "selected" class from buttons which are not selected in the current color picker
        if(colorPickerIndex === currentColorPickerIndex || colorPickerIndex === 0){
            colorButtons.forEach(button => button.classList.remove("selected"))
        }
    })
}

// function, which is called when "Farbschema" select changes
function onColorSchemeChange(){
    const select = document.querySelector("#FarbSchemaSidebar");
    const selectValue = select.value;
    updateColorOptions(selectValue);
    removeSelectedClassFromButtons(selectValue);
    changeModellClass(selectValue);
    changeSVGColors()
}

function updateColorOptions(selectValue){
    // map selectValue to visible colorpicker indices and get all colorPickers
    const activeColorPickerIndices = ACTIVE_COLOR_PICKER_INDICES[selectValue];
    const colorPickerContainers = document.querySelectorAll(".farbe")

    // iterate over colorPickers and set unvisable if index is not in activeColorPickerIndices
    colorPickerContainers.forEach((colorPicker) => {
        // get index: e.g. "farbeSelect1" -> "1"
        const colorPickerIndex = getColorPickerIndex(colorPicker)

        // set invisible class accordingly
        if(activeColorPickerIndices.includes(colorPickerIndex)){
            colorPicker.classList.remove("invisible");
        }else{
            colorPicker.classList.add("invisible");
            removeSelectedColor(colorPickerIndex)
        }
    })
}

// removes the "selected" class from buttons if color picker is not shown
function removeSelectedClassFromButtons(selectValue){
    const activeColorPickerIndices = ACTIVE_COLOR_PICKER_INDICES[selectValue];
    const colorPickers = document.querySelectorAll(".color-picker")
    colorPickers.forEach(colorPicker => {
        const colorPickerIndex = getColorPickerIndex(colorPicker);

        // remove button selected class for every color picker which is not shown
        if (!activeColorPickerIndices.includes(colorPickerIndex)){
            const colorButtons = Array.from(colorPicker.children);
            colorButtons.forEach(button => {
                button.classList.remove("selected");
            })
        }
    })
}

// changes class of the modell div to the selectedValue
// e.g. user selects "single" and modell classes are ["double", "modell"] -> it sets modell classes to ["single", "modell"]
function changeModellClass(selectValue){
    const modellElement = document.querySelector(".konfig-color .modell");
    const possibleClasses = ["single", "double", "triple"].filter(value => value !== selectValue);
    possibleClasses.forEach(possibleClass => modellElement.classList.remove(possibleClass));
    modellElement.classList.add(selectValue);
}

// changes SVG colors of the kite based on the selectedColors
function changeSVGColors(){
    const modellElement = document.querySelector(".konfig-color .modell");

    // iterate over each selected color
    for (let key in selectedColors){
        const colorNumber = key[key.length-1]; // current color e.g. "color1" -> "1"

        // remove class for current color number
        // e.g. if current color is "color2", the class "f2-yyy" is removed from the modellElement
        const classToRemove = Array.from(modellElement.classList).filter(className => className.startsWith(`f${colorNumber}`));
        if(classToRemove){
            modellElement.classList.remove(classToRemove[0]);
        }

        // if a color is selected, add the new class to the modellElement
        if(selectedColors[key]){
            modellElement.classList.add(`f${colorNumber}-${selectedColors[key].name}`)
        }
    }
}

function getColorPickerIndex(colorPicker){
    return colorPicker.id[colorPicker.id.length-1];
}

function removeSelectedColor(index){
    selectedColors[`color${index}`] = null;
}

function updateSelectableColors(){
    const colorPickers = document.querySelectorAll(".farbe");
    colorPickers.forEach((colorPicker) => {
        const colorPickerIndex = getColorPickerIndex(colorPicker);
        createColorButtons(colorPicker.id)
    })
}
