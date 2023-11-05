const cheerio = require('cheerio');

const makeSQLInsertToCategory = (name, link) => {
    fetch("https://raw.senmanga.com/", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "viewer=1; XSRF-TOKEN=eyJpdiI6IjM1OFdCYXBqT0Nmd2c3c2ZYVjcvZXc9PSIsInZhbHVlIjoiZi9vL2RFZk1mc1BLV1kxanAzNjJwaEhZaG1vdmxmbFFUSEJyTU9adkYvMzJqeG9NdU9zUTlCWTN4dy9WdFBxM3VxYzRFajZqLzBxNlA0TnA2eW0wdEQrZkFoeGxVMmxnbEYwaVpXOHBuZnpsd2s4THZNZmFTUFl1N0E3MGNKZmwiLCJtYWMiOiI4Y2NmODE0ZDhmMmU1N2Q3NzY3NWY0MjU2N2JmZmU5YzQyNjA2YzhlZTQ5MzBmYTVlOTI3NDk3NDQ3ZGRjMTc4In0%3D; raw_sen_manga_session=eyJpdiI6Imx1OURYdk5iTjlUcmVzZTkrSWlCMFE9PSIsInZhbHVlIjoiY2NmV3VwTUVCb3lFWTUxd0tBeVZCYm1SNE9Dd2t4ZStLRG1aSE1Xa2ZIS3dXeituQ1Fmd3lyaXlkeDVoUGRjeC9qcndyRm42NUZTYUwwUEh0WHJLdzNqREZkWGwwZTJhaHl2K0pibzVadDk1WFhyb05Gb0JEelJjUzlCcFd5SmMiLCJtYWMiOiI0NGZiMjViZjk2ZGNjZjk1NDhmODM3MzE1MmExYjA1ZmNiYWQwOTU1ZDhkZjJjNDNiYTQyNTZlNThiOTYxZDQ2In0%3D"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}).then((res)=> res.text()).then(html => {
    const $ = cheerio.load(html);
    const items = [];
    let query = `INSERT INTO categorys (name, slug , link) VALUES `;
    $('ul.genre li').each((index, element) => {
        const name = $(element).find('a').text();
        const link = $(element).find('a').attr('href');
        const nameI = name.replace(/\n/g, '');
        // delete host name in link
        const linkSaved = link.replace('https://raw.senmanga.com', '');
        items.push({nameI, linkSaved});
    });
    for (let i = 0 ; i < items.length; i++) {
        query += `('${items[i].nameI}', '${items[i].nameI}', '${items[i].linkSaved}')`;
        if (i < items.length - 1) {
            query += ',';
        }
    }
    console.log(query);

    

})
}
makeSQLInsertToCategory();