const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')

describe('CaresLink Application Login', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        
        await LoginPage.login('arunraj963686@gmail.com', 'Aarunraj@123')
        await expect(LoginPage.btnProfile).toHaveText(
            expect.stringContaining('Profile'))
    })
})

