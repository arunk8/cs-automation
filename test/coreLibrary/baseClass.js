//import { Context } from "mocha";
//import { WebDriver } from 'selenium-webdriver';
//import * as chai from 'chai';

var fs = require('fs');
var path = require('path');
const args = require('yargs').argv;

// var {browser} = require('./browser');
// var {testConfig} = require('./testConfig');
var {webActionsAPI} = require('./webActionsAPI');
// var {webServiceAPI} = require('./webServiceAPI');
// var {utils} = require('./utils');
var {logger} = require('./logger');
// var {testRailUpdate} = require('./testRailUpdate');
// var {environmentConfig} = require('../environmentConfig');
// var envData = require('../environmentConfig.json');
// var {displayUtils} = require('./displayUtils');
// var {bcmAPI} = require('../bwinLibrary/bcm/bcmAPI');
// var {toscaAPI} = require('../bwinLibrary/tosca/toscaAPI');
// var {multiInstanceCoreAppManager} = require('./multliInstanceCoreAppManager');
// const addContext = require('mochawesome/addContext');
// const { assertion } = require('./assertion');
// const { timeStamp } = require('console');
// global.screenCombo;

class baseClass {
    
    // appdriver;
    // webdriver;
    /*browser;
    action;
    webservice;
    utils;
    config;
    log;
    testRail;

    constructor() {      
        this.browser = new browser();
        this.action = new webActionsAPI();
        this.webservice = new webServiceAPI();
        this.utils = new utils();
        this.config = new testConfig();
        this.log = new logger();
        this.testRail = new testRailUpdate();
    }*/
    
    // browser = new browser();
    action = new webActionsAPI();
    // webservice = new webServiceAPI();
    // utils = new utils();
    // config = new testConfig();
    log = new logger();
    // testRail = new testRailUpdate();
    // envConfig = new environmentConfig();
    // screenNo = envData.screenNo;
    // displayUtils= new displayUtils();
    // assert = new assertion();
    // bcmAPI = new bcmAPI();
    // toscaAPI = new toscaAPI();
    // MICAM = new multiInstanceCoreAppManager();

    getElement = (selector) => $(selector);
    // screenNumber = this.screenNo;
    // subScreenNumber  = "1";
    // testDataType;
    // launchedTemplateURL ="";

    // windows = [];
    // isMultiview = true;
    // /**
    //  * @async to launch electron application using electron app driver
    //  * @returns none
    //  * @example baseClass.launchElectronApplication()
    //  */
    // async launchElectronApplication() {
    //     //var coreAppData = await this.MICAM.getPortAndUrl(this.webdriver, this.subScreenNumber);
    //     var coreAppData = await this.MICAM.getPortAndUrl(this.subScreenNumber);
    //     await this.log.info("checking existing instance if any");
    //     await this.closeApplication();
    //     await this.log.info("Launching Application");
    //     //await this.setEnvVariables();
    //     var browserName = "DISPLAY_ELECTRON";
    //     this.appdriver = await this.browser.getBrowser(browserName, coreAppData.get("devToolsPort"));
    //     await this.log.info(browserName + " Browser launched..");
    //     this.launchedTemplateURL = coreAppData.get("displayedURL");
    //     await this.appdriver.get(coreAppData.get("displayedURL"));
    //     await this.action.waitForHtmlPageToLoad(this.appdriver, 30);
    //     await this.utils.waitForSeconds(5);
    // }

    // /**
    //  * @async to launch required browser using web driver
    //  * @returns none
    //  * @example baseClass.launchBrowser("CR")
    //  */
    // async launchBrowser(browserName) {
    //     //await this.closeAllBrowsers();
    //     var sceenLayout = await this.envConfig.getScreenLayout();
    //     if(sceenLayout == undefined){
    //         await this.log.info( "Invalid ShopId or ShopId is empty");
    //         await this.assert.equal(true,sceenLayout,"ShopId is "+sceenLayout);
    //     }
    //     else{
    //         await this.log.info( "ShopId is "+sceenLayout);
    //         await this.log.info("Multi view Flag: "+ this.isMultiview);
    //         if(this.isMultiview){
    //             global.screenCombo= await this.envConfig.getScreenCombo();
    //             await this.assert.equal(2,global.screenCombo.length,"Layout doesn't have single&qaud screen combo");
    //             await this.log.info("Screen combo:"+global.screenCombo);
    //             //Setting Qaud Screen & Launching Electron app
    //             await this.setScreenNumber(global.screenCombo[1].replace(/[A-Za-z]/g, ''));
    //         }
    //         await this.MICAM.startCoreAppManagerProcess(this.screenNumber);
    //         await this.log.info("Launching Browser");
    //         this.webdriver = await this.browser.getBrowser(browserName, "");
    //         await this.log.info(browserName + " Browser launched..");
    //         await this.webdriver.get("https://www.google.com");
    //     }
    // }

