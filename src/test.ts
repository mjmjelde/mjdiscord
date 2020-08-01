import * as config from "config";
import { Radarr } from './lib/radarr';
import axios from 'axios';
import { load } from 'cheerio';

async function test() {
  axios('https://www.beeradvocate.com/search/?q=Marvelroast').then((resp) => {
    console.log(resp.request.res.responseUrl);
    const $ = load(resp.data);
    const parentDiv = $('meta');
    parentDiv.filter((index, elem) => elem.attribs['property'] && elem.attribs['property'] == "og:url"); 
    // console.log(parentDiv.children());
  })
}

function getBeer(name: string): Promise<Beer> {
  return new Promise<Beer>((resolve, reject) => {
    const searchURL = `https://www.beeradvocate.com/search/?q=${name}`;
    axios(searchURL).then((resp) => {
      if (resp.request.res.responseUrl.includes("search")) {
        console.log("Search results page");
        return parseSearchPage(resp.data).then(beer => resolve(beer)).catch(err => reject(err));
      } else {
        return resolve(parseBeerPage(resp.data));
      }
    })
  });
}

function parseSearchPage(html: string): Promise<Beer> {
  const $ = load(html);
  const firstBeer = $('#ba-content > div:nth-child(3) > div:nth-child(1) > a:nth-child(1)').attr('href');
  return new Promise<Beer>((resolve, reject) => {
    axios(`https://www.beeradvocate.com${firstBeer}`).then((resp) => {
      resolve(parseBeerPage(resp.data));
    }).catch((err) => {
      reject("Unable to find first beer page");
    });
  });
}

function parseBeerPage(html: string): Beer {
  const $ = load(html);
  const titles = $('.beerstats > dt');
  const values = $('.beerstats > dd');
  let style, abv, brewer, location, score;
  titles.each((index: number, elem: CheerioElement) => {
    const text = $(elem).text().toLowerCase();
    if (text.includes("style")) {
      style = $(values[index]).text().trim().replace(/Ranked #[0-9]+/, "");
    } else if (text.includes("abv")) {
      abv = parseFloat($(values[index]).text().replace(/%/, ""));
    } else if (text.includes("from")) {
      brewer = $(values[index]).text().trim();
      location = $(values[index + 1]).text().trim();
    } else if (text.includes("score")) {
      score = $(values[index]).text().trim().replace(/Ranked #[0-9,]+/, "");
    }
  });
  console.log();
  const url = Array.from($('meta')).filter(elem => elem.attribs['property'] && elem.attribs['property'] == 'og:url')[0].attribs['content'];
  console.log(url);
  return {
    name: $('h1').first().contents()[0].data,
    img: $('#main_pic_norm > div > img').attr('src'),
    style,
    abv,
    brewer,
    location,
    score
  }
}

interface Beer {
  name: string;
  img: string;
  style: string;
  abv: number;
  brewer: string;
  location: string;
  score: number;
}

// test();
getBeer("Marvel Roast").then(beer => console.log(beer));
getBeer("Marvelroast").then(beer => console.log(beer));
