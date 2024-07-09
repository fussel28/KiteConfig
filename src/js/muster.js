const selectedModell = localStorage.getItem("Modell");
document.getElementById("modellNameSidebar").innerHTML = selectedModell;
const selectedWind = localStorage.getItem("Wind");
document.getElementById("WindSidebar").innerHTML = selectedWind;

document.addEventListener('DOMContentLoaded', function() {
    const modelKey = 'Modell';
    const kiteImage = document.getElementById('kiteImage');
    const kiteMusterCube = document.getElementById('kiteMusterCube');
    const kiteMusterTria = document.getElementById('kiteMusterTria');
    const modelValue = localStorage.getItem(modelKey);

    if (kiteImage && kiteMusterCube && kiteMusterTria) {
        if (modelValue === 'Rev') {
            kiteImage.src = '/image/kite01.svg';
            kiteMusterCube.src = "/image/kite01-Muster-cube.svg";
            kiteMusterTria.src = "/image/kite01-Muster-tria.svg";
        } else if (modelValue === 'Skyknife') {
            kiteImage.src = '/image/kite02.svg';
            kiteMusterCube.src = "/image/kite02-Muster-cube.svg";
            kiteMusterTria.src = "/image/kite02-Muster-tria.svg";
        } else {
            kiteImage.alt = 'Unbekanntes Modell';
            console.warn('Unbekanntes Modell');
        }
    }
});