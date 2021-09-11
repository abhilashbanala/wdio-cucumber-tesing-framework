const { Given } = require('@cucumber/cucumber');
import commonPage from '../../pageobjects/common/common-page';

Given(/^The user navigates to the Google Home page$/, function () {
  commonPage.navgateTo(browser.config.vars.baseUrl);
});
