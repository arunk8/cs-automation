const { $, browser } = require('@wdio/globals');
const Page = require('./page');
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
        return $('//input[@aria-label="Email"]');
    }

    get visiblePassword() {
        return $('//*[@id="flt-semantic-node-14"]');
    }
    get inputPassword() {
        return $('//flt-text-editing-host//form[4]//*[@id="current-password"]');
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

        // Click the hidden button to enable accessibility
        // await accessibilityButton.click();
        await browser.execute((el) => el.click(), accessibilityButton);
        console.log('Accessibility enabled');

        await browser.pause(3000);
    }

    /**
     * A method to encapsulate automation code to interact with the page
     * e.g., to login using username and password
     */
    async login(username, password) {
        // Enabling accessibility before interacting with elements
        await this.enableAccessibility();

        await this.btnSignIn.click();
        await this.inputUsername.setValue(username);
        await browser.keys(Key.Tab);
        await browser.keys(password.split(''));
        await this.btnSignIn.click();
        await browser.pause(2000);
        await browser.takeScreenshot();
        await this.btnProfile.click();
        
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

    /**
     * Overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();