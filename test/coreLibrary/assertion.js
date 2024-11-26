var {logger} = require('./logger');
var chai = require('chai');

class assertion {
    log = new logger();
    overallstatus = true;
    constructor(appobject) {
        this.base = appobject;
        global.assertStatus;
        if(typeof global.assertStatus != 'undefined'){
            if(global.assertStatus!= false){
                global.assertStatus=true;
            }
        }
        else{
            global.assertStatus=true;
        }
    }

    async softAssert(actual, expected, message) {
        try{
            chai.assert.equal(actual, expected, message);
        }
        catch(err){
            await this.log.error(message+"\n error due to "+err);
            this.overallstatus = false;
            global.assertStatus=false;
            await this.base.takeScreenshot("error");
        }
    }
    async equal(actual, expected, message) {
        chai.assert.equal(actual, expected, message);
    }
}
exports.assertion = assertion;