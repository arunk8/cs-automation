const { browser } = require('@wdio/globals')
var fs = require('fs');
var path = require('path');
const args = require('yargs').argv;

var {webActionsAPI} = require('../coreLibrary/webActionsAPI');
var {logger} = require('../coreLibrary/logger');
var {utils} = require('../coreLibrary/utils');
var {assertion} = require('../coreLibrary/assertion');


module.exports = class Page {

    action = new webActionsAPI();
    log = new logger();
    utils = new utils();
    assert = new assertion();

    /**
    * Open(path) method used to navigate the browser to a specified path.
    */
    async open(path) {
        let environment = process.env.NODE_ENV || 'qa';
        await this.log.info('Environment: ' + environment);
        let URL = `${baseUrl.trim()}/${path}`;
        await this.log.info("Opening URL: " + URL + "")
        try{
            await browser.url(URL);
            await this.action.waitForHtmlPageToLoad();
            return true;
        }catch(error){
            await this.log.error('Failed to open URL:'+URL+", Error:"+error.message);
            throw error;
        }
    }

    async openLandingPage() {
        let environment = process.env.NODE_ENV || 'qa';
        await this.log.info('Environment: ' + environment);
        let URL = baseUrl;
        await this.log.info("URL is: " + URL)
        return await browser.url(URL.trim())
    }

    maximize() {
        browser.fullscreenWindow()
    }

    async waitFor() {
        await browser.pause(60000)
    }

    async close() {
        browser.deleteSession()
    }

}
