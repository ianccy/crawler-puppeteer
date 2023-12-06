const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getPrice(year) {
  puppeteer.use(stealthPlugin());

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const url =
      "https://www.wine-searcher.com/find/louis+jadot+clos+st+jacques+gevrey+chambertin+premier+cru+cote+de+nuit+burgundy+france/" +
      year +
      "/taiwan";

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

const arr = [
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1990",
  "1989",
  "1988",
  "1985",
  "1966",
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processYears() {
  for (let index = 0; index < arr.length; index++) {
    const year = arr[index];
    await getPrice(year);
    await delay(3000); // Delay for 1 second (1000 milliseconds)
  }
}

processYears();
