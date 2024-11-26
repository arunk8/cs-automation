//import {Context} from "mocha";

class testConfig {    
    static getcontextValue;
    
    setContext(context)
    {
        testConfig.getcontextValue=context;
    }

    getContext(){
        return testConfig.getcontextValue;
    }

}
exports.testConfig = testConfig;