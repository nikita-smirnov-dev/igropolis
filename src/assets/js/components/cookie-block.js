import Cookies from "js-cookie";

const initCookieConsent = () => {
  const COOKIE_NAME = "site_cookie_accepted";
  const cookieBlock = document.querySelector("[data-cookie-block]");
  const acceptBtn = document.querySelector("[data-cookie-accept]");

  if (!cookieBlock || !acceptBtn) return;

  if (!Cookies.get(COOKIE_NAME)) {
    setTimeout(() => {
      cookieBlock.classList.add("cookie--visible");
    }, 2000);
  }

  acceptBtn.addEventListener("click", () => {
    Cookies.set(COOKIE_NAME, "true", { expires: 31 });
    cookieBlock.classList.remove("cookie--visible");
  });
};

initCookieConsent();
