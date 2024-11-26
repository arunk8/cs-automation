

var fs = require('fs');
var {logger} = require('./logger');
const { Key } = require('webdriverio');

class webActionsAPI {

    timeout = 90 * 1000;
    log = new logger();

    /**
     * @async Navigate to a given url in the browser that is already open and maximize the browser window
     * @param url url to open
     * @returns None
     * @example webActionsAPI.open("http://www.google.com");
     */
    async open(url) { 
        await this.log.info("Navigating to url: " + url);
        await browser.url(url);
        await browser.maximizeWindow();
        await this.log.info("Browser is maximized");
    }

    /**
     * @async Destroy browser session
     * @returns None
     * @example webActionsAPI.quit();
     */
    async quit() {
        await browser.deleteSession();
        await this.log.info("Browser session ended");
    }

    /**
     * @async Close the current browser window
     * @returns None
     * @example webActionsAPI.close();
     */
    async close() {
        await browser.closeWindow();
        await this.log.info("Browser window is closed");
    }

    /**
     * @async Used to clear the existing text in a field
     * @param locator The WebdriverIO locator or selector of the object
     * @returns None
     * @example webActionsAPI.clear("#element");
     */
    async clear(locator) {
        const element = await $(locator);
        await element.clearValue();
        await this.log.info(`Cleared the field: ${locator}`);
        await this.waitForPageToLoad();
    }

    /**
     * @async Take a screenshot and save it.
     * @param {string} fileName - The name of the screenshot file.
     * @returns {Promise<void>}
     * @example await webActionsAPI.takeScreenshot('homepage');
     */
    async takeScreenshot(fileName) {
        try {
            await browser.saveScreenshot(`./screenshots/${fileName}.png`);
            await this.log.info(`Screenshot taken and saved as ${fileName}.png`);
        } catch (error) {
            await this.log.error(`Failed to take screenshot: ${error.message}`);
        }
    }

    /**
     * @async Click on an element that matches the given locator
     * @param locator The WebdriverIO locator or selector of the object
     * @param maxtimeout Timeout in milliseconds
     * @returns None
     * @example webActionsAPI.click("#element", 10000);
     */
    async click(locator, maxtimeout = 10000) {
        await this.log.info(`Clicking on the element: ${locator}`);
        const element = await $(locator);
        await element.waitForClickable({ timeout: maxtimeout });
        await element.click();
        await this.log.info(`Clicked on the element: ${locator}`);
        await this.waitForPageToLoad();
    }

    /**
     * @async Waits for an element to be clickable and then clicks on it.
     * @param {string} locator - The WebdriverIO selector for the element to be clicked.
     * @returns {Promise<void>} - Resolves when the element is successfully clicked.
     * @example await waitForClickableAndClick('#submit-button');
     */
    async waitForClickableAndClick(locator) {
        try {
            const element = await $(locator);
            await element.waitForClickable({ timeout: 5000 });
            await element.click();
            await this.log.info(`Clicked on the element: ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to click on the element ${locator}:`, error);
        }
    }

    /**
     * @async Clicks on an element using JavaScript.
     * @param {string} locator - The WebdriverIO selector for the element to be clicked.
     * @returns {Promise<void>} - Resolves when the element is successfully clicked.
     * @example await jsClick('#submit-button');
     */
    async jsClick(locator) {
        try {
            const element = await $(locator);
            await browser.execute((el) => el.click(), element);
            await this.log.info(`clicked on the element: ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to JavaScript click on the element ${locator}:`, error);
        }
    }

    /**
     * @async Set value to the input field
     * @param locator The WebdriverIO locator or selector of the input field
     * @param value Value to be entered
     * @returns None
     * @example webActionsAPI.setValue("#input", "test value");
     */
    async setValue(locator, value) {
        // const element = await $(locator);
        const element = typeof locator === 'string' ? await $(locator) : locator;
        await element.setValue(value);
        await this.log.info(`Set value: ${value} to ${typeof locator === 'string' ? locator : 'provided element'}`);
    }

