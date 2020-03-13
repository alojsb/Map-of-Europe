// canvas basic settings
let myCanvas = document.getElementById("myCanvas");
let c = myCanvas.getContext("2d");

// helper windows with information on click coordinates
let coords = document.getElementById("coords");
let copy = document.getElementById("copy-paste-window");

// declaration of fundamental variables for the map
let countryVertices;        // array of vertices of the active country being drawn (undefined at first)
let x, y;                   // placeholders for click coordinates (undefined until clicked first)

// catch relevant elements in the country stats display
let cName = document.getElementById("country-name");
let oName = document.getElementById("official-name");
let cap = document.getElementById("capital");
let area = document.getElementById("area");
let pop = document.getElementById("population");
let doi = document.getElementById("independence");
let GDPnom = document.getElementById("GDPnom");
let GDPnomPC = document.getElementById("GDPnomPerCapita");
let GDPppp = document.getElementById("GDPppp");
let GDPpppPC = document.getElementById("GDPpppPerCapita");
let GDPpppCompare = document.getElementById("GDPpppCompare");
let HDI = document.getElementById("HDI");
let curr = document.getElementById("currency");
let CC = document.getElementById("CC");
let ICC = document.getElementById("ICC");
let ccTLD = document.getElementById("ccTLD");

// flag-related elements
let flag = document.getElementById("flag");
let image = document.getElementById("image");
let rescaleFactor = 0.5;    // resize flag image
document.getElementById("image").style.width = 5024 * rescaleFactor + "px";
document.getElementById("image").style.height = 3757 * rescaleFactor + "px";
console.log(document.getElementById("image").style.width);
console.log(document.getElementById("image").style.height);

