const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')

describe('CaresLink Application Login', () => {
    it('should login with valid credentials', async () => {
        // await LoginPage.openLandingPage() 
        // await LoginPage.login(global.envConfig.username, global.envConfig.password)
        // await browser.waitUntil();
        await browser.takeScreenshot();
    })

    // it('should check header buttons', async () => {
    //     await expect(LoginPage.btnProfile).toHaveText(expect.stringContaining('Profile'))
    //     await LoginPage.validateHeaderButtons();
    // })

    // it('should verify application signout', async () => {
    //     await LoginPage.logout();
    // })
})

