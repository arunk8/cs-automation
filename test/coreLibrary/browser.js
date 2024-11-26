// //import { WebDriver, Builder } from 'selenium-webdriver';
// //import * as chrome from 'selenium-webdriver/chrome';
// //import * as ie from 'selenium-webdriver/ie';
// //import * as firefox from 'selenium-webdriver/firefox';
// //import * as edge from 'selenium-webdriver/edge';

// const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
// var WebDriver = require("selenium-webdriver");
// var Builder = require("selenium-webdriver").Builder;
// var chrome = require("selenium-webdriver/chrome");
// var ie = require("selenium-webdriver/ie");
// var firefox = require("selenium-webdriver/firefox");
// var edge = require("selenium-webdriver/edge");

// var fs = require('fs');
// var path = require('path');
// const args = require('yargs').argv;
// const childProcess = require("child_process");

// var {utils} = require('./utils');
// var {webActionsAPI} = require('./webActionsAPI');
// var {logger} = require('./logger');
// var envData = require('../environmentConfig.json');

// class browser {

//     utils = new utils();
//     app = new webActionsAPI();
//     log = new logger();
//     downloadPath = "";
//     initialFileCount = 0;

//     async getBrowser(browserType,debugPort) {
//         let driver = null;
//         //this.downloadPath = path.join(__dirname, '..', '..', 'reports', 'downloads');
//         this.downloadPath = path.join(process.cwd(), 'reports', 'downloads');
//         if (fs.existsSync(this.downloadPath)) {
//             await this.log.info("Downloads folder is available");
//         }
//         else {
//             fs.mkdirSync(this.downloadPath);
//             await this.log.info("Created a folder");
//         }
//         const initialfiles = await fs.readdirSync(this.downloadPath);
//         this.initialFileCount = initialfiles.length;

//         if (browserType.toUpperCase() == "FF" || browserType.toUpperCase() == "FIREFOX") {
//             driver = await this.launchFF();
//         }
//         else if (browserType.toUpperCase() == "CR" || browserType.toUpperCase() == "CHROME" || browserType.toUpperCase() == "CH") {
//             driver = await this.launchChrome();
//         }
//         else if (browserType.toUpperCase() == "IE" || browserType.toUpperCase() == "INTERNET EXPLORER") {
//             driver = await this.launchIE();
//         }
//         else if (browserType.toUpperCase() == "EC" || browserType.toUpperCase() == "MICROSOFT EDGE" || browserType.toUpperCase() == "EDGE") {
//             driver = await this.launchEC();
//         }
//         else if (browserType.toUpperCase() == "DISPLAY_ELECTRON") {
//             driver = await this.launchDisplayElectron(debugPort);
//         }
//         return driver;
//     }


//     async launchChrome() {
//         await this.startChromeDriverService();
//         await this.startCoreAppChromeDriverService();
//         let driver = null;
//         let crCapabilities = Capabilities.chrome();
//         await this.log.info("Download Path set to browser is " + this.downloadPath);
//         let chromeOptions = new chrome.Options();
//         chromeOptions.setUserPreferences({
//             "profile.default_content_settings.popups": 0,
//             "disable-popup-blocking": "true",
//             "download.default_directory": this.downloadPath,
//             "download.prompt_for_download": false,
//             "profile.default_content_setting_values.notifications": 1,
//             "plugins.always_open_pdf_externally": true
//         });
//         chromeOptions.addArguments("--ignore-certificate-errors");
//         chromeOptions.addArguments("--allow-insecure-localhost");
        
//         crCapabilities.set('chromeOptions', chromeOptions);
//         /*var service;
//         if(service!=null) {
//             console.log("service is not null");
//             service = chrome.getDefaultService();
//         } else {
//             console.log("service is null");
//             service = new chrome.ServiceBuilder("../../drivers/chromedriver100.exe").build();
//         }*/
//         /*var service = new chrome.ServiceBuilder("../../drivers/chromedriver100.exe").build();
//         chrome.setDefaultService(service);*/
//         //driver = await new Builder().withCapabilities(crCapabilities).build();
//         driver = await new Builder().usingServer('http://localhost:1808').withCapabilities(crCapabilities).build();
//         await driver.manage().deleteAllCookies();
//         await driver.manage().window().maximize();
//         return driver;
//     }

//     async launchIE() {
//         let driver = null;
//         let ieOptions = new ie.Options();
//         ieOptions.introduceFlakinessByIgnoringProtectedModeSettings(true);
//         ieOptions.ignoreZoomSetting(true);

//         let ieCapabilities = Capabilities.ie();
//         ieCapabilities.merge(ieOptions);

//         driver = await new Builder().withCapabilities(ieCapabilities).build();
//         // await driver.manage().deleteAllCookies();
//         // await driver.manage().window().maximize();
//         return driver;
//     }


//     async launchFF() {
//         let driver = null;
//         let ffCapabilities = Capabilities.firefox();
//         let firefoxOptions = new firefox.Options();
        
