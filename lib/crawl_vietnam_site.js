const cheerio = require('cheerio');
const crawlSingleManga = () => {

fetch("https://www.nettruyenus.com/truyen-tranh/toi-nhat-duoc-1-co-gai-va-bien-co-ay-tro-thanh-nguoi-hanh-phuc-nhat-the-gian-289000", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Referer": "https://www.nettruyenus.com/tim-truyen",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}).then(res => res.text()).then(html => {
    const $ = cheerio.load(html);
    const element = $('article.item-detail');
    const title = element.find('h1.title-detail:first').text();
    const description = element.find('div.detail-content').find('p:first').text();
    console.log(title,description);
}).catch(err => {
  console.log(err);
});
}
crawlSingleManga();