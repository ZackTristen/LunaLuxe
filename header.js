function setupFullWidthDropdown(svg, dropdownSelector, navLinkSelector) {
  const navLink = document.querySelector(`.${navLinkSelector}`);
  const dropdown = document.querySelector(`.${dropdownSelector}`);
  const svgItem = document.querySelector(`.${svg}`);
  let navLinks = document.querySelectorAll(".nav-link");

  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  function setupEventListeners(isTouch) {
    navLink.removeEventListener("click", clickHandler);
    navLink.removeEventListener("mouseover", mouseoverHandler);
    navLink.removeEventListener("mouseout", mouseoutHandler);

    if (isTouch) {
      navLink.addEventListener("click", clickHandler);
    } else {
      navLink.addEventListener("mouseover", mouseoverHandler);
      navLink.addEventListener("mouseout", mouseoutHandler);
    }
  }

  const clickHandler = (event) => {
    navLinks.forEach((link) => {
      if (
        link.classList.contains("active") &&
        link.classList !== navLink.classList
      ) {
        link.classList.remove("active");
        link.firstElementChild.lastElementChild.classList.remove("active");
        link.lastElementChild.classList.remove("active");
        navLink.classList.toggle("active");
        dropdown.classList.toggle("active");
        svgItem.classList.toggle("active");
      } else {
        navLink.classList.toggle("active");
        dropdown.classList.toggle("active");
        svgItem.classList.toggle("active");
      }
    });
  };

  const mouseoverHandler = () => {
    navLink.classList.add("active");
    dropdown.classList.add("active");
    svgItem.classList.add("active");
  };

  const mouseoutHandler = () => {
    navLink.classList.remove("active");
    dropdown.classList.remove("active");
    svgItem.classList.remove("active");
  };

  setupEventListeners(isTouchDevice());

  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", (event) => {
    console.log("Тип устройства изменился!");
    setupEventListeners(event.matches);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-1", "submenu-1", "nav-link-1");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-2", "submenu-2", "nav-link-2");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-3", "submenu-3", "nav-link-3");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-4", "submenu-4", "nav-link-4");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-5", "submenu-5", "nav-link-5");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-6", "submenu-6", "nav-link-6");
});
document.addEventListener("DOMContentLoaded", () => {
  setupFullWidthDropdown("arrow-svg-7", "submenu-7", "nav-link-7");
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.getElementById("burger-button");
  const offcanvasElement = document.getElementById("offcanvasExample");
  const burgerIcon = burgerButton.querySelector(".burger-icon");

  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

  burgerButton.addEventListener("click", function () {
    if (offcanvasElement.classList.contains("show")) {
      offcanvas.hide();
      burgerIcon.classList.remove("open");
      burgerButton.setAttribute("aria-expanded", "false");
    } else {
      offcanvas.show();
      burgerIcon.classList.add("open");
      burgerButton.setAttribute("aria-expanded", "true");
    }
  });

  offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
    burgerIcon.classList.remove("open");
    burgerButton.setAttribute("aria-expanded", "false");
  });
});

