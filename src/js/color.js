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

    if (modelValue === 'Rev') {
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

    }
    else if (modelValue === 'Skyknife') {

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
    }
    else {
        kiteImage.alt = 'Unbekanntes Modell';
        console.warn('Unbekanntes Modell');
    }

    const colors = [
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

    function createColorButtons(colorPickerId) {
        const colorPicker = document.getElementById(colorPickerId);

        colors.forEach(color => {
            const button = document.createElement('div');
            button.className = `color-button ${color.name}`;
            button.style.backgroundColor = color.hex;
            button.onclick = () => selectColorPicker(colorPickerId, color.name, button);
            colorPicker.appendChild(button);
        });
    }

    createColorButtons('Farbe1');
    createColorButtons('Farbe2');
    createColorButtons('Farbe3');
});

function selectColorPicker(colorPickerId, color, button) {
    // Funktion zur Farbauswahl
    const colorButtonClass = `f1-${color}`;
    const parentElement = button.parentElement;
    parentElement.className = `color-picker ${colorButtonClass}`;

    let konfigColorDiv = document.querySelector(".konfig-color .modell");

    // Zusätzliches Beispiel für ein spezifisches Modell
    konfigColorDiv.classList.add(colorButtonClass);

    if (colorPickerId === 'Farbe1') {
        selectedColorPicker1 = color;
        if (color === 'rot') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker2 .color-button.red').style.display = 'none';
            document.querySelector('#colorPicker3 .color-button.red').style.display = 'none';
            document.querySelector('#colorPicker2 .color-button.white').style.display = 'block';
            document.querySelector('#colorPicker2 .color-button.black').style.display = 'block';
        }
        if (color === 'weiß') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker2 .color-button.white').style.display = 'none';
            document.querySelector('#colorPicker3 .color-button.white').style.display = 'none';
            document.querySelector('#colorPicker2 .color-button.red').style.display = 'block';
            document.querySelector('#colorPicker2 .color-button.black').style.display = 'block';
        }
        if (color === 'schwarz') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker2 .color-button.black').style.display = 'none';
            document.querySelector('#colorPicker3 .color-button.black').style.display = 'none';
            document.querySelector('#colorPicker2 .color-button.red').style.display = 'block';
            document.querySelector('#colorPicker2 .color-button.white').style.display = 'block';
        }
    }
    if (colorPickerId === 'Farbe2') {
        selectedColorPicker1 = color;
        if (color === 'rot') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker3 .color-button.red').style.display = 'none';
        }
        if (color === 'weiß') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker3 .color-button.white').style.display = 'none';
        }
        if (color === 'schwarz') {
            // Blende den roten Farbbutton im zweiten Color Picker aus
            document.querySelector('#colorPicker3 .color-button.black').style.display = 'none';
        }
    }
    localStorage.setItem(colorPickerId, color);
    updateSelectedColor(button);
    updateKonfigColor(color);
}

// Updated Anzahl der Farben, wenn unterschiedliches ausgewählt wurde
function updateFarboptionen() {
    let schema = document.getElementById("FarbSchemaSidebar").value;
    let farbe1 = document.getElementById("farbeSelect1");
    let farbe2 = document.getElementById("farbeSelect2");
    let farbe3 = document.getElementById("farbeSelect3");
    let konfigColorDiv = document.querySelector(".konfig-color .modell");
    let farbSchema = localStorage.getItem('Farbschema');
    let pattern = localStorage.getItem('Muster');
    let trippleOption = document.querySelector('option[value="tripple"]');

    // Disable "dreifarbig" option if the pattern is "triangular"
    if (pattern === 'triangular') {
        trippleOption.disabled = true;
        if (schema === 'tripple') {
            schema = 'single'; // Default to single if tripple was previously selected
            document.getElementById("FarbSchemaSidebar").value = 'single';
        }
    } else {
        trippleOption.disabled = false;
    }

    // Standardmäßig alle ausblenden
    farbe1.style.display = "none";
    farbe2.style.display = "none";
    farbe3.style.display = "none";

    // Zeige die entsprechende Anzahl an Farboptionen basierend auf der Auswahl
    if (schema === "single") {
        farbe1.style.display = "block";
        localStorage.setItem('Farbschema', 'einfarbig');
        localStorage.removeItem('Farbe02');
        localStorage.removeItem('Farbe03');
        konfigColorDiv.classList.add("einfarbig");
        konfigColorDiv.classList.remove("zweifarbig");
        konfigColorDiv.classList.remove("dreifarbig");
        removeClassByPrefix('f2-');
        removeClassByPrefix('f3-');
    } else if (schema === "double") {
        farbe1.style.display = "block";
        farbe2.style.display = "block";
        localStorage.setItem('Farbschema', 'zweifarbig');
        localStorage.removeItem('Farbe03');
        konfigColorDiv.classList.add("zweifarbig");
        konfigColorDiv.classList.remove("einfarbig");
        konfigColorDiv.classList.remove("dreifarbig");
        removeClassByPrefix('f3-');
    } else if (schema === "tripple") {
        farbe1.style.display = "block";
        farbe2.style.display = "block";
        farbe3.style.display = "block";
        localStorage.setItem('Farbschema', 'dreifarbig');
        konfigColorDiv.classList.add("dreifarbig");
        konfigColorDiv.classList.remove("einfarbig");
        konfigColorDiv.classList.remove("zweifarbig");
    }
}

