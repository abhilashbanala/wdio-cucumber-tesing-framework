### WebdriverIO-v7 boilerplate code with Cucumber BDD

This repository contains a collection of sample webdriverIO-v7 (Selenium - Node.js/JavaScript) projects and libraries that demonstrate how to use the tool and develop automation script using the Cucumber (v7.x) BDD framework. It uses the `chromedriver` NPM package that wraps the ChromeDriver for you. This service does not require a Selenium server, but uses ChromeDriver to communicate with the browser directly.

It support ES5 to ES8 (via babel-register). It generate Spec, JUNIT, Allure, JSON reporters as well.

### Installation

This project is tested on **Node v14.0.0** and above.  While earlier versions of node may be compatible, but they have not been verified.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. To take full advantage of the command line you will need to make sure that you have added `node_modules/.bin` to your `$PATH`.

`JDK 1.8:` It is optional, install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` on your local environment nothing else.

### Selenium, Appium

To run your test you must have selenium / Appium server up and running to execute any webdriverIO tests, or it will fail fast with an error. To start selenium automatically it has been added as part of `services: ['chromedriver']` and `services: ['appium']` in the *.conf.js.  That's all there is to it.!.

### Run Some Sample Tests

To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: `npm run local`. You can also run in SauceLabs, BrowserStack and LambdaTest using `npm run sauce`, `npm run browserstack`. `npm run lambdatest`

To execute tests on `mobile device` use : `npm run mobile`.

Note: Before running mobile tests, perform the prequisite Appium setup. Refer [Appium Docs](http://appium.io/getting-started.html?lang=en)

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `/test/config/` directory and all end with `*.conf.js`.  These can be called via the the cli.

### SauceLabs/BrowserStack/LambdaTest Integration

`SauceLabs` , `BrowserStack` and `LambdaTest` specific code has been added in the `wdio.sauce.conf.js` ,  `wdio.browserstack.conf.js` and `wdio.lambdatest.conf.js` under the /test/config folder. You just need to provide your SauceLabs/BrowserStack credentials in the config file. To run test on SauceLabs, execute command `npm run sauce` , for BrowserStack `npm run browserstack` and for LambdaTest `npm run lambdatest`

### Logs  

Complete set of execution `logs` will be generated during the run time and can be found in the parent folder location /logs.

### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.  


##### Spec

Test reporter, that prints detailed results to console.

##### Allure

The Allure Reporter creates [Allure](http://allure.qatools.ru/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.

To generate and view an allure report locally, run `npm run allure-report`. A typical Allure report will look like this

![ScreenShot](https://github.com/allure-framework/allure2/blob/master/.github/readme-img.png)

##### junit/xunit

The JUnit reporter helps you to create xml reports for your CI server. Add it to the reports array in the config file and define the directory where the xml files should get stored. webdriverIO will create an xml file for each instance under test and the filename will contain the browser and OS.

To generate and view an junit/xunit report locally, run `npm run junit-report`. A typical junit/xunit report will look like this

![ScreenShot](https://github.com/amiya-pattnaik/snapshots/blob/master/junit-result.png)

##### JSON

The JSON reporter is especially versatile. Since it produces a literal in a key : value pair, help to read, translate execution results to any custom reporter / it can be used to transport reporter events to another process and format them there, or to store the execution results back to any standard RDBMS or to NoSQL like mongodb with very minimal effort.

### Develop automation scripts (for both desktop browser and mobile browser / app)

You can write test by using Cucumber BDD framework. You can choose javascript based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

Refer complete [WebdriverIO v7 API](https://webdriver.io/docs/api.html) methods to write your automation tests.


### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions in cucumber, we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When a test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. A typical page class using ES6 syntax will look similar to this:

💡 If you want to use ES5 syntax, refer to the sample.page.js under util-examples.

```
class LoginPage extends Page {

    /**
    * define elements
    */

    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }
    get headerImage()     { return $('//img[@alt=\"Login\"]'); }

    /**
     * define or overwrite page methods
     */
    open () {
        super.open('login')       //this will append `login` to the baseUrl to form complete URL
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */

    login (username, password) {
      this.usernameInput.setValue(username);
      this.passwordInput.setValue(password);
      this.loginButton.click();
    }
}

export default new LoginPage()

```
### Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

### Licensing

MIT