    /**
     * @async Scroll into view and click on an element
     * @param locator The WebdriverIO locator or selector of the object
     * @returns None
     * @example webActionsAPI.scrollAndClick("#element");
     */
    async scrollAndClick(locator) {
        const element = await $(locator);
        await element.scrollIntoView();
        await element.click();
        await this.log.info(`Scrolled into view and clicked on ${locator}`);
    }

    /**
     * @async Get the text of an element
     * @param locator The WebdriverIO locator or selector of the object
     * @returns {String} Text of the element
     * @example const text = await webActionsAPI.getText("#element");
     */
    async getText(locator) {
        const element = await $(locator);
        const text = await element.getText();
        await this.log.info(`Text of ${locator} is: ${text}`);
        return text;
    }

    /**
     * @async Get the attribute value of an element.
     * @param {string} locator - The WebdriverIO locator of the element.
     * @param {string} attribute - The attribute to retrieve.
     * @returns {Promise<string>} - The attribute value.
     * @example const value = await webActionsAPI.getAttributeValue('#element', 'value');
     */
    async getAttributeValue(locator, attribute) {
        try {
            const element = await $(locator);
            const attributeValue = await element.getAttribute(attribute);
            await this.log.info(`Retrieved attribute ${attribute} value from ${locator}`);
            return attributeValue;
        } catch (error) {
            await this.log.error(`Failed to retrieve attribute value: ${error.message}`);
            return null;
        }
    }

    /**
     * @async Get input data (value) from an input field.
     * @param {string} locator - The WebdriverIO locator of the input field.
     * @returns {Promise<string>} - The input field's value.
     * @example const value = await webActionsAPI.getInputData('#input');
     */
    async getInputData(locator) {
        try {
            const element = await $(locator);
            const value = await element.getValue();
            await this.log.info(`Retrieved input data from ${locator}: ${value}`);
            return value;
        } catch (error) {
            await this.log.error(`Failed to retrieve input data: ${error.message}`);
            return null;
        }
    }

    /**
     * @async Get properties of a tag.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @returns {Promise<string>} - The properties of the element.
     * @example await webActionsAPI.getTagProperties('#elementId');
     */
    async getTagProperties(locator) {
        try {
            const element = await $(locator);
            const properties = await element.getHTML();
            await this.log.info(`Retrieved properties of ${locator}`);
            return properties;
        } catch (error) {
            await this.log.error(`Failed to get properties of ${locator}: ${error.message}`);
            return null;
        }
    }
    
    /**
     * @async Get data from JavaScript executor.
     * @param {string} script - The JavaScript to execute.
     * @returns {Promise<any>} - The result from the JS execution.
     * @example const result = await webActionsAPI.getJSExecutorData('return document.title;');
     */
    async getJSExecutorData(script) {
        try {
            const result = await browser.execute(script);
            await this.log.info('JS Executor data retrieved');
            return result;
        } catch (error) {
            await this.log.error(`Failed to execute JS: ${error.message}`);
            return null;
        }
    }

    /**
     * @async Drag and drop one element onto another.
     * @param {string} sourceLocator - The WebdriverIO locator of the source element.
     * @param {string} targetLocator - The WebdriverIO locator of the target element.
     * @returns {Promise<void>}
     * @example await webActionsAPI.dragAndDrop('#sourceId', '#targetId');
     */
    async dragAndDrop(sourceLocator, targetLocator) {
        try {
            const source = await $(sourceLocator);
            const target = await $(targetLocator);
            await source.dragAndDrop(target);
            await this.log.info(`Dragged element ${sourceLocator} to ${targetLocator}`);
        } catch (error) {
            await this.log.error(`Failed to drag and drop: ${error.message}`);
        }
    }

