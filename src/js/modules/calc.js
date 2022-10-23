const { result } = require("lodash"); 

function myCalc() {

    
  

    const result = document.querySelector('.calculating__result span');
        let sex, hair, age, weight, ratio;


    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    }else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    function calc() {


        if(!sex || !hair || !age || !weight || !ratio) {
            result.textContent = '_____'
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((33 * hair) + (80 * age) - (8 * weight)* ratio);
        }else {
            result.textContent = Math.round((25 * hair) + (60 * age) - (6 * weight)* ratio);
        }
    }

    calc();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(function(elem) {
            elem.addEventListener('click', function(e) {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'))
                    console.log(e.target.getAttribute('data-ratio'));
                }else {
                    sex = e.target.getAttribute('id');
                    console.log(e.target.getAttribute('id'));
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(function(elem) {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calc();
            })
        })
    };

    getStaticInfo('.calculating__box button', 'calculating__activeclass');
    getStaticInfo('.calculating__type button', 'calculating__activeclass');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', function() {
            /* if(input.value.match(/\D/g)) {
                console.log('error');
            } */
            switch (input.getAttribute('id')) {

            
                case "hair" :
                    hair = +input.value;
                    break;
                case "age" :
                    age = +input.value;
                    break;
                case "weight" :
                    weight = +input.value;
                    break;
            };
            calc();
        })
    }

    getDynamicInfo('#hair');
    getDynamicInfo('#age');
    getDynamicInfo('#weight');

    function localStorageInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(function(elem) {
           elem.classList.remove(activeClass);

           if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
           }

           if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
           }
        })
    }

    localStorageInfo('.calculating__box button', 'calculating__activeclass');
    localStorageInfo('.calculating__type button','calculating__activeclass');


}

export default myCalc;