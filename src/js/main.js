import '/src/styles.scss';

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