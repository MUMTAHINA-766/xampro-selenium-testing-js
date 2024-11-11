const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

// Function to read user data from JSON file
async function readUserData() {
    return JSON.parse(fs.readFileSync("userData.json"));
}

// Function to register a user
// async function registerUser(driver, userData) {
//     await driver.get("https://www.xampro.org/signup");

//     await driver.findElement(By.id("name")).sendKeys(userData.fullName);
//     await driver.findElement(By.id("email")).sendKeys(userData.email);
//     await driver.findElement(By.id("phoneNumber")).sendKeys(userData.phone);
//     await driver.findElement(By.id("password")).sendKeys(userData.password);
//     await driver.findElement(By.id("confirmPassword")).sendKeys(userData.confirmPassword);

//     await driver.findElement(By.className("account-access-submit-button")).click();
// }

// Function to log in the last registered user
async function loginUser(driver, userData) {
    await driver.get("https://www.xampro.org/login");

    await driver.findElement(By.id("email")).sendKeys(userData.email);
    await driver.findElement(By.id("password")).sendKeys(userData.password);
    await driver.findElement(By.className("account-access-submit-button")).click();

}

// Function to update profile details
 async function updateProfile(driver, userData) {

     await driver.get("https://www.xampro.org");
     await driver.findElement(By.className("splash-screen-header modal-header")).click(); 
     await driver.findElement(By.className("navbar-login-btn nav-link")).click(); 

     await driver.findElement(By.id("email")).sendKeys("mumtahinaparvin2@outlook.com");
     await driver.findElement(By.id("password")).sendKeys("12345678");
     await driver.findElement(By.className("account-access-submit-button")).click()
     
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
   
    await driver.findElement(By.id("radio-gender-male")).click();  // Assuming genderMale is the ID for the male radio button or dropdown option
    await driver.findElement(By.id("radio-gender-female")).click();  // Assuming genderFemale is the ID for the female radio button or dropdown option

    await driver.findElement(By.className("profile-submit-page-btn btn btn-primary")).click();
}

// Main function to run the tests
(async function runTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        const users = await readUserData();

        // Register each user from the JSON file
        // for (const userData of users) {
        //     await registerUser(driver, userData);
        //     console.log(`Registration Successful for ${userData.fullName}`);
        // }

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