// entfernt Klasse f3-, wenn nur zweifarbig
function removeClassByPrefix(element, prefix) {
    if (element && element.className) {
        let classes = element.className.split(" ").filter(c => !c.startsWith(prefix));
        element.className = classes.join(" ").trim();
    }
}

// fügt Klasse "selected" hinzu, wenn Farbe in der Sidebar gewählt
function updateSelectedColor(selectedElement) {
    let colorPickers = selectedElement.parentElement.children;
    for (let colorButton of colorPickers) {
        colorButton.classList.remove('selected');
    }
    selectedElement.classList.add('selected');
}

// fügt klassen f1 - f3 hinzu
function updateKonfigColor(color) {
    let konfigColorDiv = document.querySelector(".konfig-color .modell");
    let numColors = 3; // Beispiel für die maximale Anzahl der Farben, die du verwalten möchtest
    let newClasses = [];
    let color01 = localStorage.getItem("Farbe1")
    let color02 = localStorage.getItem("Farbe2")
    let color03 = localStorage.getItem("Farbe3")

    let colorButtonPicker01 = document.querySelectorAll("#farbeSelect1 .color-picker .color-button");
    let colorButtonPicker02 = document.querySelectorAll("#farbeSelect2 .color-picker .color-button");
    let colorButtonPicker03 = document.querySelectorAll("#farbeSelect3 .color-picker .color-button");


    colorButtonPicker01.forEach(button => {
        if (button.classList.contains("selected")) {
            let secondClass = button.classList.item(1);

            colorButtonPicker02.forEach(button => {
                if(button.classList.contains(secondClass)){
                    button.style.display = "none";
                }
            })

            colorButtonPicker03.forEach(button => {
                if(button.classList.contains(secondClass)){
                    button.style.display = "none";
                }
            })
        }
    });

    colorButtonPicker02.forEach(button => {
        if (button.classList.contains("selected")) {
            let secondClass = button.classList.item(1);

            colorButtonPicker03.forEach(button => {
                if(button.classList.contains(secondClass)){
                    button.style.display = "none";
                }
            })
        }
    });

    // Entferne alle vorhandenen Farbklassen
    for (let i = 1; i <= numColors; i++) {
        removeClassByPrefix(konfigColorDiv, `f${i}-`);
    }

    // Lese die gespeicherten Farben aus dem localStorage und füge neue Klassen hinzu
    for (let i = 1; i <= numColors; i++) {
        if (color) {
            newClasses.push(`f${i}-${color.toLowerCase()}`);
        }
    }

    if(konfigColorDiv.classList.contains("einfarbig")){
        localStorage.removeItem("Farbe2")
        localStorage.removeItem("Farbe3")
        if(color === color01){
            konfigColorDiv.classList.add(`f1-${color01}`);
        }
    }

    if(konfigColorDiv.classList.contains("zweifarbig")) {
        localStorage.removeItem("Farbe3")
        if (color === color02) {
            konfigColorDiv.classList.add(`f1-${color01}`);
            konfigColorDiv.classList.add(`f2-${color02}`);
        }
    }

    if(konfigColorDiv.classList.contains("dreifarbig")) {
        if (color === color03) {
            konfigColorDiv.classList.add(`f1-${color01}`);
            konfigColorDiv.classList.add(`f2-${color02}`);
            konfigColorDiv.classList.add(`f3-${color03}`);
        }
    }

    // Optional: Funktion, um die letzten drei relevanten Klassen beizubehalten
    keepLastThreeRelevantClasses(konfigColorDiv);
}

function keepLastThreeRelevantClasses(element) {
    let classes = element.className.split(" ");
    let f1Class, f2Class, f3Class;

    // Iterieren Sie rückwärts, um die letzten Vorkommen zu finden
    for (let i = classes.length - 1; i >= 0; i--) {
        if (classes[i].startsWith('f1-') && !f1Class) {
            f1Class = classes[i];
        } else if (classes[i].startsWith('f2-') && !f2Class) {
            f2Class = classes[i];
        } else if (classes[i].startsWith('f3-') && !f3Class) {
            f3Class = classes[i];
        }
    }

    // Entfernen Sie alle Klassen mit den Präfixen 'f1-', 'f2-', und 'f3-'
    removeClassByPrefix(element, 'f1-');
    removeClassByPrefix(element, 'f2-');
    removeClassByPrefix(element, 'f3-');

    // Fügen Sie nur die gefundenen letzten Vorkommen hinzu
    if (f1Class) element.classList.add(f1Class);
    if (f2Class) element.classList.add(f2Class);
    if (f3Class) element.classList.add(f3Class);
}

// Initiale Funktion aufrufen, um den korrekten Zustand beim Laden der Seite zu setzen
updateFarboptionen();

