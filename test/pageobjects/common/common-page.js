import Page from "../page";

class CommonPage extends Page {

    getPageTitle() {
        return super.getPageTitle();
    }

    navgateTo(url) {
        super.open(url);
    }

}

export default new CommonPage();