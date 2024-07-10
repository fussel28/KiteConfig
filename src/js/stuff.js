const selectedModell = localStorage.getItem("Modell");
document.getElementById("modellNameSidebar").innerHTML = selectedModell;
const selectedWind = localStorage.getItem("Wind");
document.getElementById("WindSidebar").innerHTML = selectedWind;
const selectedMuster = localStorage.getItem("Muster");
document.getElementById("MusterSidebar").innerHTML = selectedMuster;

const selectedColor1 = localStorage.getItem("Farbe 1");
const selectedColor2 = localStorage.getItem("Farbe 2");
const selectedColor3 = localStorage.getItem("Farbe 3");

const saveAndSendEmailButton = document.getElementById('saveAndSendEmail');

localStorage.removeItem("Farbe 4");
localStorage.removeItem("Farbe 5");
localStorage.removeItem("Farbe 6");

if(selectedColor1, selectedColor2, selectedColor3){
    document.getElementById("ColorSidebar").innerHTML = `${selectedColor1} ${selectedColor2} ${selectedColor3}`;
}
else if(selectedColor1, selectedColor2) {
    document.getElementById("ColorSidebar").innerHTML = `${selectedColor1} ${selectedColor2}`;
}
else {
    document.getElementById("ColorSidebar").innerHTML = `${selectedColor1}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const kiteImage = document.getElementById('kiteImage');
    const modelValue = localStorage.getItem("Modell");
    const musterValue = localStorage.getItem("Muster");
    const colorPickers = document.querySelectorAll('.color-picker');
    const modelElement = document.querySelector('.konfig-color .modell'); // Assuming the model element has the ID 'modell'
    const selectElements = document.querySelectorAll('select');
    const textarea = document.getElementById('myTextarea');
    const inputMail = document.getElementById("mail");
    const savedContentMail = localStorage.getItem('Mail');
    const savedContentWunsch = localStorage.getItem('Extrawunsch');

    if (savedContentWunsch) {
        textarea.value = savedContentWunsch;
    }
    if (savedContentMail) {
        inputMail.value = savedContentMail;
    }

    // Speichere den Inhalt im LocalStorage, wenn sich der Inhalt ändert
    textarea.addEventListener('input', function() {
        localStorage.setItem('Extrawunsch', textarea.value);
    });
    inputMail.addEventListener('input', function() {
        localStorage.setItem('Mail', inputMail.value);
    });

    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex].text;
            localStorage.setItem(this.id, selectedOption);
        });

        // Load saved option from localStorage if it exists
        const savedOption = localStorage.getItem(select.id);
        if (savedOption) {
            select.value = savedOption;
        }
    });

    switch(modelValue.toLowerCase()){
        case 'kf-1.5':
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

    applyStoredColors();

    // Function to update model class based on localStorage
    function updateModelClass() {
        for (let i = 4; i <= 6; i++) {
            const colorName = localStorage.getItem(`Farbe ${i}`);
            if (colorName) {
                // Remove previous f4- class if it exists
                const currentClass = Array.from(modelElement.classList).find(cls => cls.startsWith(`f${i}-`));
                if (currentClass) {
                    modelElement.classList.remove(currentClass);
                }
                // Add the new class
                modelElement.classList.add(`f${i}-${colorName}`);
            }
        }
    }

    // Initial update on page load
    updateModelClass();

    colorPickers.forEach((colorPicker, index) => {
        const buttons = colorPicker.getElementsByClassName('color-button');

        for (let button of buttons) {
            button.addEventListener('click', function() {
                // Remove 'selected' class from all buttons in this color-picker
                for (let btn of buttons) {
                    btn.classList.remove('selected');
                }
                // Add 'selected' class to the clicked button
                this.classList.add('selected');

                // Save the color name to localStorage
                const colorName = this.classList[1]; // Assuming the second class name is the color name
                localStorage.setItem(`Farbe ${index + 4}`, colorName);

                // Update the model class
                updateModelClass();
            });
        }
    });

    function handleWindSetting() {
        const windValue = localStorage.getItem('Wind');
        const gazeDiv = document.querySelector('.gaze');
        const modellContainer = document.querySelector('.modell');

        if (windValue === 'standard') {
            gazeDiv.style.display = 'none';
        } else {
            modellContainer.classList.add(windValue);
            gazeDiv.style.display = 'block';
        }
    }

    handleWindSetting();
})

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const userEmail = localStorage.getItem("Mail");

emailjs.init('tDCOHFttzjT_Txkgh');

saveAndSendEmailButton.addEventListener('click', function() {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
    }
    const jsonData = JSON.stringify(localStorageData, null, 2);

    const createMessage = () => {
        let message = `**Modell**: ${localStorage.getItem("Modell")}\n`;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== 'Modell'){
                message += `*${key}*: ${localStorage.getItem(key)}\n`;
            }
        }
        return message;
    }

    if (!isValidEmail(userEmail)) {
        alert('Bitte eine gültige E-Mail-Adresse eingeben.');
    }
    else {
        let message = createMessage();

        const emailParams = {
            to_email: 'fusselowska@gmail.com',
            from_name: 'userEmail',
            message_html: `<pre>${message}</pre>`
        };

        emailjs.send('service_zm3rwgn', 'template_lucpwau', emailParams)
            .then(function(response) {
                    alert('Email wurde erfolgreich gesendet');
                }, function(error) {
                    alert('Email Versand gescheitert ' + JSON.stringify(error));
                }
            );
    }

});

// changes SVG colors of the kite based on the selectedColors
function applyStoredColors() {
    for (let i = 1; i <= 6; i++) {
        const color = localStorage.getItem(`Farbe ${i}`);

        if (color) {
            const modellElement = document.querySelector(`.konfig-color .modell`);
            modellElement.classList.add(`f${i}-${color}`);
        }
    }
}