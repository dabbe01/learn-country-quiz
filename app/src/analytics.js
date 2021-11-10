import { Cookies } from "react-cookie-consent";
import { getAnalytics, logEvent } from "@firebase/analytics";

(() => {
    if (!localStorage.getItem('consent')) {
        const data = { consent: false, required: true };
        localStorage.setItem('consent', JSON.stringify(data));
    }
})();

export const initGA = (app) => {
    return getAnalytics(app);
};

export const handleAcceptCookie = () => {
    const data = { consent: true, required: true };
    localStorage.setItem('consent', JSON.stringify(data));
};

export const handleDeclineCookie = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
};