window.addEventListener('DOMContentLoaded', function() {
    class ProductCustom extends HTMLElement {
        constructor() {
            super();
            
            this.main_template = document.querySelector('template.main-template');
            this.templates = document.querySelectorAll('template');
            this.clonedDOMs = [];
            this.currentDOM = this.main_template.content.cloneNode(true);
    
            console.log(this.templates);
            
            this.templates.forEach((template) => {
                this.clonedDOMs.push(document.importNode(template.content, true));
            });
        }
    
        connectedCallback() {
            // Append the main_template content by default
            if (this.currentDOM) {
                this.appendChild(this.currentDOM);
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
                spaceBetween: 10,
                slidesPerView: 6,
                freeMode: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
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
