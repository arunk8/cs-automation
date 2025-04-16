const { $, browser } = require('@wdio/globals');
const Page = require('./Page');
const { Key } = require('webdriverio');
var locators = require('../selectors/locators.json');

class ProfilePage extends Page {
    
    
    // get btnProfile(){
    //     return $('//span[text()="Profile"]');
    // }
    // get btnExperience(){
    //     return $('//span[text()="Experience"]');
    // }
    // get btnAddExperience(){
    //     return $('//*[@id="flt-semantic-node-34"]');
    // }

    // get dropdownSelectRole(){
    //     return $('//*[text()="Please select role*"]');
    // }
    // get optionSelectRole(){
    //     return $('//*[text()="HHA"]');
    // }
    // get checkboxBussinessUnit(){
    //     return $('//*[@aria-label="Home Care"]');
    // }
    // get inputEmployeer(){
    //     return $('//*[@aria-label="Employer*"]');
    // }
    // get btnStartDate(){
    //     return $('//*[text()="Start Date"]');
    // }
    // get calendarStartDate(){
    //     return $('//*[contains(text(),"December 3, 2024")]');
    // }
    // get btnOK(){
    //     return $('//*[text()="OK"]');
    // }
    // get btnSave(){
    //     return $('//*[text()="Save"]');
    // }

    get btnProfile() { return $(locators.profile.btnProfile); }
    get btnExperience() { return $(locators.profile.btnExperience); }
    get btnAddExperience() { return $(locators.profile.btnAddExperience); }
    get dropdownSelectRole() { return $(locators.profile.dropdownSelectRole); }
    get optionSelectRole() { return $(locators.profile.optionSelectRole); }
    get checkboxBusinessUnit() { return $(locators.profile.checkboxBusinessUnit); }
    get inputEmployer() { return $(locators.profile.inputEmployer); }
    get btnStartDate() { return $(locators.profile.btnStartDate); }
    get calendarStartDate() { return $(locators.profile.calendarStartDate); }
    get btnOK() { return $(locators.profile.btnOK); }
    get btnSave() { return $(locators.profile.btnSave); }

    get btnEditProfile() { return $(locators.basicInfo.btnEditProfile); }
    get inputFirstName() { return $(locators.basicInfo.inputFirstName); }
    get inputLastName() { return $(locators.basicInfo.inputLastName); }
    get inputAbout() { return $(locators.basicInfo.inputAbout); }
    get dropdownRole() { return $(locators.basicInfo.dropdownRole); }
    get optionDynamicSelector() { return (value) => $(locators.basicInfo.optionDynamicSelector.replace("dynamicValue", value)); }
    get dropdownSpeciality() { return $(locators.basicInfo.dropdownSpeciality); }
    get dropdownCountry() { return $(locators.basicInfo.dropdownCountry); }
    get dropdownState() { return $(locators.basicInfo.dropdownState); }
    get inputZipCode() { return $(locators.basicInfo.inputZipCode); }
    get inputPhoneNumber() { return $(locators.basicInfo.inputPhoneNumber); }
    get btnSave() { return $(locators.basicInfo.btnsave); }
    get btnCancel() { return $(locators.basicInfo.btncancel); }

    async verifyAddExperience(){
        await this.action.waitForElementToBeVisible(this.btnProfile);
        await this.action.click(this.btnProfile);
        await this.action.click(this.btnExperience);
        await this.action.waitForElementToBeVisible(this.btnAddExperience);
        await this.action.scrollIntoView(this.btnAddExperience);
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

    async editProfile(firstName, lastName, about, role, zipCode, phoneNumber) {
        await this.log.info('Editing Profile...');
        await this.action.click(this.btnEditProfile);
        await this.log.info('Clicked on Edit Profile button.');

        await this.action.setValue(this.inputFirstName, firstName);
        await this.log.info(`Set First Name: ${firstName}`);

        await this.action.setValue(this.inputLastName, lastName);
        await this.log.info(`Set Last Name: ${lastName}`);

        await this.action.setValue(this.inputAbout, about);
        await this.log.info(`Set About: ${about}`);

        await this.action.clickKeys("tab");
        await this.action.clickKeys("enter");
        await this.log.info('Clicked on Role dropdown.');
        // await this.action.click(this.optionDynamicSelector(role));
        await this.action.clickKeys("enter");
        await this.log.info(`Selected Role: ${role}`);

        await this.action.setValue(this.inputZipCode, zipCode);
        await this.log.info(`Set Zip Code: ${zipCode}`);

        await this.action.setValue(this.inputPhoneNumber, phoneNumber);
        await this.log.info(`Set Phone Number: ${phoneNumber}`);

        await this.action.click(this.btnSave);
        await this.log.info('Clicked on Save button.');
        
        await this.action.waitForElementToBeVisible(this.btnEditProfile);
    }

    async validateProfileFields(expectedData) {
        await this.log.info('Validating Profile Fields...');

        await this.action.click(this.btnEditProfile);
        const actualFirstName = await this.action.getValue(this.inputFirstName);
        const actualLastName = await this.action.getValue(this.inputLastName);
        const actualAbout = await this.action.getValue(this.inputAbout);
        const actualZipCode = await this.action.getValue(this.inputZipCode);
        const actualPhoneNumber = await this.action.getValue(this.inputPhoneNumber);

        console.log('Assertions for Profile Fields:');
        expect(actualFirstName).to.equal(expectedData.firstName, `Expected First Name: ${expectedData.firstName}, Actual: ${actualFirstName}`);
        expect(actualLastName).to.equal(expectedData.lastName, `Expected Last Name: ${expectedData.lastName}, Actual: ${actualLastName}`);
        expect(actualAbout).to.equal(expectedData.about, `Expected About: ${expectedData.about}, Actual: ${actualAbout}`);
        expect(actualZipCode).to.equal(expectedData.zipCode, `Expected Zip Code: ${expectedData.zipCode}, Actual: ${actualZipCode}`);
        expect(actualPhoneNumber).to.equal(expectedData.phoneNumber, `Expected Phone Number: ${expectedData.phoneNumber}, Actual: ${actualPhoneNumber}`);
    }

}

module.exports = new ProfilePage();