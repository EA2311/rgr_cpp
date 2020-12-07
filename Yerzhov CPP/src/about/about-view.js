import {EventEmitter} from '../evente-emitter';

export class AboutView extends EventEmitter {
    constructor() {
        super();
    }

    showAboutPage(aboutData) {
        const page = document.querySelector('.about-container');
        const aboutText = document.querySelector('.aboutText');
        const aboutText1 = document.querySelector('.aboutText1');
        const aboutText2 = document.querySelector('.aboutText2');
        const aboutText3 = document.querySelector('.aboutText3');
        const aboutText4 = document.querySelector('.aboutText4');
        const aboutText5 = document.querySelector('.aboutText5');
        aboutText.innerHTML = aboutData[0].text;
        aboutText1.innerHTML = aboutData[0].text1;
        aboutText2.innerHTML = aboutData[0].text2;
        aboutText3.innerHTML = aboutData[0].text3;
        aboutText4.innerHTML = aboutData[0].text4;
        aboutText5.innerHTML = aboutData[0].text5;

        document.querySelector('#spinnerMain').classList.add('hider');
        page.classList.remove('hider');
    }

}
