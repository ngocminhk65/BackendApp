const cheerio = require('cheerio');
const fs = require('fs');
const fsx = require('fs-extra');
const https = require('https');
const path = require('path');
const minio = require('minio');
const axios = require('axios');

var minioClient = new minio.Client({
  endPoint: 'localhost',
  port: 9090,
  useSSL: false,
  bucket: 'images',
  accessKey:'X4aAwV1GcsQxmyrL1ovA',
  secretKey:'zWbA7RcKRnPwQMKzYLet6K0zGX6L4fc8wNaXpOWG'
});

const settingDefatult  =  {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "XSRF-TOKEN=eyJpdiI6ImNYRFMyTXVwNFl0dWxESmppVXNVTWc9PSIsInZhbHVlIjoiVkE5MEYrdlk3eVcrTmgwRUdSR2RFbUQwdUdWeWJDUDJlT0NXVlgxN0JSVzRVRm1TVU9xbDFpZ2VKUDcrQllMamp5UjNzQnhqNDdYays4VnllaDN2ZDJCNHhSZUxySmtvOE1hUlNvT1NPNDAwRHY2VXhZcCs1R0s5b2ptMkVQSXAiLCJtYWMiOiI4M2U0MmQ1ODRjMzNhNzU1MzQ3YzcyNDhkM2I4MWU1YWM3OTI5Yjc5MTAxMjQ0MDg0MWRmMjFjYjllYzJmMjIzIn0%3D; raw_sen_manga_session=eyJpdiI6ImZqNUt4UzYzYUtBUnhFWWtJUVpHb3c9PSIsInZhbHVlIjoiODFhMGZCOWY0NkJMSTRzVFp0S1grODE4aEV3QStqSlhYNzNxQlkwYU8xaG5VWWk3V2JkM2M4bllUS3FuejBiUDJUbmw4VzNpMjhTVmt3R05hQ0R4bEU1b0R5WlBnbUloMFg0TUE1RjREb3lWSjArTmFHQVUvNElHRnlvbGhBYVkiLCJtYWMiOiIzMmFjYmMyOGIzY2MwMmUwNTQxM2M0MWNiMzZkMzIyNWYxZGIzOTY1N2IxNzZkMWIyYTQ5M2ZiYjc1NmFjODlkIn0%3D",
    "Referer": "https://raw.senmanga.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET",
  timeout:10000
};
const getListLinkDetail = () => {
const listLinkDetail = [];
return fetch("https://raw.senmanga.com/search?genre%5B%5D=Harem&genre%5B%5D=School+Life&type=Manga&order=Added", settingDefatult).then(res => res.text()).then(html => {
  const $ = cheerio.load(html);
  const list = $('div.grid.xs\\:grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.xl\\:grid-cols-5');
  const mngDiv = list.find('div.mng');
  for (let i = 0; i < mngDiv.length; i++) {
    const element = mngDiv[i];
    const link = $(element).find('a:first').attr('href');
    listLinkDetail.push(link);
  }
  return listLinkDetail;
}).catch(err => {
  console.log(err);
}); 
}
const getChapterDetail = (data) => {
  let listLinkChapter = data.listLinkChapter;

  const name = data.name;
  if (listLinkChapter  && listLinkChapter.length < 0) {
    return;
  }

  listLinkChapter.forEach(link => {
    const listLinkImage = [];
    const chapterName = link.chapterName;
    fetch(link.link, {
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
        "cookie": "XSRF-TOKEN=eyJpdiI6InhwbEpLc1FEZi9RMUgyZVVTdlVhRmc9PSIsInZhbHVlIjoiMktVbE1YWDBCZjE4R3laYU9MRTJpTlcrZFp6M2hxNEVKbFpucjM4YWQzcWhaTHB0WDBNbG9BNERZRmtkOTIrSytkaHEwSUxRcnZ3T0RxMGxaanBFTkZYRTM5WXpRMFJqVGgvZFdCSHJhOVVhdUxDM3EvSlNmZURUbWtCS0lVaHMiLCJtYWMiOiI5ZGRkMmNkYTFhN2RhYTY3N2FjMDFlODY2N2Q1Y2FhYzNiNDUzZjdhOTgxNWVlMjg5OWU1MjI0N2UzNmY0ZGIzIn0%3D; raw_sen_manga_session=eyJpdiI6IjRBc3hWcFpiUGl3czFzL2ZTS21EYnc9PSIsInZhbHVlIjoiRUZ5TjNMZ1o1NzlmOUwyOXdldEM5ZUxDWkRwR2tKZEc3cmtpSzhHdGtGSmVpeWlqYmVqM2RyZGozTG1Pampxak0vK0ZsU0ZQWHpWbUF5SGduMXVYam1lRkd0c3FFM2RzaEJqQVZxWjFNeVpPZjhTMmVoelRzVHJZb1lPdTUzS2wiLCJtYWMiOiIzNGE2ZmUwYTdjNjg1MmY0MWU2OWZkZjk1OTgwNTYyOTliZjlmNzdiY2NiN2ZhZjVhNGQyMGZhYTE0Y2ZjMGFmIn0%3D; viewer=1",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET",
      timeout:10000
    }).then(res => res.text()).then(html => {
      const $ = cheerio.load(html);
      const listChapterImage = $('div.reader.text-center').find('img');
      if (listChapterImage.length > 0) {
        for (let index = 0; index < listChapterImage.length; index++) {
          const element = listChapterImage[index];
          const srcLinkImg = $(element).attr('src');
          listLinkImage.push(srcLinkImg);
      }
      setTimeout(async () => {
        console.log('start download image');
       await installImageFerChapter(listLinkImage, chapterName,name,link.order).then(() => {
          console.log('done');
        }).catch(err => {
          console.log(err);
        });
      }, 1000);
     
      } else {
        console.log('khong co anh');
      }

    }).catch(err => {
      console.log(err);
    });
  });
  
}
const installImageFerChapter = async (listLinkImage, chapterName,name,chapterId) => {
  const baseDir = 'file';
  const sanitizedChapterName = chapterName.replace(/\n/g, '');
  const nameDir = `${baseDir}/${name}`
  const dir = `${baseDir}/${name}/${sanitizedChapterName}`;


  // if (!fsx.existsSync(baseDir)){
  //   fsx.mkdirSync(baseDir, { recursive: true });
  // }
  // if (!fsx.existsSync(nameDir)){
  //   fsx.mkdirSync(nameDir, { recursive: true });
  // }
  
  // if (!fsx.existsSync(dir)){
  //   fsx.mkdirSync(dir, { recursive: true });
  // }
  console.log({listLinkImage});
  for (let i = 0 ; i < listLinkImage.length; i++) {
     saveImageToMinio(listLinkImage[i],name,sanitizedChapterName).then(()=>{
      const  rawListChapterImage = `INSERT into item_chap_images (chap_id,image_path, orders, created_at, updated_at) VALUES (${chapterId}, '${name}/${sanitizedChapterName}/${listLinkImage[i].split('/').pop()}', ${i},  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);\n`;
    fs.writeFile('item_chap_images.sql', rawListChapterImage, {flag: 'a'}, err => {
      if (err) {
        console.log(err);
      }
    });
     }).catch(err => {
       console.log(err);
     });
    
  }

  for (const [index, imageUrl] of listLinkImage.entries()) {
    console.log(imageUrl);
    await new Promise((resolve, reject) => {

      // const file = fs.createWriteStream(path.join(dir, `${index}.jpg`));
      // const request = https.get(imageUrl, response => {
      //   response.pipe(file);
      //   response.on('end', () => {
      //     file.end();
      //     resolve();
      // const metaType = {
      //   'Content-Type': 'image/jpeg',
      // }
      // minioClient.fPutObject('images', `${name}/${sanitizedChapterName}/${index}.jpg`, path.join(dir, `${index}.jpg`), metaType, (err, etag) => {
      //   if (err) {
      //     console.log(err);
      //     reject(err);
      //   } else {
      //     console.log('File uploaded successfully.');
      //     resolve(etag);
      //   }
      // });
      //   });
      // });


      // request.on('error', (err) => {
      //   fs.unlink(path.join(dir, `${index}.jpg`), () => {});
      //   reject(err);
      // });

    });
  }
}
const saveImageToMinio = async (singleLink, nameManga = "", sanitizedChapterName = "", index) => {
  const name = singleLink.split('/').pop();
  const localPath = path.join(__dirname, name);

  //waiting to image download successfully


  try {
    // Download the image
    const response = await axios({
      url: singleLink,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(localPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', async () => {
        writer.close(); // Ensure the file is closed before uploading

        // Save the image to Minio
        const metaType = {
          'Content-Type': 'image/jpeg',
        }

        const uploadPath = nameManga && sanitizedChapterName ? `${nameManga}/${sanitizedChapterName}/${name}` : name;

        minioClient.fPutObject('images', uploadPath, localPath, metaType, (err, etag) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('File uploaded successfully.');
            resolve(etag);
          }
        });
      });

      writer.on('error', (err) => {
        console.log(err);
        writer.close();
        reject(err);
      });
    });
  } catch (err) {
    console.log('Error downloading the image:', err);
  }
};

