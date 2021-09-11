
class Page {
  constructor() {
    this.timeout = {
      s: 1000,
      m: 5000,
      l: 20000,
      xl: 40000
    }
  }

  open(path) {
    browser.url(path)
  }

  getPageTitle() {
    this.waitForPageLoadComplete();
    return browser.getTitle();
  }

  waitForPageLoadComplete() {
    browser.waitUntil(function () {
      const state = browser.execute(function () {
        return document.readyState;
      });
      return state === 'complete';
    },
      {
        timeout: this.timeout.xl,
        timeoutMsg: 'Something went wrong waiting for the page to load'
      });
  }

  sendText(element, text) {
    this.waitForPageLoadComplete();
    element.scrollIntoView();
    this.waitForElementClickable(element)
    element.clear();
    this.waitForElementClickable(element)
    element.setValue(text);
  }

  click(element) {
    this.waitForPageLoadComplete();
    element.scrollIntoView();
    this.waitForElementClickable(element)
    element.click();
  }

  doubleClick(element) {
    this.waitForPageLoadComplete();
    element.scrollIntoView();
    this.waitForElementClickable(element)
    element.doubleClick();
  }

  async waitForElementClickable(element) {
    await element.waitForClickable({ timeout: this.timeout.m })
  }

  async waitForElementDisplayed() {
    await element.waitForDisplayed({ timeout: this.timeout.m })
  }

  async waitForElementHidden() {
    await element.waitForDisplayed({ timeout: this.timeout.m, reverse: true })
  }

  async waitForElementEnabled() {
    await element.waitForEnabled({ timeout: this.timeout.m })
  }

  async waitForElementDisabled() {
    await element.waitForEnabled({ timeout: this.timeout.m, reverse: true })
  }
}

module.exports = Page;
