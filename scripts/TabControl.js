function opentab(tabname) {
    let tabcontent = document.getElementsByClassName('tabcontent');

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    document.getElementById(tabname).style.display = 'block';

    console.log("hello" + tabname);
}