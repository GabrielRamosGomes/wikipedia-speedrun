import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

console.log("Hello, Wikipedia Speedrun!");

const BASE_URL = "https://en.wikipedia.org";

const START_URL = `${BASE_URL}/wiki/Duolingo`;
const TARGET_URL = `${BASE_URL}/wiki/Philosophy`;

async function getAllValidLinks(pageUrl: string) {
    const html = (await fetch(pageUrl)).text();
    const $ = cheerio.load(await html);
    const content = $('div.mw-content-ltr.mw-parser-output').first();

    const links = new Set<string>();
    content.find('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('/wiki/') && !href.includes(':')) {
            links.add(href);
        }
    });

    return Array.from(links);
}

await getAllValidLinks(START_URL);
