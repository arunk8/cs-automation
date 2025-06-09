const { $, browser } = require('@wdio/globals');
const Page = require('./Page.js');
const { Key } = require('webdriverio');
var loginSelectors = require('../selectors/loginSelectors.js');
const { addAllureId } = require('@wdio/allure-reporter');

class LoginPage extends Page {
    
    get inputUsername() { return $(loginSelectors.login.inputUsername); }
    get visiblePassword() { return $(loginSelectors.login.visiblePassword); }
    get inputPassword() { return $(loginSelectors.login.inputPassword); }
    get btnBackToHome() { return $(loginSelectors.login.btnBackToHome); }
    get btnCaresLinkLogo() { return $(loginSelectors.login.btnCaresLinkLogo); }
    get btnLoginToAccount() { return $(loginSelectors.login.btnLoginToAccount); }
    get btnSignInWithGoogle() { return $(loginSelectors.login.btnSignInWithGoogle); }
    get btnForgotPassword() { return $(loginSelectors.login.btnForgotPassword); }
    get btnSignUpNow() { return $(loginSelectors.login.btnSignUpNow); }


    get inputEmailAddress() { return $(loginSelectors.accountSetup.inputEmailAddress); }
    get inputPasswordAccountSetup() { return $(loginSelectors.accountSetup.inputPassword); }
    get inputConfirmPassword() { return $(loginSelectors.accountSetup.inputConfirmPassword); }
    get btnCreateAccount() { return $(loginSelectors.accountSetup.btnCreateAccount); }

    // get btnSearch() { return $(loginSelectors.login.btnSearch); }
    // get btnBlog() { return $(loginSelectors.login.btnBlog); }
    // get btnActivityFeed() { return $(loginSelectors.login.btnActivityFeed); }
    // get btnJobs() { return $(loginSelectors.login.btnJobs); }
    // get btnNotifications() { return $(loginSelectors.login.btnNotifications); }
    // get btnForBusinesses() { return $(loginSelectors.login.btnForBusinesses); }
    // get btnSignout() { return $(loginSelectors.login.btnSignout); }
    get hiddenAccessibilityButton() { return $(loginSelectors.login.hiddenAccessibilityButton); }

    /**
     * Function to enable accessibility by clicking the hidden button
     */
    async enableAccessibility() {
        // Wait for the glass pane to be visible
        await $('flt-glass-pane').waitForDisplayed({ timeout: 30000 });

        // Wait for the hidden accessibility button
        const accessibilityButton = await this.hiddenAccessibilityButton;
        await accessibilityButton.waitForExist({ timeout: 10000 });

        await browser.execute((el) => el.click(), accessibilityButton);
        await this.log.info('Accessibility enabled');
    }

    async login(username, password) {
        await this.open('loginPage')
        // Enabling accessibility before interacting with elements
        await this.enableAccessibility();
        
        if(await this.action.isDisplayed(this.btnCaresLinkLogo, 10000)){
            await this.action.setFlutterTextInput(this.inputUsername,username);
            await this.action.setFlutterTextInput(this.inputPassword,password);
            await this.action.click(this.btnLoginToAccount);
            let isLoggedIn = await this.action.waitForElementToBeInVisible(this.btnLoginToAccount);
            if(isLoggedIn){
                await this.log.info("Login successful")
            }else{
                await this.log.info("Login failed")
            }
        }else{
            await this.log.error("Login page is not loaded successfully");
        }

        await this.assert.assertAll();
        // await this.action.click(this.btnSignIn);
        // await this.action.setValue(this.inputUsername,username);
        // await this.action.clickKeys("tab");
        // await browser.keys(password.split(''));
        // await this.action.click(this.btnSignIn);
        // await this.action.waitForElementToBeVisible(this.btnProfile);

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

    async createNewUser(emailAddress, password) {
        await this.open('account-setup')
        // Enabling accessibility before interacting with elements
        await this.enableAccessibility();
        let isAccountsetupLoaded = await this.action.isDisplayed(this.inputEmailAddress);
        if(isAccountsetupLoaded){
            await this.action.setFlutterTextInput(this.inputEmailAddress, emailAddress);
            await this.action.wait(1);
            await this.action.setFlutterTextInput(this.inputPassword, password);
            await this.action.wait(1);
            await this.action.setFlutterTextInput(this.inputConfirmPassword, password);
            await this.action.wait(1);
            await this.action.click(this.btnCreateAccount);
            await this.action.wait(5);
        }
    }

    async generateRandomEmail() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let username = '';
        
        for (let i = 0; i < 10; i++) {
          username += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      
        return username + '@test.com';
    }
          
    async logout() {
        await this.action.click(this.btnSignout);
        await this.action.waitForElementToBeInVisible(this.btnProfile);
        await expect(this.btnSignIn).toBeEnabled({ message: "Signout is not successfull, expected sign in button to be displayed"});
    }
}

module.exports = new LoginPage();