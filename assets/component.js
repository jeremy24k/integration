window.addEventListener('DOMContentLoaded', function() {
    class ProductCustom extends HTMLElement {
        constructor() {
            super();
    
            this.templates = document.querySelectorAll('template');
            this.clonedDOMs = [];
    
            console.log(this.templates);
            
            this.templates.forEach((template) => {
                this.clonedDOMs.push(document.importNode(template.content, true));
            });
        }
    
        connectedCallback() {
            if (this.clonedDOMs.length > 0) {
                this.appendChild(this.clonedDOMs[0].cloneNode(true));
                this.initializeSwiper();
            }
    
            this.initializeButtons();
        }
    
        initializeButtons() {
            let btns = document.querySelectorAll('.btn-product');
            console.log(btns);
    
            btns.forEach((btnElement, index) => {
                btnElement.addEventListener('click', () => {

                    btns.forEach((el) => el.classList.remove('active'));
                    btnElement.classList.add('active');
    
                    const ctnSlider = this.querySelector('.ctn-slider');
                    const changingTxts = this.querySelectorAll('.product-txt');

                    ctnSlider.innerHTML = '';
                    changingTxts.forEach(changingTxt => changingTxt.innerHTML = '');
                    
                    const newSliderContent = this.clonedDOMs[index].querySelector('.ctn-slider').cloneNode(true);
                    const newTxtContents = this.clonedDOMs[index].querySelectorAll('.product-txt');

                    ctnSlider.replaceWith(newSliderContent);

                    changingTxts.forEach((changingTxt, i) => {
                        changingTxt.replaceWith(newTxtContents[i].cloneNode(true));
                    });
    
                    this.initializeSwiper();
                });
            });
        }
    
        initializeSwiper() {
            var swiper = new Swiper(".mySwiper", {
           
                freeMode: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    375: {
                        slidesPerView: 4,
                    },
                    561: {
                        slidesPerView: 6,
                    },
                    769: {
                      slidesPerView: 4,
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 6,
                    },
                },
            });
            var swiper2 = new Swiper(".mySwiper2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
            });
        }
    }
    
    customElements.define('product-custom', ProductCustom);
});