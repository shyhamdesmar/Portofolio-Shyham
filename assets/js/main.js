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
        const alreadyOpen = item.classList.contains('skills__open');
        skillsContent.forEach(other => other.classList.remove('skills__open'));
        if (!alreadyOpen) item.classList.add('skills__open');
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalViews.forEach(view => view.classList.remove('active-modal'));
    }
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
scrollHeader();

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
toggleScrollUp();

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

/*==================== TOAST NOTIFICATIONS ====================*/
let toastStack = document.getElementById('toast-stack');

if (!toastStack) {
    toastStack = document.createElement('div');
    toastStack.className = 'toast-stack';
    toastStack.id = 'toast-stack';
    toastStack.setAttribute('aria-live', 'polite');
    toastStack.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastStack);
}

function showToast({ type = 'success', title, message, duration = 4000 }) {
    const toast = document.createElement('div');
    toast.className = `toast${type === 'error' ? ' toast--error' : ''}`;
    toast.innerHTML = `
        <i class="uil ${type === 'error' ? 'uil-exclamation-triangle' : 'uil-check-circle'} toast__icon"></i>
        <div class="toast__body">
            <p class="toast__title">${title}</p>
            <p class="toast__message">${message}</p>
        </div>
        <i class="uil uil-times toast__close"></i>
    `;

    toastStack.appendChild(toast);

    // Trigger the slide/fade-in on the next frame so the initial state paints first.
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast--show')));

    let hideTimer;
    const dismiss = () => {
        clearTimeout(hideTimer);
        toast.classList.remove('toast--show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };

    hideTimer = setTimeout(dismiss, duration);
    toast.querySelector('.toast__close').addEventListener('click', dismiss);
}

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showToast({
            type: 'error',
            title: 'Belum lengkap',
            message: 'Mohon isi nama, email, dan pesan sebelum mengirim.'
        });
        return;
    }

    showToast({
        type: 'success',
        title: 'Pesan terkirim',
        message: 'Terima kasih! Saya akan membalas secepatnya.'
    });

    contactForm.reset();
});

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
scrollActive();