    // /**
    //  * @async to close the electron application instance
    //  * @returns none
    //  * @example baseClass.closeApplication()
    //  */
    // async closeApplication() {
    //     await this.log.info("Closing Application");
    //     await this.browser.closeApplication(this.appdriver);
    //     this.appdriver = null;
    // }

    // /**
    //  * @async to close all the instances of the browser
    //  * @returns none
    //  * @example baseClass.closeAllBrowsers()
    //  */
    //  async closeAllBrowsers() {
    //     await this.log.info("Closing All Browsers");
    //     await this.browser.closeAllBrowsers(this.webdriver);
    //     this.webdriver = null;
    //     await this.MICAM.stopCoreAppManagerProcess();
    //     await this.killChromeSession();
    // }

    // /**
    //  * @async to close the current instance of the browser
    //  * @returns none
    //  * @example baseClass.closeBrowser()
    //  */
    // async closeBrowser() {
    //     await this.log.info("Closing Browser");
    //     await this.browser.closeBrowser(this.webdriver);
    // }

    // /**
    //  * @async to kill any chrome sessions running in background
    //  * @returns none
    //  * @example baseClass.killChromeSession()
    //  */
    // async killChromeSession() {
    //     await this.log.info("Killing Chrome Sessions");
    //     await this.browser.killChromeSessions();
    // }

    // /**
    //  * @async Once after clicking on download, this function will check whehther file downloaded or not
    //  * @returns downloaded filename with path will be returned
    //  * @param downloadStartTimeoutInSec - initial start time to check download started or not. Its optional, by default value is 20s
    //  * @param downloadEndTimeOutInSec - Max wait time to complete the download . Its optional, by default value is 1200s(20min)
    //  * @example await baseClass.waitForDownloadToComplete(20, 1500);
    //  */
    //  async waitForDownloadToComplete(downloadStartTimeoutInSec, downloadEndTimeOutInSec) {
    //     if(downloadStartTimeoutInSec="")
    //         downloadStartTimeoutInSec = 20;
    //     if(downloadEndTimeOutInSec="")
    //         downloadEndTimeOutInSec = 1200;
    //     var dirpath = await this.browser.downloadPath;
    //     var count = 0;
    //     var maxwaitcount = 0;
    //     var setcount;
    //     var initialfilecount = await this.browser.initialFileCount;
    //     var filecount = initialfilecount;

    //     while (true) {
    //         count++;
    //         const totalfiles = await fs.readdirSync(dirpath);
    //         filecount = totalfiles.length;
    //         //await this.log.info("filecount : " + filecount);
    //         if (filecount > initialfilecount) {
    //             //this.browser.initialFileCount = filecount;
    //             break;
    //         }
    //         else {
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //             if (count > (downloadStartTimeoutInSec * 1000)) {
    //                 //this.browser.initialFileCount = filecount;
    //                 throw ("File download not started with in initial time - " + downloadStartTimeoutInSec + " due to some issue. Please check.");
    //             }
    //         }
    //     }
    //     await new Promise(resolve => setTimeout(resolve, 3000));
    //     while (true) {
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         setcount = maxwaitcount;
    //         const checkfiles = await fs.readdirSync(dirpath);
    //         checkfiles.forEach(file => {
    //             //await this.log.info(file);
    //             if (path.basename(file).includes(".crdownload") || path.basename(file).includes(".part")) {
    //                 maxwaitcount++;
    //                 this.log.info(file + " Download in progress-" + maxwaitcount);
    //             }
    //         });
    //         if (setcount == maxwaitcount) {
    //             break;
    //         }
    //         if (maxwaitcount > (downloadEndTimeOutInSec * 1000)) {
    //             throw ("File download not Completed in max time - " + downloadEndTimeOutInSec + " due to some issue. Please check.");
    //         }
    //     }

    //     let latest;
    //     const files = fs.readdirSync(dirpath);
    //     files.forEach(filename => {
    //         const stat = fs.lstatSync(path.join(dirpath, filename));
    //         // Pass if it is a directory
    //         if (stat.isDirectory())
    //             return;

    //         // latest default to first file
    //         if (!latest) {
    //             latest = { filename, mtime: stat.mtime };
    //             return;
    //         }
    //         // update latest if mtime is greater than the current latest
    //         if (stat.mtime > latest.mtime) {
    //             latest.filename = filename;
    //             latest.mtime = stat.mtime;
    //         }
    //     });
    //     var downloadedfilepath = dirpath.replace(/\\/g, "/");
    //     return downloadedfilepath + "/" + latest.filename;
    // }

