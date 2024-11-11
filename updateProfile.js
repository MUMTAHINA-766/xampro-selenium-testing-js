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

// Function to update profile details
 async function updateProfile(driver, userData) {

    //  await driver.get("https://www.xampro.org");
    //  await driver.findElement(By.className("splash-screen-header modal-header")).click(); 
    //  await driver.findElement(By.className("navbar-login-btn nav-link")).click(); 

    //  await driver.findElement(By.id("email")).sendKeys("mumtahinaparvin2@outlook.com");
    //  await driver.findElement(By.id("password")).sendKeys("12345678");
    //  await driver.findElement(By.className("account-access-submit-button")).click()
    
    await driver.get("https://www.xampro.org/profile");

    await driver.findElement(By.id("email")).sendKeys(userData.email);
    await driver.findElement(By.id("password")).sendKeys(userData.password);
    await driver.findElement(By.className("account-access-submit-button")).click();

     
     await driver.findElement(By.className("btn-close")).click()
     await driver.findElement(By.css(".profile-view-btn > #basic-nav-dropdown")).click()
     await driver.findElement(By.linkText("Profile")).click()

    await driver.findElement(By.id("fullName")).clear();
    await driver.findElement(By.id("fullName")).sendKeys("mpa");
    // Update Date of Birth
    await driver.findElement(By.id("dob")).clear();
    await driver.findElement(By.id("dob")).sendKeys(19);
    await driver.findElement(By.id("dob")).sendKeys(12);
    await driver.findElement(By.id("dob")).sendKeys(1999);

    // Select Gender
   
    await driver.findElement(By.id("radio-gender-male")).click();  
    await driver.findElement(By.id("radio-gender-female")).click();  

    await driver.findElement(By.className("profile-submit-page-btn btn btn-primary")).click();
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

        // Update profile for the logged-in user
        await updateProfile(driver, lastUser);
        console.log(`Profile Updated Successfully for ${lastUser.fullName}`);

    } finally {
        await driver.quit();
    }
})();
