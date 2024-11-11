const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

// Function to read user data from JSON file
async function readUserData() {
    return JSON.parse(fs.readFileSync("userData.json"));
}

// Function to register a user
async function registerUser(driver, userData) {
    await driver.get("https://www.xampro.org/signup");

    await driver.findElement(By.id("name")).sendKeys(userData.fullName);
    await driver.findElement(By.id("email")).sendKeys(userData.email);
    await driver.findElement(By.id("phoneNumber")).sendKeys(userData.phone);
    await driver.findElement(By.id("password")).sendKeys(userData.password);
    await driver.findElement(By.id("confirmPassword")).sendKeys(userData.confirmPassword);

    await driver.findElement(By.className("account-access-submit-button")).click();
}

// Main function to run the tests
(async function runTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        const users = await readUserData();

        //Register each user from the JSON file
        for (const userData of users) {
            await registerUser(driver, userData);
            console.log(`Registration Successful for ${userData.fullName}`);
        }

    } finally {
        await driver.quit();
    }
})();