    // async takeScreenshot(name) {
    //     //clicking show desktop twice as screenshot is not capturing sometimes due to multiple windows highlighting
    //     //await this.displayUtils.showDesktop();
    //     //await this.utils.waitForSeconds(2);
    //     //await this.displayUtils.showDesktop();
    //     //var filepath = path.join(__dirname, '..', '..', 'reports');
    //     var filepath = path.join(process.cwd(), 'reports');
    //     var screenshotPath = filepath + "/" + "screenshots";
    //     var filename = await this.utils.getTimeStamp();
    //     filename = name+"_"+filename;
    //     var screenshotname = screenshotPath + "/" + filename + ".png";
    //     screenshotname = screenshotname.replace(/\\/g, "/");
    //     console.log("Screenshot name with path is " + screenshotname);
    //     var relativeScreenshotPath = screenshotname.substring(screenshotname.lastIndexOf("/screenshots"));
    //     let driver;
    //     if (this.appdriver != null) {
    //         driver = this.appdriver;
    //         //await driver.switchTo().defaultContent();
    //         let window = await driver.getAllWindowHandles();
    //         await driver.switchTo().window(window[0]);
    //     }
    //     else {
    //         driver = this.webdriver;
    //     }

    //     if (driver) {
    //         if (fs.existsSync(screenshotPath)) {
    //             await this.log.info("Screenshot folder is available");
    //             await this.action.takeScreenshot(driver, screenshotname);
    //         }
    //         else {
    //             fs.mkdirSync(screenshotPath);
    //             await this.log.info("Created a folder");
    //             await this.action.takeScreenshot(driver, screenshotname);
    //         }
    //         addContext(await this.config.getContext(),  "."+ relativeScreenshotPath);
    //         return screenshotname;
    //     }
    //     return ""; //screenshot is not taken.
    // }

    // async setEnvVariables() {
    //     var envType = args.envType;
    //     var account = args.account;
    //     var displayConfigPath = await this.envConfig.getScreenConfigPath(this.screenNumber);
    //     await this.log.info("Setting the env variables for "+account+ " on "+envType+" environment");
    //     process.env.DISPLAY_ENV = envData[envType].envVariables[account].DISPLAY_ENV;
    //     process.env.DISPLAY_BRAND = envData[envType].envVariables[account].DISPLAY_BRAND;
    //     // process.env.DISPLAY_SHOP_ID = envData[envType].envVariables[account].DISPLAY_SHOP_ID;
    //     process.env.DISPLAY_SHOP_ID = args.shopId;
    //     process.env.DISPLAY_INV_DISPLAY_ID = envData[envType].envVariables[account].DISPLAY_INV_DISPLAY_ID;
    //     process.env.DISPLAY_API_KEY = envData[envType].envVariables[account].DISPLAY_API_KEY;
    //     process.env.DISPLAY_API_TOKEN = envData[envType].envVariables[account].DISPLAY_API_TOKEN;
    //     process.env.DISPLAY_INV_URL = envData[envType].envVariables[account].DISPLAY_INV_URL;
    //     process.env.DISPLAY_RTMS_URL = envData[envType].envVariables[account].DISPLAY_RTMS_URL;
    //     // process.env.DISPLAY_CONFIG_PATH = envData[envType].envVariables[account].DISPLAY_CONFIG_PATH;
    //     process.env.DISPLAY_CONFIG_PATH = displayConfigPath;
    //     process.env.DISPLAY_DECODER_CONFIG_PATH = envData[envType].envVariables[account].DISPLAY_DECODER_CONFIG_PATH;
    //     process.env.DISPLAY_CRASHPATH = envData[envType].envVariables[account].DISPLAY_CRASHPATH;
    //     process.env.DISPLAY_EC_CERT_KEY_PATH = envData[envType].envVariables[account].DISPLAY_EC_CERT_KEY_PATH;
    //     process.env.DISPLAY_LOGLEVEL = envData[envType].envVariables[account].DISPLAY_LOGLEVEL;
    //     process.env.DISPLAY_TIMEOUT = envData[envType].envVariables[account].DISPLAY_TIMEOUT;
    //     process.env.DISPLAY_G_ACCESS_TOKEN = envData[envType].envVariables[account].DISPLAY_G_ACCESS_TOKEN;
    //     process.env.isAutomation = envData[envType].envVariables[account].isAutomation;
    // }

    // async setScreenNumber(newScreenNumber){
    //     this.screenNumber = newScreenNumber;
    //     await this.log.info("Screen number is set to : " +newScreenNumber);   
    // }
    // // async getScreenNumber(){
    // //     return this.screenNumber;
    // // }

    // async setSubScreenNumber(newSubScreenNumber){
    //     this.subScreenNumber = newSubScreenNumber;
    //     await this.log.info("Sub Screen number is set to : " +newSubScreenNumber);  
    // }

    // async getAllWindows(){
    //     return this.windows;
    // }

    // async getDriver(){
    //     var driver = (args.driver === "webdriver") ? this.webdriver : (args.driver === "appdriver") ? this.appdriver : null;
    //     return driver;        
    // }

    // async checkAssertStatus(){
    //     await this.log.info("OverallStatus :" + this.assert.overallstatus);
    //     await this.log.info("Global Asserts is: "+ global.assertStatus);
    //     if (!this.assert.overallstatus || !global.assertStatus) {
    //         this.assert.overallstatus = true;
    //         await this.assert.equal(true, false, "Expected and Actual are not matching");
    //     }
    //     else {
    //         await this.assert.equal(true, true, "");
    //     }
    // }

}
exports.baseClass = baseClass;