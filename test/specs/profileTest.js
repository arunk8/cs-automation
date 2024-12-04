const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const ProfilePage = require('../pageobjects/profile.page')

describe('CaresLink Application Profile Tab Tests', () => {
    it('should add experience with valid data', async () => {
        await LoginPage.openLandingPage() 
        await LoginPage.login(global.envConfig.username, global.envConfig.password)
        await ProfilePage.verifyAddExperience();
    })
})