const getListChapter = (link,itemInsertRawQuery,itemId) => {
  return fetch (link, settingDefatult).then(res => res.text()).then(async html => {
    const $ = cheerio.load(html);
    const name = $('h1.series').text();
    const description = $('div.summary').find('p:first').text();
    const image = $('div.cover').find('img').attr('src');
    await saveImageToMinio(image);
    // install image and send it to minio
    

    const listLi = $('ul.chapter-list').find('li');
    itemInsertRawQuery += `(${`${name}`}', '${`${description}`}', '${image}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;
    // wirte to item.sql
    fs.writeFile('item.sql', itemInsertRawQuery +`\n`, {flag: 'a'}, err => {
      if (err) {
        console.log(err);
      }
    });
    const listLinkChapter = [];
    for (let i = 0; i < listLi.length; i++) {
      let itemChapRawQuery = `INSERT into item_chaps (item_id, Identification_code, name, orders, is_delete, created_at, updated_at) VALUES `;
      const element = listLi[i];
      const link = $(element).find('a:first').attr('href');
      const chapterName = $(element).find('a:first').text();
      console.log(link, chapterName);

      const mangaObject = {
        link: link || '',
        chapterName: chapterName || '',
        // description:description || '',
        order: i || 1,
        image: image || '',
        itemId:itemId || 1
      };
      itemChapRawQuery += `(${itemId}, '1', '${mangaObject.chapterName}', ${mangaObject.order}, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;
      fs.writeFile('item_chaps.sql', itemChapRawQuery +'\n', {flag: 'a'}, err => {
        if (err) {
          console.log(err);
        }
      });
     
      listLinkChapter.push(mangaObject);
    }
    return {
      name,
      description,
      listLinkChapter
    };
  }).catch(err => {
    console.log(err);
  });
}
const main = async () => {
 const links = await getListLinkDetail();
 for (let index = 0; index < 1; index++) {
  let itemInsertRawQuery = `INSERT INTO items (title, description, image,is_delete, created_at, updated_at) VALUES `;
  // const data = await getListChapter('https://raw.senmanga.com/zense-deshi-ni-korosareta-majo-desu-ga-norowareta-deshi-ni-ai-ni-ikimasu',itemInsertRawQuery,index);
  const data = await getListChapter('https://raw.senmanga.com/isekai-teni-shitara-aiken-ga-saikyou-ni-narimashita-silver-fenrir-to-ore-ga-isekai-kurashi-wo-hajimetara',itemInsertRawQuery,index);
   // break;
   getChapterDetail(data);
 }
}
main();