    /**
     * @async Perform a context (right) click on an element.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @returns {Promise<void>}
     * @example await webActionsAPI.contextClick('#elementId');
     */
    async contextClick(locator) {
        try {
            const element = await $(locator);
            await element.click({ button: 'right' });
            await this.log.info(`Performed context click on ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to perform context click: ${error.message}`);
        }
    }

    /**
     * @async Perform a double click on an element.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @returns {Promise<void>}
     * @example await webActionsAPI.doubleClick('#elementId');
     */
    async doubleClick(locator) {
        try {
            const element = await $(locator);
            await element.doubleClick();
            await this.log.info(`Double clicked on ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to double click: ${error.message}`);
        }
    }

    /**
     * @async Move to an element.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @returns {Promise<void>}
     * @example await webActionsAPI.moveToElement('#elementId');
     */
    async moveToElement(locator) {
        try {
            const element = await $(locator);
            await element.moveTo();
            await this.log.info(`Moved to element ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to move to element ${locator}: ${error.message}`);
        }
    }

    /**
     * @async Select a dropdown option by clicking it.
     * @param {string} dropdownLocator - The locator for the dropdown.
     * @param {string} optionLocator - The locator for the option to click.
     * @returns {Promise<void>}
     * @example await webActionsAPI.selectDropDownwithClick('#dropdown', '#option');
     */
    async selectDropDownwithClick(dropdownLocator, optionLocator) {
        try {
            const dropdown = await $(dropdownLocator);
            await dropdown.click();
            const option = await $(optionLocator);
            await option.click();
            await this.log.info(`Selected option ${optionLocator} from dropdown ${dropdownLocator}`);
        } catch (error) {
            await this.log.error(`Failed to select option from dropdown: ${error.message}`);
        }
    }

    /**
     * @async Select an option from a dropdown by its index.
     * @param {string} locator - The WebdriverIO locator of the dropdown.
     * @param {number} index - The index of the option to select.
     * @returns {Promise<void>}
     * @example await webActionsAPI.selectOptionByIndex('#dropdown', 2);
     */
    async selectOptionByIndex(locator, index) {
        try {
            const dropdown = await $(locator);
            await dropdown.selectByIndex(index);
            await this.log.info(`Selected option at index ${index} in ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to select option by index: ${error.message}`);
        }
    }

    /**
     * @async Select an option from a dropdown by its visible text.
     * @param {string} locator - The WebdriverIO locator of the dropdown.
     * @param {string} text - The visible text of the option to select.
     * @returns {Promise<void>}
     * @example await webActionsAPI.selectFromDropdown('#dropdown', 'Option Text');
     */
    async selectFromDropdown(locator, text) {
        try {
            const dropdown = await $(locator);
            await dropdown.selectByVisibleText(text);
            await this.log.info(`Selected option with text "${text}" from ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to select option by text: ${error.message}`);
        }
    }

    /**
     * @async Check if an element exists
     * @param locator The WebdriverIO locator or selector of the object
     * @returns {Boolean} True if element exists, false otherwise
     * @example const exists = await webActionsAPI.elementExists("#element");
     */
    async elementExists(locator) {
        const element = await $(locator);
        const exists = await element.isExisting();
        await this.log.info(`Element ${locator} exists: ${exists}`);
        return exists;
    }

    /**
     * @async Select a value from a dropdown
     * @param locator The WebdriverIO locator or selector of the dropdown
     * @param value The value to be selected
     * @returns None
     * @example webActionsAPI.selectDropdown("#dropdown", "Option 1");
     */
    async selectDropdown(locator, value) {
        const element = await $(locator);
        await element.selectByVisibleText(value);
        await this.log.info(`Selected ${value} from ${locator}`);
    }

