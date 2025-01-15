const { $, browser } = require('@wdio/globals');
const Page = require('./Page.js');
const { Key } = require('webdriverio');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
// const passwordInp = '#flt-semantic-node-13 > input';
// const passwordInp = '#current-password';



class LoginPage extends Page {
    /**
     * Define selectors using getter methods
     */
    get inputUsername() {
        // return $('//input[@aria-label="Email"]');
        return $('//*[@id="flt-semantic-node-14"]/input');
    }
    get visiblePassword() {
        return $('//*[@id="flt-semantic-node-14"]');
    }
    get inputPassword() {
        // return $('//flt-text-editing-host//form[4]//*[@id="current-password"]');
        return $('//*[@id="flt-semantic-node-16"]/input');
    }
    get btnSubmit() {
        return $('button[type="submit"]');
    }
    get btnSignIn() {
        return $('//*[contains(text(),"Sign In")]');
    }
    
    // get btnSignInWithGoogle() {
    //     return $('//*[text()="Sign in with Google"]');
    // }
    // get btnUseAnotherAccount() {
    //     return $('//*[text()="Use another account"]');
    // }
    // get inputEmail() {
    //     return $('//*[@type="email"]');
    // }
    // get btnNext(){
    //     return $('//*[text()="Next"]');
    // }
    // get btnTryAgain(){
    //     return $('//*[text()="Try again"]');
    // }
    // get inputPassword() {
    //     return $('//*[@type="password"]');
    // }
    // get btnContinue(){
    //     return $('//*[text()="Continue"]');
    // }
    
    get btnProfile(){
        return $('//span[text()="Profile"]');
    }
    get btnCareerPlanning(){
        return $('//*[text()="Career Planning"]');
    }
    get btnReferAndEarn(){
        return $('//*[text()="Refer and Earn"]');
    }
    get btnSearch(){
        return $('//*[text()="Search"]');
    }
    get btnBlog(){
        return $('//*[text()="Search"]/following-sibling::flt-semantics[text()="Blog"]');
    }
    get btnActivityFeed(){
        return $('//span[text()="Activity Feed"]');
    }
    get btnJobs(){
        return $('//span[text()="Jobs"]');
    }
    get btnNotifications(){
        return $('//span[text()="Notifications"]');
    }
    get btnForBussinesses(){
        return $('//span[text()="For Businesses"]');
    }
    get btnSignout(){
        return $('//*[text()="Sign out"]');
    }
    get hiddenAccessibilityButton() {
        // Selector for the hidden button enabling accessibility
        return $('flt-semantics-placeholder');
    }

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
        console.log('Accessibility enabled');
    }

    /**
     * A method to encapsulate automation code to interact with the page
     * e.g., to login using username and password
     */
    async login(username, password) {
        // Enabling accessibility before interacting with elements
        await this.enableAccessibility();

        // await this.btnSignIn.click();
        await this.action.click(this.btnSignIn);
        await this.action.setValue(this.inputUsername,username);
        await this.action.clickKeys("tab");
        await browser.keys(password.split(''));
        await this.action.click(this.btnSignIn);
        await this.action.waitForElementToBeVisible(this.btnProfile);
        await browser.takeScreenshot();

        // await this.inputUsername.setValue(username);
        // await browser.keys(Key.Tab);
        // await browser.keys(password.split(''));
        // await this.btnSignIn.click();
        // await browser.pause(3000);
        // await browser.takeScreenshot();
        // await this.btnProfile.click();
        
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
        await expect(this.btnForBussinesses).toBeEnabled({ message: "ForBussinesses button must be enabled"});
    }

    async logout() {
        await this.action.click(this.btnSignout);
        await this.action.waitForElementToBeInVisible(this.btnProfile);
        await expect(this.btnSignIn).toBeEnabled({ message: "Signout is not successfull, expected sign in button to be displayed"});
    }

    open() {
        return super.open('login');
    }

    openLandingPage() {
        return super.openLandingPage();
    }
}

module.exports = new LoginPage();