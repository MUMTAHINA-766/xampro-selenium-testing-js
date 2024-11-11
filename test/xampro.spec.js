// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('xampro', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('xampro', async function() {
    await driver.get("https://www.xampro.org/")
    await driver.manage().window().setRect(1224, 816)
    await driver.findElement(By.css(".btn-close")).click()
    await driver.findElement(By.css(".profile-view-btn > #basic-nav-dropdown")).click()
    await driver.findElement(By.linkText("Profile")).click()
    await driver.findElement(By.id("dob")).click()
    await driver.findElement(By.id("dob")).sendKeys("2024-11-12")
    await driver.findElement(By.id("radio-gender-female")).click()
    await driver.findElement(By.css(".profile-submit-page-btn")).click()
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.close()
  })
})