/* =========================================================
   nav.js
   Adds mobile navigation behavior (hamburger toggle +
   tap-to-open submenus) to every <nav> on the page.
   Works alongside the existing hover-based desktop dropdowns
   defined in each page's CSS; no markup changes required.
   ========================================================= */
(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        document.querySelectorAll('nav').forEach(function (nav) {
            var ul = nav.querySelector('ul');
            if (!ul) return;

            // --- Hamburger toggle button ---
            var toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'nav-toggle';
            toggle.setAttribute('aria-label', 'Toggle navigation menu');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<span></span><span></span><span></span>';
            nav.appendChild(toggle);

            function closeMenu() {
                ul.classList.remove('nav-open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-lock');
                ul.querySelectorAll('li.submenu-open').forEach(function (li) {
                    li.classList.remove('submenu-open');
                });
            }

            toggle.addEventListener('click', function () {
                var isOpen = ul.classList.toggle('nav-open');
                toggle.classList.toggle('active', isOpen);
                toggle.setAttribute('aria-expanded', String(isOpen));
                document.body.classList.toggle('nav-lock', isOpen);
            });

            // --- Submenu carets for About / Committees ---
            var dropdowns = ul.querySelectorAll('li.aboutdrop, li.committeedrop');
            dropdowns.forEach(function (li) {
                var caret = document.createElement('button');
                caret.type = 'button';
                caret.className = 'dropdown-caret';
                caret.setAttribute('aria-label', 'Toggle submenu');
                caret.innerHTML = '<i class="fas fa-chevron-down"></i>';
                li.appendChild(caret);

                caret.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    li.classList.toggle('submenu-open');
                });
            });

            // --- Close mobile menu after choosing a link ---
            ul.querySelectorAll('a').forEach(function (a) {
                a.addEventListener('click', function () {
                    closeMenu();
                });
            });

            // --- Reset state if the viewport grows back to desktop ---
            window.addEventListener('resize', function () {
                if (window.innerWidth > 900) closeMenu();
            });
        });
    });
})();
