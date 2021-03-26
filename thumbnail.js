import { firefox } from 'playwright-firefox';
import handler from 'serve-handler';
import { createServer } from 'http';
import { promisify } from 'util';

const width = 1080;
const height = 1080;
const port = 3000;

const server = createServer(async (request, response) => {
    await handler(request, response, {
        cleanUrls: true,
        public: 'public'
    });
});

const listen = promisify(server.listen.bind(server));

(async () => {
    await listen(port);

    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width, height });
    await page.goto(`http://localhost:${port}`);

    await page.$('#canvas');
    await page.screenshot({ path: `public/thumbnail.png` });
    await browser.close();

    server.close(() => {
        console.log('Thumbnail generated!');
        process.exit(0);
    });
})();
