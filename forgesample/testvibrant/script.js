(function () {
    'use strict';
    console.log("egladen");
    var img = document.querySelector('img'),
        list = document.querySelector('ul'),
        section = document.querySelector('section'),
        paletteReady = false;
   // var img2 = document.createElement('img');

    //img2.setAttribute('src', 'krebs.png');

    //img2.addEventListener('load', function () {
    //    console.log("geladen2");
    //    getPalette();
    //});


    img.addEventListener('load', function () {
        console.log("geladen");
        if (!paletteReady)
            getPalette();
    });


    function getPalette() {
        paletteReady = true;
        console.log("palette");
        var vibrant = new Vibrant(img);
        console.log("vibrant");
        var swatches = vibrant.swatches();
        console.log("swatches");

        var listFragment = new DocumentFragment();
        console.log("fragment");
        console.log("swatchcount" + swatches.length);
        var HexDecimal = "";
        var HexList =[]
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                console.log(swatch, swatches[swatch].getHex());
                var li = document.createElement('li'),
                    p = document.createElement('p'),
                    small = document.createElement('small');

                p.textContent = swatches[swatch].getHex();
                HexDecimal += "," + swatches[swatch].getHex()
                p.style.color = swatches[swatch].getTitleTextColor();
                small.textContent = swatch;
                small.style.color = swatches[swatch].getBodyTextColor();
                li.style.backgroundColor = swatches[swatch].getHex();
                li.appendChild(p);
                li.appendChild(small);
                listFragment.appendChild(li);
            }
        }
        HexList=HexDecimal.split
        list.appendChild(listFragment);

        window.open("http://thatcolorapp.apphb.com?colors="+ HexDecimal);
        if (swatches['DarkVibrant']) {
            section.style.backgroundColor = swatches['DarkVibrant'].getHex();
        }
    }
}());