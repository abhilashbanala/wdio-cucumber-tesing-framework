const { Given } = require('@cucumber/cucumber');
const { expect } = require('chai');
import commonPage from '../../pageobjects/common/common-page';

Given(/^The page title should be equal to "([^"]*)"$/, function (expectedTitle) {
  expect(expectedTitle).to.equal(commonPage.getPageTitle());
});