//         driver = await new Builder().withCapabilities(ffCapabilities).build();
//         // await driver.manage().deleteAllCookies();
//         // await driver.manage().window().maximize();
//         return driver;
//     }

//     async launchEC() {
//         let driver = null;
//         let edgeCapabilities = Capabilities.edge();
//         let edgeOptions = new edge.Options();

//         driver = await new Builder().withCapabilities(edgeCapabilities).build();
//         await driver.manage().deleteAllCookies();
//         await driver.manage().window().maximize();
//         return driver;
//     }

//     async launchDisplayElectron(debugPort) {
//         await this.startElectronChromeDriverService();
//         let driver = null;
//         let crCapabilities = Capabilities.chrome();
//         let chromeOptions = new chrome.Options();
//         //chromeOptions.addArguments("test-type");
//         // chromeOptions.addArguments("start-maximized");
//         //chromeOptions.addArguments("--requireWindowFocus=true");
//         //chromeOptions.addArguments("--enable-precise-memory-info");
//         //chromeOptions.addArguments("--disable-popup-blocking");
//         //chromeOptions.addArguments("--disable-default-apps");
//         //chromeOptions.addArguments("--disable-infobars");
//         chromeOptions.addArguments("--ignore-certificate-errors");
//         chromeOptions.addArguments("--allow-insecure-localhost");

//         chromeOptions.addArguments("--disable-dev-shm-usage");
//         chromeOptions.addArguments("--no-sandbox");
//         chromeOptions.addArguments("--disable-gpu");
//         chromeOptions.addArguments("--remote-debugging-port="+debugPort);

//         // var electronApplication = envData.electronApplication;
//         // chromeOptions.setChromeBinaryPath(electronApplication);

//         crCapabilities.set('chromeOptions', chromeOptions);
//         /*var service = new chrome.ServiceBuilder("../../drivers/chromedriver80.exe").build();
//         chrome.setDefaultService(service);*/

//         driver = await new Builder().usingServer('http://localhost:9515').withCapabilities(crCapabilities).build();
//         // await this.utils.waitForSeconds(20);
//         // // await this.app.waitForElementToBeInVisible(driver,"//div[@class='centered-content' and text()='"+envData.screenNo+"']",30);
//         // let window = await driver.getAllWindowHandles();
//         // await driver.switchTo().window(window[0]);
//         return driver;
//     }

//     async closeApplication(driver) {
//         if(driver!=null) {
//             await driver.quit();
//             await this.stopElectronChromeDriverService();
//             await this.log.info("Closed all the browsers/applications");

//         }
//         else {
//             await this.log.info("No Driver Instance Available");
//         }
//     }
   
//     async closeAllBrowsers(driver) {
//         if(driver!=null) {
//             await driver.quit();
//             await this.stopChromeDriverService();
//             await this.log.info("Closed all the browsers/applications");
//         }
//         else {
//             await this.log.info("No Driver Instance Available");
//         }
//     }

//     async closeBrowser(driver) {
//         if(driver!=null) {
//             await driver.close();
//             await this.log.info("Closed the current browser/application instance");
//         }
//         else {
//             await this.log.info("No Driver Instance Available");
//         } 
//     }

//     async startElectronChromeDriverService() {
//         var driverpath = process.cwd() + path.sep + 'drivers' + path.sep + 'chromedriver_electron.exe';
//         await this.log.info("electron chrome driver path is "+driverpath);
//         try {
//             childProcess.exec(driverpath);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("started electron chrome driver service");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

//     async stopElectronChromeDriverService() {
//         var session = "Taskkill /F /IM chromedriver_electron.exe";
//         try {
//             childProcess.exec(session);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("stopped electron chrome driver service");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

//     async startChromeDriverService() {
//         var driverpath = process.cwd() + path.sep + 'node_modules' + path.sep + 'chromedriver' + path.sep + 'lib' + path.sep + 'chromedriver' + path.sep + 'chromedriver.exe --port=1808';
//         await this.log.info("chrome driver path is "+driverpath);
//         try {
//             childProcess.exec(driverpath);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("started chrome driver service");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

//     async startCoreAppChromeDriverService() {
//         var driverpath = process.cwd() + path.sep + 'node_modules' + path.sep + 'chromedriver' + path.sep + 'lib' + path.sep + 'chromedriver' + path.sep + 'chromedriver.exe --port=1807';
//         await this.log.info("chrome driver path is "+driverpath);
//         try {
//             childProcess.exec(driverpath);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("started coreApp chrome driver service");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

//     async stopChromeDriverService() {
//         var session = "Taskkill /F /IM chromedriver.exe";
//         try {
//             childProcess.exec(session);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("stopped chrome driver service");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

//     async killChromeSessions() {
//         var session = "Taskkill /F /IM chrome.exe";
//         try {
//             childProcess.exec(session);
//             await this.utils.waitForSeconds(5); //wait is mandatory to start the child process
//             await this.log.info("killed Chrome Sessions");
//         }
//         catch(err) {
//             await this.log.error(err);
//         }
//     }

// }
// exports.browser = browser;