    /**
     * @async Send specific keys to an element
     * 1. Sending keys directly to a locator
     * 2. Sending a combination of keys without a locator (global browser level)
     * 3. Sending single key
     * 
     * @param {string | null} [locator=null] - The WebdriverIO locator or selector of the element (optional)
     * @param {string | string[]} key - The key or keys to be sent (e.g., 'Enter', 'Tab', 'ArrowDown', ['Control', 'a'])
     * @returns {Promise<void>}
     * @example webActionsAPI.sendKeys("#input", "Enter");
     * @example webActionsAPI.sendKeys(null, ["Control", "a"]);
     * @example webActionsAPI.sendKeys(["Control", "a"]); // Global key combination without element
     */
    async clickKeys(key,locator = null) {
        if (typeof locator === 'string') {
            const element = await $(locator);
            await element.click();
            await browser.keys(await this.checkKey(key));
            await this.log.info(`Sent key(s): ${key} to ${locator}`);
        } 
        else if (locator === null && Array.isArray(key)) {
            await browser.keys([await this.checkKey(key[0]),key[1]]);
            await this.log.info(`Sent global key combination: ${key}`);
        } 
        else {
            await browser.keys(await this.checkKey(key));
            await this.log.info(`Sent global key combination: ${key}`);
        } 
    }

    async checkKey(key){
        switch (key.toLowerCase()) {
            case 'enter': key = Key.Enter; break;
            case 'tab': key = Key.Tab; break;
            case 'escape':
            case 'esc': key = Key.Escape; break;
            case 'backspace': key = Key.Backspace; break;
            case 'delete': key = Key.Delete; break;
            case 'arrowup':
            case 'up': key = Key.ArrowUp; break;
            case 'arrowdown':
            case 'down': key = Key.ArrowDown; break;
            case 'arrowleft':
            case 'left': key = Key.ArrowLeft; break;
            case 'arrowright':
            case 'right': key = Key.ArrowRight; break;
            case 'space':
            case 'spacebar': key = Key.Space; break;
            case 'control':
            case 'ctrl': key = Key.Control; break;
            case 'shift': key = Key.Shift; break;
            case 'alt': key = Key.Alt; break;
            case 'meta':
            case 'windows': key = Key.Meta; break;
            case 'f1': key = Key.F1; break;
            case 'f2': key = Key.F2; break;
            case 'f3': key = Key.F3; break;
            case 'f4': key = Key.F4; break;
            case 'f5': key = Key.F5; break;
            case 'f6': key = Key.F6; break;
            case 'f7': key = Key.F7; break;
            case 'f8': key = Key.F8; break;
            case 'f9': key = Key.F9; break;
            case 'f10': key = Key.F10; break;
            case 'f11': key = Key.F11; break;
            case 'f12': key = Key.F12; break;
            default: break;
        }
        return key;
    }

    /**
     * @async Refresh the browser window.
     * @returns {Promise<void>}
     * @example await webActionsAPI.refreshBrowser();
     */
    async refreshBrowser() {
        try {
            await browser.refresh();
            await this.log.info('Browser refreshed');
        } catch (error) {
            await this.log.error(`Failed to refresh browser: ${error.message}`);
        }
    }

    /**
     * @async Dismiss an alert.
     * @returns {Promise<void>}
     * @example await webActionsAPI.dismissAlert();
     */
    async dismissAlert() {
        try {
            await browser.dismissAlert();
            await this.log.info('Alert dismissed');
        } catch (error) {
            await this.log.error(`Failed to dismiss alert: ${error.message}`);
        }
    }

    /**
     * @async Accept an alert.
     * @returns {Promise<void>}
     * @example await webActionsAPI.acceptAlert();
     */
    async acceptAlert() {
        try {
            await browser.acceptAlert();
            await this.log.info('Alert accepted');
        } catch (error) {
            await this.log.error(`Failed to accept alert: ${error.message}`);
        }
    }

    /**
     * @async Check if an alert is present.
     * @returns {Promise<boolean>} - True if alert is present, otherwise false.
     * @example const isAlertPresent = await webActionsAPI.isAlertPresent();
     */
    async isAlertPresent() {
        try {
            await browser.getAlertText();
            await this.log.info('Alert is present');
            return true;
        } catch (error) {
            await this.log.info('No alert present');
            return false;
        }
    }
    
