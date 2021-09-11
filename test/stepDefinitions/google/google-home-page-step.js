const { Given } = require('@cucumber/cucumber');
const { expect } = require('chai');
import googlePage from '../../pageobjects/google/google-home-page';

Given(/^The user navigates to the Google Home page$/, function () {
  googlePage.navgateTo(browser.config.vars.baseUrl);
});

Given(/^The page title should be equal to "([^"]*)"$/, function (expectedTitle) {
  expect(expectedTitle).to.equal(googlePage.getPageTitle());
});
