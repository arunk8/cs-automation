const { $, browser } = require('@wdio/globals');
const Page = require('./Page');
const { Key } = require('webdriverio');
const { waitForFinish } = require('testable-utils');


class ProfilePage extends Page {
    
    
    get btnProfile(){
        return $('//span[text()="Profile"]');
    }
    get btnExperience(){
        return $('//span[text()="Experience"]');
    }
    get btnAddExperience(){
        return $('//*[@id="flt-semantic-node-34"]');
    }

    get dropdownSelectRole(){
        return $('//*[text()="Please select role*"]');
    }
    get optionSelectRole(){
        return $('//*[text()="HHA"]');
    }
    get checkboxBussinessUnit(){
        return $('//*[@aria-label="Home Care"]');
    }
    get inputEmployeer(){
        return $('//*[@aria-label="Employer*"]');
    }
    get btnStartDate(){
        return $('//*[text()="Start Date"]');
    }
    get calendarStartDate(){
        return $('//*[contains(text(),"December 3, 2024")]');
    }
    get btnOK(){
        return $('//*[text()="OK"]');
    }
    get btnSave(){
        return $('//*[text()="Save"]');
    }

    async verifyAddExperience(){
        await this.action.waitForElementToBeVisible(this.btnProfile);
        await this.action.click(this.btnProfile);
        await this.action.click(this.btnExperience);
        await this.action.waitForElementToBeVisible(this.btnAddExperience);
        await this.action.click(this.btnAddExperience);
        await this.action.waitForElementToBeVisible(this.dropdownSelectRole);
        await this.action.click(this.dropdownSelectRole);
        await this.action.waitForElementToBeVisible(this.optionSelectRole);
        await this.action.click(this.optionSelectRole);
        await this.action.waitForElementToBeVisible(this.checkboxBussinessUnit);
        await this.action.click(this.checkboxBussinessUnit);

        await this.action.setValue(this.inputEmployeer,"QWERTY");
        await this.action.click(this.btnStartDate);
        await this.action.waitForElementToBeVisible(this.calendarStartDate);
        await this.action.click(this.calendarStartDate);
        await this.action.click(this.btnOK);
        await this.action.waitForElementToBeVisible(this.btnSave);
        await this.action.click(this.btnSave);
        await this.action.click(this.btnExperience);
        await browser.takeScreenshot();
    }


}

module.exports = new ProfilePage();