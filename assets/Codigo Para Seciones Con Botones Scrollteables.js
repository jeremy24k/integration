document.addEventListener('DOMContentLoaded', function() {
    let tab = document.getElementById('section-tabs');
    let tabPosition = tab.getBoundingClientRect().top + window.scrollY;
    let sections = document.querySelectorAll(".cls-stn-tabs");
    let tabLink = document.querySelectorAll(".tab-link");

    window.addEventListener("scroll", () => {
        let currentScrollY = window.scrollY;
        let windowHeight = window.innerHeight;

        if (currentScrollY > tabPosition) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }

        sections.forEach((section, index) => {
            let sectionTop = section.getBoundingClientRect().top + window.scrollY;

            if ((currentScrollY + windowHeight/2 >= sectionTop) && (currentScrollY + windowHeight/2 <= sectionTop + section.getBoundingClientRect().height)) {
                tabLink.forEach(element => {
                    element.classList.remove("active");
                });
                tabLink[index].classList.add("active");
            }
        });
    });
});