// needs to execute this only after whole document is rendered
window.onload = function () {

    // draw the whole border of a single country and color it blue
    // return the index of country if it has been clicked on
    function colorCountryBlue(s, index) {

        // start drawing polygon
        c.beginPath();
        c.moveTo(s[0].x, s[0].y);

        for(var i = 1; i < s.length; i++)
            c.lineTo(s[i].x, s[i].y);

        // close polygon
        c.closePath();

        // draw borders with these settings
        c.strokeStyle = "lightblue";
        c.lineWidth = 3;
        c.stroke();

        // first color all countries blue
        c.fillStyle = "blue";
        c.fill();

        // check and return index if country has been clicked on
        return c.isPointInPath(x, y) ? index : -1;
    }

    // color country red
    function colorCountryRed(s) {

        // start drawing polygon
        c.beginPath();
        c.moveTo(s[0].x, s[0].y);

        for(var i = 1; i < s.length; i++)
            c.lineTo(s[i].x, s[i].y);

        // close polygon
        c.closePath();

        // draw borders with these settings
        c.strokeStyle = "lightblue";
        c.lineWidth = 3;
        c.stroke();

        // color the polygon red
        c.fillStyle = "red";
        c.fill();
    }

    // draw borders of all countries
    function drawAllCountries(e) {

        // pinpoint user click coordinates (e is undefined before first click)
        if (e) {
            // the offset part makes the page work as intended
            // even if the canvas is moved for some reason (CSS, browser download bar etc.)
            x = e.clientX - myCanvas.offsetLeft;
            y = e.clientY - myCanvas.offsetTop;
        }

        // clear the canvas
        c.clearRect(0, 0, myCanvas.width, myCanvas.height);

        // store the index of active country into this variable
        let activeCountry = -1;
            
        // draw borders and color all countries blue first
        for(var i = 0; i < countryList.length; i++) {

            let temp = colorCountryBlue(countryList[i].countryVertices, i);

            // catch the index of clicked-on country and save it in 'activeCountry'
            if (temp > activeCountry) {
                activeCountry = temp;
            }
        }

        // this is needed to avoid an error at start (activeCountry is equal to -1 before first click)
        if (activeCountry >= 0) {

            presentCountryData(countryData[activeCountry]);
            
            // find active country and color it and it's dependencies red
            if (activeCountry === 6 || activeCountry === 7) {
                colorCountryRed(countryList[6].countryVertices);    // croatia
                colorCountryRed(countryList[7].countryVertices);    // croatia - dubrovnik
            }
            else if (activeCountry === 10 || activeCountry === 11) {
                colorCountryRed(countryList[10].countryVertices);   // denmark
                colorCountryRed(countryList[11].countryVertices);   // denmark - zealand
            }
            else if (activeCountry === 12 || activeCountry === 13 || activeCountry === 14) {
                colorCountryRed(countryList[12].countryVertices);   // estonia
                colorCountryRed(countryList[13].countryVertices);   // estonia - hiiumaa
                colorCountryRed(countryList[14].countryVertices);   // estonia - saaremaa
            }
            else if (activeCountry === 16 || activeCountry === 17) {
                colorCountryRed(countryList[16].countryVertices);   // france
                colorCountryRed(countryList[17].countryVertices);   // france - corsica
            }
            else if (activeCountry === 19 || activeCountry === 20 || activeCountry === 21) {
                colorCountryRed(countryList[19].countryVertices);   // greece
                colorCountryRed(countryList[20].countryVertices);   // greece - crete
                colorCountryRed(countryList[21].countryVertices);   // greece - rodos
            }
            else if (activeCountry === 25 || activeCountry === 26 || activeCountry === 27) {
                colorCountryRed(countryList[25].countryVertices);   // italy
                colorCountryRed(countryList[26].countryVertices);   // italy - sardinia
                colorCountryRed(countryList[27].countryVertices);   // italy - sicily
            }
            else if (activeCountry === 40 || activeCountry === 41 || activeCountry === 42) {
                colorCountryRed(countryList[40].countryVertices);   // russia
                colorCountryRed(countryList[41].countryVertices);   // russia - kaliningrad
                colorCountryRed(countryList[42].countryVertices);   // Russia - Kolguyev island
            }
            else if (activeCountry === 46 || activeCountry === 47 || activeCountry === 48 || activeCountry === 49) {
                colorCountryRed(countryList[46].countryVertices);   // spain
                colorCountryRed(countryList[47].countryVertices);   // spain - ibiza
                colorCountryRed(countryList[48].countryVertices);   // spain - mallorca
                colorCountryRed(countryList[49].countryVertices);   // spain - menorca
            }
            else if (activeCountry === 50 || activeCountry === 51) {
                colorCountryRed(countryList[50].countryVertices);   // sweden
                colorCountryRed(countryList[51].countryVertices);   // sweden - gotland
            }
            else if (activeCountry === 54 || activeCountry === 55) {
                colorCountryRed(countryList[54].countryVertices);   // uk
                colorCountryRed(countryList[55].countryVertices);   // uk - n.ireland
            }
            else
                colorCountryRed(countryList[activeCountry].countryVertices);    // any other country
        }
    }

    function presentCountryData(state) {
        
        console.log("writing out data for country " + state.name);
        cName.innerText = state.name;
        oName.innerText = state.officially;
        cap.innerText = state.capital;
        area.innerText = state.area.toLocaleString() + " km\xB2";
        pop.innerText = state.population.toLocaleString();
        doi.innerText = state.dateOfIndependence.toLocaleDateString();
        GDPnom.innerText = "$" + state.GDPnom + " bil.";
        GDPnomPC.innerText = "$" + (state.GDPnom * 1000000000 / state.population).toFixed(2)/*.toLocaleString()*/;
        GDPppp.innerText = "$" + state.GDPppp + " bil.";
        GDPpppPC.innerText = "$" + (state.GDPppp * 1000000000 / state.population).toFixed(2)/*.toLocaleString()*/;
        GDPpppCompare.innerText = ((state.GDPppp * 1000000000 / state.population) / 18779 * 100).toFixed(2) + "%";
        HDI.innerText = state.HDI;
        curr.innerText = state.currency;
        CC.innerText = state.callingCode;
        ICC.innerText = state.interCarCode;
        ccTLD.innerText = state.internetccTLD;

        showFlag(state.flagCoords);
    }

    function showFlag(coordinates) {

        flag.style.width = (coordinates[1].x - coordinates[0].x) * rescaleFactor + "px";
        flag.style.height = (coordinates[1].y - coordinates[0].y) * rescaleFactor + "px";
        //console.log(flag.style.width + ", " + flag.style.height);
        image.style.left = -coordinates[0].x * rescaleFactor + "px";
        image.style.top = -coordinates[0].y * rescaleFactor + "px";
        // console.log(coordinates[0].x + ", " + coordinates[0].y);
        // console.log(image.style.left + ", " + image.style.top);
    }

    // draw all countries for the first time
    drawAllCountries();
    // draw again whenever we click
    myCanvas.addEventListener("click", drawAllCountries);
}