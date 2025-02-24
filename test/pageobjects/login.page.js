const { $, browser } = require('@wdio/globals');
const Page = require('./Page.js');
const { Key } = require('webdriverio');
const { waitForFinish } = require('testable-utils');
var locators = require('../selectors/locators.json');

class LoginPage extends Page {
    
    get inputUsername() { return $(locators.login.inputUsername); }
    get visiblePassword() { return $(locators.login.visiblePassword); }
    get inputPassword() { return $(locators.login.inputPassword); }
    get btnSubmit() { return $(locators.login.btnSubmit); }
    get btnSignInWithGoogle() { return $(locators.login.btnSignInWithGoogle); }
    get btnSignUp() { return $(locators.login.btnSignUp); }
    get textLoginToContinue() { return $(locators.login.textLoginToContinue); }
    get textLoginSubText() { return $(locators.login.textLoginSubText); }
    get textEmailAddress() { return $(locators.login.textEmailAddress); }
    get textPassword() { return $(locators.login.textPassword); }
    get textOr() { return $(locators.login.textOr); }



    /**
     * Function to enable accessibility by clicking the hidden button
     */
    async enableAccessibility() {
        // Wait for the glass pane to be visible
        await $('flt-glass-pane').waitForDisplayed({ timeout: 30000 });

        // Wait for the hidden accessibility button
        const accessibilityButton = await this.hiddenAccessibilityButton;
        await accessibilityButton.waitForExist({ timeout: 5000 });

        await browser.execute((el) => el.click(), accessibilityButton);
        await this.log.info('Accessibility enabled');
    }

    async login(username, password) {
        // Enabling accessibility before interacting with elements
        await this.enableAccessibility();

        await this.action.click(this.btnSignIn);
        await this.action.setValue(this.inputUsername,username);
        await this.action.clickKeys("tab");
        await browser.keys(password.split(''));
        await this.action.click(this.btnSignIn);
        await this.action.waitForElementToBeVisible(this.btnProfile);

        //signinwith google
        // await this.btnSignInWithGoogle.click();
        // // await this.btnUseAnotherAccount.click();
        // await this.inputEmail.setValue(username);
        // await this.btnNext.click();
        // await this.btnTryAgain.click();

        // await browser.pause(15000);
        // await this.inputPassword.setValue(password);
        // await this.btnNext.click();
        // await this.btnContinue.click();
        // await browser.pause(3000);
    }

    async validateHeaderButtons(){
        await expect(this.btnProfile).toBeEnabled({ message: "Profile must be enabled"});
        await expect(this.btnCareerPlanning).toBeEnabled({ message: "Career Planning must be enabled"});
        await expect(this.btnReferAndEarn).toBeEnabled({ message: "Refer and Earn must be enabled"});
        await expect(this.btnSearch).toBeEnabled({ message: "Search must be enabled"});
        await expect(this.btnBlog).toBeEnabled({ message: "Blog must be enabled"});
        await expect(this.btnActivityFeed).toBeEnabled({ message: "Activity Feed button must be enabled"});
        await expect(this.btnJobs).toBeEnabled({ message: "Jobs button must be enabled"});
        await expect(this.btnNotifications).toBeEnabled({ message: "Notifications button must be enabled"});
        await expect(this.btnForBusinesses).toBeEnabled({ message: "ForBussinesses button must be enabled"});
    }

    async validateLoginPageFields(){
        await expect(LoginPage.inputUsername).toBeDisplayed();
        await this.log.info('Verified the Email address field is displayed.');
        await expect(LoginPage.inputPassword).toBeDisplayed();
        await this.log.info('Verified the Password field is displayed.');
        await expect(LoginPage.btnSubmit).toBeDisplayed();
        await this.log.info('Verified the Submit button is displayed.');
        await expect(LoginPage.btnSignInWithGoogle).toBeDisplayed();
        await this.log.info('Verified the Sign in with Google button is displayed.');
        await expect(LoginPage.btnSignUp).toBeDisplayed();
        await this.log.info('Verified the Sign Up Now button is displayed.');
        await expect(LoginPage.textLoginToContinue).toBeDisplayed();
        await this.log.info('Verified the Login to continue text is displayed.');
        await expect(LoginPage.textLoginSubText).toBeDisplayed();
        await this.log.info('Verified the subtext under login is displayed.');
        await expect(LoginPage.textEmailAddress).toBeDisplayed();
        await this.log.info('Verified the Email address label is displayed.');
        await expect(LoginPage.textPassword).toBeDisplayed();
        await this.log.info('Verified the Password label is displayed.');
        await expect(LoginPage.textOr).toBeDisplayed();
        await this.log.info('Verified the OR text is displayed.');
    }

    

    async logout() {
        await this.action.click(this.btnSignout);
        await this.action.waitForElementToBeInVisible(this.btnProfile);
        await expect(this.btnSignIn).toBeEnabled({ message: "Signout is not successfull, expected sign in button to be displayed"});
    }
}

module.exports = new LoginPage();