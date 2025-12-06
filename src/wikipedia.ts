import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

async function fetchHtml(url: string) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Wikipedia-Speedrun-Bot/1.0'
        }
    })
    return response.text()
}

export async function getAllValidLinks(pageUrl: string) {
    const html = await fetchHtml(pageUrl)
    const $ = cheerio.load(html)
    const content = $('div.mw-content-ltr.mw-parser-output').first()
    const baseUrl = 'https://en.wikipedia.org'

    const links = new Set<string>()
    content.find('a').each((_, element) => {
        const href = $(element).attr('href')
        if (href && href.startsWith('/wiki/') && !href.includes(':')) {
            links.add(`${baseUrl}${href}`)
        }
    })

    return Array.from(links)
}
