const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getPrice() {
  puppeteer.use(stealthPlugin());

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const url =
      "https://www.wine-searcher.com/find/louis+jadot+clos+st+jacques+gevrey+chambertin+premier+cru+cote+de+nuit+burgundy+france/2018/taiwan";

    await page.goto(url);

    // 使用 page.$eval 選擇元素並獲取價格信息
    const price = await page.$eval(
      ".product-details__avg-price-global .price",
      (element) => element.textContent.trim()
    );

    console.log(`產品價格: ${price}`);
  } catch (error) {
    console.error("發生錯誤:", error);
  } finally {
    await browser.close();
  }
}

getPrice();
