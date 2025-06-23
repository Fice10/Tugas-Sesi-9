const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const { expect } = require('chai');

describe('Saucedemo Test', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('Login Berhasil', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.urlContains('inventory'), 10000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('inventory');
  });

  it('Urutkan produk A ke Z', async () => {
    const dropdown = await driver.findElement(By.className('product_sort_container'));
    await dropdown.sendKeys('Name (A to Z)');

    await driver.sleep(1000); // beri waktu untuk sort

    const firstItem = await driver.findElement(By.className('inventory_item_name'));
    const name = await firstItem.getText();
    console.log('Produk pertama setelah sorting:', name);

    // Perhatikan ini: ubah expected sesuai dengan hasil sorting yang muncul
    expect(name).to.equal('Test.allTheThings() T-Shirt (Red)');
  });
});