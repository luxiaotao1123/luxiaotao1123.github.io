// https://www.bilibili.com/video/BV1KL4y1c7FQ?spm_id_from=333.337.search-card.all.click

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER POPULAR ===============*/
let swiperPopular = new Swiper(".popular__container", {
    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    loop: false,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== SWEET ALERT 2 ===============*/
const popularCards = document.querySelectorAll('.popular__card');

popularCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const type = card.dataset.type;
        const mediaSrc = card.dataset.media;

        if (type === 'video') {
            const htmlContent = `
            <h2 style="margin-bottom: 0.5rem;">Hello</h2>
            <p style="margin-bottom: 1rem;">Description</p>
            <video id="plyr-video-${index}" playsinline controls style="width:100%; height:auto;">
                <source src="${mediaSrc}" type="video/mp4">
                Your browser does not support the HTML5 video tag.
            </video>   
        `;
            Swal.fire({
                title: 'media',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                },
                html: htmlContent,
                showConfirmButton: false,
                scrollbarPadding: false,
                width: '60rem',
                didOpen: () => {
                    const player = new Plyr(`#plyr-video-${index}`, {
                        volume: 0.5
                    });
                }
            });
        } else if (type === 'image') {
            const imagePaths = mediaSrc.split(',');

            let slidesHtml = '';
            imagePaths.forEach((imgSrc) => {
                slidesHtml += `
                  <div class="swiper-slide">
                    <img src="${imgSrc.trim()}" alt="Image Slide" style="width:100%; height:auto;">
                  </div>
                `;
            });

            const htmlContent = `
                <h2 style="margin-bottom: 0.5rem;">Image Gallery</h2>
                <p style="margin-bottom: 1rem;">Description for images</p>
                
                <div class="swiper mySwiper" style="width:100%;height:auto;">
                <div class="swiper-wrapper">
                    ${slidesHtml}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next" style="color: #333; z-index: 99;"></div>
                <div class="swiper-button-prev" style="color: #333; z-index: 99;"></div>
                </div>
            `;
            Swal.fire({
                title: 'Images',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                },
                html: htmlContent,
                showConfirmButton: false,
                scrollbarPadding: false,
                width: '60rem',
                didOpen: () => {
                    // 在弹窗内容插入到 DOM 后初始化内部 Swiper
                    new Swiper('.mySwiper', {
                        loop: true,
                        spaceBetween: 10,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'No media found',
                text: 'This card does not have video or images.'
            });
        }

    });
})

/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.value__accordion-item')

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.value__accordion-header')

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if (openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) => {
    const accordionContent = item.querySelector('.value__accordion-content')

    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal('.home__title, .popular__container, subscribe__container, .footer__container')
sr.reveal('.home__description, .footer__info', { delay: 500 })
sr.reveal('.home__search', { delay: 600 })
sr.reveal('.home__value', { delay: 700 })
sr.reveal('.home__images', { delay: 800, origin: 'bottom' })
sr.reveal('.logos__img', { interval: 100 })
sr.reveal('.value__images, .contact__content', { origin: 'left' })
sr.reveal('.value__content, .contact__images', { origin: 'right' })
