import Page from "../page";

class GoogleHomePage extends Page {

    navgateTo(url) {
        super.open(url);
    }

    getPageTitle() {
        return super.getPageTitle();
    }

}

export default new GoogleHomePage();