﻿(function () {
    'use strict';
    console.log("egladen");
    var img = document.querySelector('img'),
        list = document.querySelector('ul'),
        section = document.querySelector('section'),
        paletteReady = false;
    var img2 = document.createElement('img');

    img2.setAttribute('src', 'https://vignette.wikia.nocookie.net/uncyclopedia/images/b/be/Cat.JPG/revision/latest?cb=20080529031026');

    img2.addEventListener('load', function () {
        console.log("geladen2");
        getPalette();
    });


    img.addEventListener('load', function () {
        console.log("geladen");
        if (!paletteReady)
            getPalette();
    });


    function getPalette() {
        paletteReady = true;
        console.log("palette");
        var vibrant = new Vibrant(img2);
        console.log("vibrant");
        var swatches = vibrant.swatches();
        console.log("swatches");

        var listFragment = new DocumentFragment();
        console.log("fragment");

        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                console.log(swatch, swatches[swatch].getHex());
                var li = document.createElement('li'),
                    p = document.createElement('p'),
                    small = document.createElement('small');

                p.textContent = swatches[swatch].getHex();
                p.style.color = swatches[swatch].getTitleTextColor();
                small.textContent = swatch;
                small.style.color = swatches[swatch].getBodyTextColor();
                li.style.backgroundColor = swatches[swatch].getHex();
                li.appendChild(p);
                li.appendChild(small);
                listFragment.appendChild(li);
            }
        }

        list.appendChild(listFragment);

        if (swatches['DarkVibrant']) {
            section.style.backgroundColor = swatches['DarkVibrant'].getHex();
        }
    }
}());