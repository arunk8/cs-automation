const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const loginPage = require('../pageobjects/login.page')

describe('CaresLink Application - Account setup tests', () => {
    
    it('should create account with valid email id', async () => {
        let emailAddress = await loginPage.generateRandomEmail();
        let password = "1qaz1qaz";
        await LoginPage.createNewUser(emailAddress,password) 
        
        await browser.takeScreenshot();
    })

   
})

