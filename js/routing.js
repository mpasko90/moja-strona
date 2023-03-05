const urlPageTitle = "Tworzenie stron internetowych i pogotowie komputerowe we Wrocławiu";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
});

// create an object that maps the url to the template, title, and description
const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + urlPageTitle,
        description: "Podana strona nie została odnaleziona",
    },
    "/": {
        template: "/templates/main.html",
        title: urlPageTitle,
        description: "Szukasz profesjonalnej firmy zajmującej się tworzeniem stron internetowych i pomocą komputerową we Wrocławiu? Zapoznaj się z naszym portfolio i skontaktuj się z nami!",
    },
    "/tworzenie-stron-internetowych": {
        template: "/templates/tworzenie-stron-internetowych.html",
        title: "Tworzenie stron internetowych we Wrocławiu - profesjonalne usługi.",
        description: "Oferujemy tworzenie stron internetowych we Wrocławiu na najwyższym poziomie. Zaprojektujemy dla Ciebie nowoczesną, responsywną i funkcjonalną stronę internetową.",
    },
    "/pogotowie-komputerowe": {
        template: "/templates/pogotowie-komputerowe.html",
        title: "Pogotowie komputerowe we Wrocławiu - szybka pomoc",
        description: "Masz problem z komputerem? Nie martw się! Nasze pogotowie komputerowe we Wrocławiu przyjedzie do Ciebie i naprawi usterkę. Zadzwoń teraz!",
    },
    "/kontakt": {
        template: "/templates/kontakt.html",
        title: "Kontakt | " + urlPageTitle,
        description: "Chcesz skorzystać z naszych usług lub masz pytania? Skontaktuj się z nami telefonicznie lub mailowo. Odpowiemy na wszystkie Twoje pytania.",
    },
    "/polityka-prywatnosci": {
        template: "/templates/polityka-prywatnosci.html",
        title: "Polityka prywatności | " + urlPageTitle,
        description: "Zapoznaj się z naszą polityką prywatności i dowiedz się jak chronimy Twoje dane osobowe. Sprawdź jakie masz prawa w związku z korzystaniem z naszej strony internetowej i naszych usług: pogotowie komputerowe i tworzenie stron internetowych we Wrocławiu.",
    },
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the urlRoutes object
    const route = urlRoutes[location] || urlRoutes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};
// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();