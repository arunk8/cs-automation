module.exports={
    login: {
        inputUsername: "//input[@type='text']",
        visiblePassword: "(//flt-semantics[@id='flt-semantic-node-18'])[1]",
        inputPassword: "//input[@type='password']",
        btnBackToHome: "//span[normalize-space()='Back to Home']",
        btnCaresLinkLogo: "//flt-semantics[@id='flt-semantic-node-7']",
        btnLoginToAccount: "//flt-semantics[text()='Login to Account']",
        btnSignInWithGoogle: "//span[normalize-space()='Sign in with Google']",
        btnForgotPassword: "//span[normalize-space()='Forgot Password']",
        btnSignUpNow: "//span[contains(text(),'New User?')]",
        hiddenAccessibilityButton: "flt-semantics-placeholder"
    },
    accountSetup:{
        inputEmailAddress: "//input[@type='text']",
        inputPassword: "(//input[@type='password'])[1]",
        inputConfirmPassword: "(//input[@type='password'])[2]",
        btnCreateAccount: "//*[text()='Create Account']",
        btnSigninWithGoogle: "//span[normalize-space()='Sign in with Google']",
        btnLoginNow: "//span[contains(text(),'Existing User?')]",
        btnBackToHome: "//span[normalize-space()='Back to Home']",
        
      },
    
}