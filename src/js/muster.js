document.addEventListener('DOMContentLoaded', function() {
    const modelKey = 'Modell';
    const kiteImage = document.getElementById('kiteImage');
    const kiteMusterCube = document.getElementById('kiteMusterCube');
    const kiteMusterTria = document.getElementById('kiteMusterTria');
    const modelValue = localStorage.getItem(modelKey);
    let sidebarState = localStorage.getItem("sidebarState");

    if (sidebarState === "open") {
        openNav();
    }

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
});

const selectedModell = localStorage.getItem("Modell");
document.getElementById("modellNameSidebar").innerHTML = selectedModell;

const selectedWind = localStorage.getItem("Wind");
document.getElementById("WindSidebar").innerHTML = selectedWind;

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("header").style.marginRight = "250px";
    localStorage.setItem("sidebarState", "open");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("header").style.marginRight = "0";
    localStorage.setItem("sidebarState", "closed");
}