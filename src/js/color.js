const selectedModell = localStorage.getItem("Modell");
document.getElementById("modellNameSidebar").innerHTML = selectedModell;
const selectedWind = localStorage.getItem("Wind");
document.getElementById("WindSidebar").innerHTML = selectedWind;
const selectedMuster = localStorage.getItem("Muster");
document.getElementById("MusterSidebar").innerHTML = selectedMuster;

document.addEventListener('DOMContentLoaded', function () {
    const kiteImage = document.getElementById('kiteImage');
    const modelValue = localStorage.getItem("Modell");
    const musterValue = localStorage.getItem("Muster");
    let sidebarState = localStorage.getItem("sidebarState");

    if (sidebarState === "open") {
        openNav();
    }

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

let availableColors = [
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

let selectedColor1 = null;
let selectedColor2 = null;
let selectedColor3 = null;


// 1. Farbe 1 Buttons anzeigen
// selectedColors anzeigen

// 2. Farbe 1 auswählen
// availableColors updaten
// selectedColor1 setzen

// 3. Farbe 2 Buttons anzeigen
// selectedColors anzeigen

// 4. Farbe 2 auswählen
// availableColors updaten
// selectedColor3 setzen

// 5. Farbe 3 Buttons anzeigen
// selectedColors anzeigen

// 6. Farbe 3 auswählen
// availableColors updaten
// selectedColor3 setzen

function createColorButtons(colorPickerId) {
    const colorPicker = document.getElementById(colorPickerId);

    availableColors.forEach(color => {
        const button = document.createElement('div');
        button.className = `color-button ${color.name}`;
        button.style.backgroundColor = color.hex;
        // button.onclick = () => selectColor(colorPickerId, color.name, button);
        colorPicker.appendChild(button);
    });
}

// function, which is called when "Farbschema" select changes
function onSelectColorChange(){
    const select = document.querySelector("#FarbSchemaSidebar");
    const selectValue = select.value;
    updateColorOptions(selectValue);
}

function updateColorOptions(selectValue){
    // map selectValue to visible colorpicker indices and get all colorPickers
    const activeColorPickerIndices = ACTIVE_COLOR_PICKER_INDICES[selectValue];
    const colorPickers = document.querySelectorAll(".farbe")

    // iterate over colorPickers and set unvisable if index is not in activeColorPickerIndices
    colorPickers.forEach((colorPicker) => {
        // get index: e.g. "farbeSelect1" -> "1"
        const colorPickerIndex = colorPicker.id[colorPicker.id.length-1];

        // set invisible class accordingly
        if(activeColorPickerIndices.includes(colorPickerIndex)){
            colorPicker.classList.remove("invisible");
        }else{
            colorPicker.classList.add("invisible");
        }
    })
}
