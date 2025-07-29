"use strict";

window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax_container');
        const clouds = document.querySelector('.images-parallax_clouds');
        const mountains = document.querySelector('.images-parallax_mountains');
        const human = document.querySelector('.images-parallax_human');

        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        const speed = 0.05;

        let positionX = 0, 
            positionY = 0;
        let coordXPercent = 0, 
            coordYPercent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXPercent - positionX;
            const distY = coordYPercent - positionY;

            positionX += (distX * speed);
            positionY += (distY * speed);

            clouds.style.transform = `translate(${positionX / forClouds}%, ${positionY / forClouds}%)`;
            mountains.style.transform = `translate(${positionX / forMountains}%, ${positionY / forMountains}%)`;
            human.style.transform = `translate(${positionX / forHuman}%, ${positionY / forHuman}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function (e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXPercent = coordX / parallaxWidth * 100;
            coordYPercent = coordY / parallaxHeight * 100;

            content.style.transform = `translate(${coordXPercent / 10}%, ${coordYPercent / 10}%)`;
        }); 

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i+= 0.005) {
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observe = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });
        observe.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `translate(0%, -${scrollTopProcent / 9}%)`;
            mountains.parentElement.style.cssText = `translate(0%, -${scrollTopProcent / 6}%)`;
            human.parentElement.style.cssText = `translate(0%, -${scrollTopProcent / 3}%)`;
        }

    }
}



