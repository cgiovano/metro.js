function opentab(event, tabname) {
    let tabcontent = document.getElementsByClassName('tabcontent');

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    let tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabname).style.display = 'block';
    event.currentTarget.className += " active";

    switch (tabname) {
        case ("tunerjs"):
            initTuner();
        default:
            console.log("error");
    }
}

function opentabFirstOpen(tabname) {
    let tabcontent = document.getElementsByClassName('tabcontent');

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    document.getElementById(tabname).style.display = 'block';
    let element = document.getElementById(tabname);
    element.classList.add("active");
}

