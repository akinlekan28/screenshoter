const asyncHandler = require('../middleware/async');
const puppeteer = require('puppeteer');

exports.getImage = asyncHandler(async (req, res, next) => {
  const { url } = req.query;

  try {
    const browser = await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Take a screenshot and get it as a buffer
    const screenshotBuffer = await page.screenshot();

    await browser.close();

    // Set the content type to image/png and send the buffer as the response
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    res.redirect(
      'https://res.cloudinary.com/djnhrvjyf/image/upload/v1600693421/q_auto,f_auto/pexels-pixabay-355952_hfuvok.jpg'
    );
  }
});
