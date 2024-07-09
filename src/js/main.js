import '/src/styles.scss';

let exportButton = document.getElementById('exportButton');

document.querySelectorAll(".modell:not(.disabled)").forEach(modell => {
    modell.addEventListener("click", function() {
        if (window.location.pathname === "/index.html" || window.location.pathname === "/") {

            const selectedModellName = this.getAttribute("valueModell");
            ModellDTO.setSelectedModell(selectedModellName);
            localStorage.setItem("Modell", selectedModellName);
            window.location.href = "konfiguration.html";
        }
        else if (window.location.href.includes("konfiguration.html")) {
            const selectedWindName = this.getAttribute("valueWind");
            ModellDTO.setSelectedWind(selectedWindName);
            localStorage.setItem("Wind", selectedWindName);
            window.location.href = "muster.html";
        }
        else if (window.location.href.includes("muster.html")) {
            const selectedMusterName = this.getAttribute("valueMuster");
            ModellDTO.setSelectedMuster(selectedMusterName);
            localStorage.setItem("Muster", selectedMusterName);
            window.location.href = "color.html";
        }

        console.log(ModellDTO);

    });
});

// Modell DTO (Data Transfer Object)
const ModellDTO = {
    selectedModell: null, // Variable zum Speichern des ausgewählten Modells
    selectedWind: null,
    selectedMuster: null,

    // Funktion zum Setzen des ausgewählten Modells
    setSelectedModell: function(modellName) {
        this.selectedModell = modellName;
        console.log(modellName);
    },

    setSelectedWind: function(windName) {
        this.selectedWind = windName;
        console.log(windName);
    },

    setSelectedMuster: function(musterName) {
        this.selectedWind = musterName;
        console.log(musterName);
    },

    getSelectedModell: function() {
        return this.selectedModell;
    }
};

if(exportButton) {
    exportButton.addEventListener('click', function() {
        // Lese den gesamten Inhalt des localStorage
        const localStorageContent = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            localStorageContent[key] = localStorage.getItem(key);
        }

        // Konvertiere den Inhalt in JSON-Format
        const jsonContent = JSON.stringify(localStorageContent, null, 2);

        // Erstelle eine Blob-Datei aus dem JSON-Inhalt
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Erstelle einen temporären Link und triggere den Download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'localStorage.json';
        document.body.appendChild(a);
        a.click();

        // Entferne den temporären Link
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}
