window.addEventListener('DOMContentLoaded', function() {
    class ProductCustom extends HTMLElement {
        constructor() {
            super();
            // Gather all templates and upsell template content
            this.templates = document.querySelectorAll('template');
            this.clonedDOMs = Array.from(this.templates).map(template => document.importNode(template.content, true));
            this.upsellTemplate = document.querySelector('.upsell-template');
            this.upsellTemplateContent = this.upsellTemplate.content;
            this.upsellAdded = false; // Track if upsell elements have been added
        }

        connectedCallback() {
            // Append the main template and initialize buttons and Swiper
            if (this.clonedDOMs.length > 0) {
                this.appendChild(this.clonedDOMs[0].cloneNode(true));
                this.initializeUpsellButtons();
                this.initializeSwiper();
            }
            this.initializeProductButtons();
        }

        initializeProductButtons() {
            // Toggle product buttons and update content based on selection
            const btns = document.querySelectorAll('.btn-product');
            const btnYes = document.getElementById('btn_yes');
            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    btns.forEach(el => el.classList.remove('active'));
                    btn.classList.add('active');

                    // Update sliders and text content for the selected product
                    const ctnSlider = this.querySelector('.ctn-slider');
                    const changingTxts = this.querySelectorAll('.product-txt');
                    const newSliderContent = this.clonedDOMs[index].querySelector('.ctn-slider').cloneNode(true);
                    const newTxtContents = this.clonedDOMs[index].querySelectorAll('.product-txt');
                    
                    ctnSlider.replaceWith(newSliderContent);
                    changingTxts.forEach((txt, i) => txt.replaceWith(newTxtContents[i].cloneNode(true)));

                    this.upsellAdded = false;
                    this.initializeSwiper();

                    if (btnYes.classList.contains('active')) {
                        this.showUpsellItems();
                    }
                });
            });
        }

        initializeUpsellButtons() {
            // Toggle upsell buttons y maneja la visualización de los elementos de upsell
            const btnUpsell = document.querySelectorAll('.btn-upsell');
            const btnYes = document.getElementById('btn_yes');
            const btnNo = document.getElementById('btn_no');
        
            btnUpsell.forEach(btn => {
                btn.addEventListener('click', () => {
                    btnUpsell.forEach(el => el.classList.remove('active'));
                    btn.classList.add('active');
        
                    if (btnYes.classList.contains('active')) {
                        this.showUpsellItems();
                    } else {
                        this.hideUpsellItems();
                    }
                });
            });
        }

        showUpsellItems() {
            const infoUpsell = document.querySelectorAll('.upsell-info');
            const formUpsell = document.querySelectorAll('.upsell-form');


            // Show upsell items if not already added
            if (!this.upsellAdded) {
                this.addUpsellItemsToSliders('.main-slider-img', '.upsell-item-main');
                this.addUpsellItemsToSliders('.mini-slider-img', '.upsell-item-mini');
                this.upsellAdded = true;
            }

            // Hide main product price when upsell is active
            formUpsell.forEach(form => form.classList.add('active'));
            infoUpsell.forEach(info => info.classList.add('active'));
            document.querySelectorAll('.ctn-form').forEach(form => form.style.display = 'none');
            document.querySelectorAll('.current-price').forEach(price => price.style.display = 'none');
            this.initializeSwiper();
        }

        hideUpsellItems() {
            const infoUpsell = document.querySelectorAll('.upsell-info');
            const formUpsell = document.querySelectorAll('.upsell-form');

            // Remove upsell items and show main product price
            formUpsell.forEach(form => form.classList.remove('active'));
            infoUpsell.forEach(info => info.classList.remove('active'));
            this.removeUpsellItemsFromSliders('.main-slider-img', 'upsell-item-main');
            this.removeUpsellItemsFromSliders('.mini-slider-img', 'upsell-item-mini');
            document.querySelectorAll('.ctn-form').forEach(form => form.style.display = 'block');
            document.querySelectorAll('.current-price').forEach(price => price.style.display = 'block');
            this.upsellAdded = false;
            this.initializeSwiper();
        }

        addUpsellItemsToSliders(sliderClass, upsellClass) {
            // Clone and prepend upsell items to the specified slider
            const upsellItems = this.upsellTemplateContent.querySelectorAll(upsellClass);
            const sliders = document.querySelectorAll(sliderClass);

            for (let i = upsellItems.length - 1; i >= 0; i--) {
                sliders.forEach(slider => {
                    slider.insertBefore(upsellItems[i].cloneNode(true), slider.firstChild);
                });
            }
        }

        removeUpsellItemsFromSliders(sliderClass, upsellClass) {
            // Remove upsell items from the specified slider
            const sliders = document.querySelectorAll(sliderClass);
            sliders.forEach(slider => {
                Array.from(slider.children).forEach(child => {
                    if (child.classList.contains(upsellClass)) {
                        slider.removeChild(child);
                    }
                });
            });
        }

       initializeSwiper() {
            if (this.mainSwiper) {
                this.mainSwiper.destroy(true, true);
            }
            if (this.thumbnailSwiper) {
                this.thumbnailSwiper.destroy(true, true);
            }

            // Re-initialize Swiper instances
            this.thumbnailSwiper = new Swiper(".mySwiper", {
                spaceBetween: 10,
                slidesPerView: 6,
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
            
            this.mainSwiper = new Swiper(".mySwiper2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: this.thumbnailSwiper,
                },
            });
        }
    }

    customElements.define('product-custom', ProductCustom);     
});
