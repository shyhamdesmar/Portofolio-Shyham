/*==================== MENU SHOW / HIDE ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*==================== SKILLS ACCORDION ====================*/
const skillsContent = document.querySelectorAll('.skills__content');

skillsContent.forEach(item => {
    const header = item.querySelector('.skills__header');
    header.addEventListener('click', () => {
        skillsContent.forEach(other => {
            if (other !== item) {
                other.classList.remove('skills__open');
                other.classList.add('skills__close');
            }
        });
        item.classList.toggle('skills__open');
        item.classList.toggle('skills__close');
    });
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('qualification__active'));
        tab.classList.add('qualification__active');

        tabContents.forEach(c => c.classList.remove('qualification__active'));
        const target = document.querySelector(tab.dataset.target);
        target?.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalButtons = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');
const modalViews = document.querySelectorAll('.services__modal');

modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.modal;
        document.querySelector(`[data-modal-view="${id}"]`)?.classList.add('active-modal');
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modalViews.forEach(view => view.classList.remove('active-modal'));
    });
});

modalViews.forEach(view => {
    view.addEventListener('click', (e) => {
        if (e.target === view) view.classList.remove('active-modal');
    });
});

/*==================== HEADER SCROLL STYLE ====================*/
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SCROLL UP BUTTON ====================*/
const scrollUpBtn = document.getElementById('scroll-up');

function toggleScrollUp() {
    if (window.scrollY >= 400) {
        scrollUpBtn.classList.add('show-scroll');
    } else {
        scrollUpBtn.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', toggleScrollUp);

/*==================== SCROLL REVEAL (fade in/out per section) ====================*/
/* Progressive enhancement: classes are only added here, so if JS ever
   fails to load, every section stays fully visible by default. */
const revealItems = document.querySelectorAll('[data-reveal], [data-reveal-fade]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealItems.length && !prefersReducedMotion) {
    revealItems.forEach((el, i) => {
        el.classList.add(el.hasAttribute('data-reveal-fade') ? 'reveal-fade' : 'reveal');

        // Optional stagger: data-reveal-delay="0,1,2..." -> small incremental delay
        const step = el.dataset.revealDelay;
        if (step !== undefined) {
            el.style.setProperty('--reveal-delay', `${Math.min(step * 0.12, 0.4)}s`);
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggling on every crossing (not just once) makes content
            // fade back out when scrolling up past it, and fade back in
            // when it's scrolled down into view again.
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach(el => revealObserver.observe(el));
}

/*==================== ACTIVE LINK ON SCROLL ====================*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 90;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);
