const LoginPage = require('../pageobjects/login.page')
const ProfilePage = require('../pageobjects/profile.page')

describe('CaresLink Application Profile Tab Tests', () => {

    const testData = {
        firstName: 'John',
        lastName: 'Doe',
        about: 'Experienced QA Engineer',
        role: 'HHA',
        zipCode: '12345',
        phoneNumber: '9876543210'
    };

    it('should add experience with valid data', async () => {
        await LoginPage.openLandingPage() 
        await LoginPage.login(global.envConfig.username, global.envConfig.password)
        await ProfilePage.verifyAddExperience();
    })

    it('should edit and validate the profile data successfully', async () => {
        await ProfilePage.log.info('Navigated to Profile Page.');
        await ProfilePage.editProfile(testData.firstName,testData.lastName,testData.about,testData.role,testData.zipCode,testData.phoneNumber);
        await ProfilePage.log.info('Profile Edited Successfully.');
        await ProfilePage.validateProfileFields(testData);
        await ProfilePage.log.info('Profile Fields Validated Successfully.');
    });

})

