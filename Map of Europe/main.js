// canvas basic settings
let myCanvas = document.getElementById("myCanvas");
let c = myCanvas.getContext("2d");

// helper windows with information on click coordinates
let coords = document.getElementById("coords");
let copy = document.getElementById("copy-paste-window");

// declaration of fundamental variables
let countryVertices;        // array of vertices of the active country being drawn (undefined at first)
let x, y;                   // placeholders for click coordinates (undefined until clicked first)
let selectionMade = false;  // this flag prevents multiple selections when clicking pixel belonging to more than one country

// needs to execute this only after whole document is rendered
window.onload = function () {

    // draw the whole border of a single country
    function drawBorders(s) {

        // start drawing polygon
        c.beginPath();
        c.moveTo(s[0].x, s[0].y);

        for(var i = 1; i < s.length; i++){

            c.lineTo(s[i].x, s[i].y);
        }

        // close polygon
        c.closePath();

        // draw border between the two given vertices
        c.strokeStyle = "lightblue";
        c.lineWidth = 3;
        c.stroke();

        // fill area of polygon
        if (selectionMade) {    // if there is one country already selected, all other must be unselected
            c.fillStyle = "blue";
        }
        else {  // else do as usual
            // if click is inside polygon, fill it with red color, otherwise blue
            c.fillStyle = c.isPointInPath(x, y) ? "red" : "blue";
            if (c.fillStyle === "#ff0000") {    // if (c.fillStyle === "red") doesn't work
            // flag doesn't allow for a duplicate selection later on
                selectionMade = true;
            }
        }
        c.fill();
    }

    // draw borders of all countries
    function drawAllCountries(e) {

        // pinpoint user click coordinates (e is undefined before first click)
        if (e) {
            x = e.clientX - 8;
            y = e.clientY - 8;
        }

        // clear the canvas
        c.clearRect(0, 0, myCanvas.width, myCanvas.height);

        // catch the background image
        let euroMap = document.getElementById("euroMap");
        c.drawImage(euroMap, 0, 0);
            
        // draw borders of 'active country'
        for(var i = 0; i < countryList.length; i++) {

        // check for special cases (dependencies, separate territories)
        if (
            i === 6 ||  // croatia
            i === 7 ||  // croatia - dubrovnik
            i === 10 || // denmark
            i === 11 || // denmark - zealand
            i === 12 || // estonia
            i === 13 || // estonia - hiiumaa
            i === 14 || // estonia - saaremaa
            i === 16 || // france
            i === 17 || // france - corsica
            i === 19 || // greece
            i === 20 || // greece - crete
            i === 21 || // greece - rodos
            i === 25 || // italy
            i === 26 || // italy - sardinia
            i === 27 || // italy - sicily
            i === 40 || // russia
            i === 41 || // russia - kaliningrad
            i === 42 || // Russia - Kolguyev island
            i === 46 || // spain
            i === 47 || // spain - ibiza
            i === 48 || // spain - mallorca
            i === 49 || // spain - menorca
            i === 50 || // sweden
            i === 51 || // sweden - gotland
            i === 54 || // uk
            i === 55 // uk - n.ireland
            ) {
                switch (i) {
                    case 6:
                        
                        break;
                
                    default:
                        break;
                }
        }



            //drawBorders(countryList[i].countryVertices);
        }
        // reset flag to default value (false)
        selectionMade = false;
    }

    // draw all countries for the first time
    drawAllCountries();
    // draw again whenever we click (this can't be with the other event listeners because then 'drawAllCountries' is undefined)
    myCanvas.addEventListener("click", drawAllCountries);
}


// event listeners (filling helper fields with coords)

myCanvas.addEventListener('mousemove', function (e) {

    // coords.innerText = "c.lineTo(" + (e.clientX - 8) + ", " + (e.clientY - 8) + ");";
    coords.innerText = "{x:" + (e.clientX - 8) + ", y:" + (e.clientY - 8) + "},";
});

myCanvas.addEventListener('click', function (e) {

    // coords.innerText = "c.lineTo(" + (e.clientX - 8) + ", " + (e.clientY - 8) + ");";
    copy.textContent += "{x:" + (e.clientX - 8) + ", y:" + (e.clientY - 8) + "},\n";
});
