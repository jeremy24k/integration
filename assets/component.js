class ProductCustom extends HTMLElement {
    constructor() {
        super();

        this.template = document.querySelectorAll('template');
        this.clonedDOM = [];

        console.log(this.template);
        
    }

    connectedCallback() {
       let btn = document.querySelectorAll('.cambiar-producto');

       btn.forEach((btnElement, index) => {
            btnElement.addEventListener('click', () => {
                if (!btnElement.classList.contains('active')) {
                    btn.forEach((btnElement) => {
                        btnElement.classList.remove('active');
                    });
    
                    btnElement.classList.add('active');
    
                    this.innerHTML = '';

                    this.appendChild(this.clonedDOM[index].cloneNode(true));
                }
            });
       });

        this.template.forEach((item) => {
            this.clonedDOM.push(document.importNode(item.content, true));
        });

        if (this.clonedDOM.length > 0) {
            this.appendChild(this.clonedDOM[0].cloneNode(true));
        }

        console.log(this.clonedDOM);
        
        
    }

}

customElements.define('product-custom', ProductCustom);
