const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

// Function to read user data from JSON file
async function readUserData() {
    return JSON.parse(fs.readFileSync("userData.json"));
}

// Function to log in the last registered user
async function loginUser(driver, userData) {
    await driver.get("https://www.xampro.org/login");

    await driver.findElement(By.id("email")).sendKeys(userData.email);
    await driver.findElement(By.id("password")).sendKeys(userData.password);
    await driver.findElement(By.className("account-access-submit-button")).click();

}

// Main function to run the tests
(async function runTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        const users = await readUserData();

        // Log in as the last registered user
        const lastUser = users[users.length - 1];
        await loginUser(driver, lastUser);
        console.log(`Login Successful for ${lastUser.fullName}`);

    } finally {
        await driver.quit();
    }
})();