    /**
     * @async Switch to a window by title.
     * @param {string} windowTitle - The title of the window to switch to.
     * @returns {Promise<void>}
     * @example await webActionsAPI.switchToWindow('My Window Title');
     */
    async switchToWindow(windowTitle) {
        try {
            const windows = await browser.getWindowHandles();
            for (const handle of windows) {
                await browser.switchToWindow(handle);
                const title = await browser.getTitle();
                if (title.includes(windowTitle)) {
                    await this.log.info(`Switched to window: ${windowTitle}`);
                    return;
                }
            }
            throw new Error(`Window with title "${windowTitle}" not found`);
        } catch (error) {
            await this.log.error(`Failed to switch to window: ${error.message}`);
        }
    }

    /**
     * @async Scroll an element into view.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @returns {Promise<void>}
     * @example await webActionsAPI.scrollIntoView('#elementId');
     */
    async scrollIntoView(locator) {
        try {
            const element = await $(locator);
            await element.scrollIntoView();
            await this.log.info(`Scrolled to element ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to scroll to element ${locator}: ${error.message}`);
        }
    }

    /**
     * @async Check if an element is displayed within a specified timeout.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Timeout in milliseconds to wait for the element to be displayed.
     * @returns {Promise<boolean>} - True if the element is displayed within the timeout, otherwise false.
     * @example const isVisible = await webActionsAPI.isDisplayed('#elementId', 5000);
     */
    async isDisplayed(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            
            // Wait for the element to be displayed within the timeout
            const isDisplayed = await element.waitForDisplayed({ timeout });
            
            await this.log.info(`Element ${locator} is displayed: ${isDisplayed}`);
            return isDisplayed;
        } catch (error) {
            await this.log.error(`Failed to check if element is displayed within timeout: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for a specified amount of time.
     * @param {number} timeout - The time to wait in seconds.
     * @returns {Promise<void>}
     * @example await webActionsAPI.wait(5);
     */
    async wait(timeout) {
        try {
            await browser.pause(timeout*1000);
            await this.log.info(`Waited for ${timeout} seconds`);
        } catch (error) {
            await this.log.error(`Failed to wait: ${error.message}`);
        }
    }

    /**
     * @async Wait for a page to load
     * @param timeout Timeout in milliseconds
     * @returns None
     * @example webActionsAPI.waitForPageToLoad(5000);
     */
    async waitForPageToLoad(timeout = this.timeout) {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            { timeout, timeoutMsg: 'Page did not load within the specified time' }
        );
        await this.log.info('Page has loaded');
    }

    /**
     * @async Wait for an element to be selected.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is selected, false otherwise.
     * @example const isSelected = await webActionsAPI.waitForElementToBeSelected('#checkbox', 5000);
     */
    async waitForElementToBeSelected(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isSelected = await element.waitForSelected({ timeout });
            await this.log.info(`Element ${locator} is selected: ${isSelected}`);
            return isSelected;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be selected: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an element to be not selected.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is not selected, false otherwise.
     * @example const isNotSelected = await webActionsAPI.waitForElementToBeNotSelected('#checkbox', 5000);
     */
    async waitForElementToBeNotSelected(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isNotSelected = await element.waitForSelected({ timeout, reverse: true });
            await this.log.info(`Element ${locator} is not selected: ${isNotSelected}`);
            return isNotSelected;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be not selected: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an element to be enabled.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is enabled, false otherwise.
     * @example const isEnabled = await webActionsAPI.waitForElementToBeEnabled('#inputField', 5000);
     */
    async waitForElementToBeEnabled(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isEnabled = await element.waitForEnabled({ timeout });
            await this.log.info(`Element ${locator} is enabled: ${isEnabled}`);
            return isEnabled;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be enabled: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an element to be disabled.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is disabled, false otherwise.
     * @example const isDisabled = await webActionsAPI.waitForElementToBeDisabled('#inputField', 5000);
     */
    async waitForElementToBeDisabled(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isDisabled = await element.waitForEnabled({ timeout, reverse: true });
            await this.log.info(`Element ${locator} is disabled: ${isDisabled}`);
            return isDisabled;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be disabled: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an element to be visible.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is visible, false otherwise.
     * @example const isVisible = await webActionsAPI.waitForElementToBeVisible('#element', 5000);
     */
    async waitForElementToBeVisible(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isVisible = await element.waitForDisplayed({ timeout });
            await this.log.info(`Element ${locator} is visible: ${isVisible}`);
            return isVisible;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be visible: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an element to be invisible.
     * @param {string} locator - The WebdriverIO locator or selector of the element.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<boolean>} - True if element is invisible, false otherwise.
     * @example const isInvisible = await webActionsAPI.waitForElementToBeInVisible('#element', 5000);
     */
    async waitForElementToBeInVisible(locator, timeout = 5000) {
        try {
            const element = await $(locator);
            const isInvisible = await element.waitForDisplayed({ timeout, reverse: true });
            await this.log.info(`Element ${locator} is invisible: ${isInvisible}`);
            return isInvisible;
        } catch (error) {
            await this.log.error(`Failed to wait for element to be invisible: ${error.message}`);
            return false;
        }
    }

    /**
     * @async Wait for an HTML page to load completely.
     * @param {number} timeout - Maximum wait time in milliseconds.
     * @returns {Promise<void>}
     * @example await webActionsAPI.waitForHtmlPageToLoad(10000);
     */
    async waitForHtmlPageToLoad(timeout = 10000) {
        try {
            await browser.waitUntil(
                async () => await browser.execute(() => document.readyState === 'complete'),
                { timeout, timeoutMsg: 'Page did not load within the expected time' }
            );
            await this.log.info('HTML page loaded successfully');
        } catch (error) {
            await this.log.error(`Failed to load the HTML page: ${error.message}`);
        }
    }


    /**
     * @async Verifies if the specified element contains the expected text.
     * @param {string} locator - The WebdriverIO selector or locator of the element to check.
     * @param {string} message - The expected text that should be present within the element.
     * @returns {Promise<void>} - Resolves if the text is found; otherwise, throws an error.
     * @example await webActionsAPI.checkTextMessage('#alertMessage', 'Login successful');
     */
    async checkTextMessage(locator, message) {
        try {
            const element = await $(locator);
            await expect(element).toHaveTextContaining(message);
            await this.log.info(`Text "${message}" is found within element: ${locator}`);
        } catch (error) {
            await this.log.error(`Failed to verify text message. Expected "${message}" in ${locator}: ${error.message}`);
            throw error;
        }
    }

    /**
     * @async Verifies that the current URL matches the expected URL.
     * @param {string} expectedUrl - The URL that we expect the browser to be on.
     * @param {number} [timeout=5000] - Optional timeout in milliseconds for the URL check.
     * @returns {Promise<void>} - Resolves when the URL matches the expected URL.
     * @throws {Error} If the URL does not match within the specified timeout.
     * @example
     * await this.expectUrlToBe('https://example.com/dashboard');
     */
    async expectUrlToBe(expectedUrl, timeout = 5000) {
        try {
            await browser.waitUntil(
                async () => (await browser.getUrl()) === expectedUrl,
                {
                    timeout,
                    timeoutMsg: `Expected URL to be ${expectedUrl} but found ${await browser.getUrl()}`
                }
            );
            await this.log.info(`Successfully navigated to the expected URL: ${expectedUrl}`);
        } catch (error) {
            await this.log.error(`Failed to match the expected URL: ${error.message}`);
            throw new Error(`URL mismatch: ${error.message}`);
        }
    }


}
exports.webActionsAPI = webActionsAPI;