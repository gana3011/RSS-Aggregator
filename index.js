#!/usr/bin/env node

import { Command } from "commander";
import axios from "axios";
import xml2js from 'xml2js';
import {pool} from './database.js';

const program = new Command();

program.name("rss").option("-u, --url <url>", "URL of RSS feed");

program.parse(process.argv);

const options = program.opts();

const response = await axios.get(options.url);

var parser = new xml2js.Parser({explicitArray:false});

const result = await parser.parseStringPromise(response.data);

const id = result.feed["yt:channelId"];
console.log(id);

const channelUrl = result.feed.author.uri;
console.log(channelUrl);

const channelName = result.feed.author.name;

try {
    const feed = await pool.query("insert into feeds (channelid,url,title) values($1,$2,$3)",[id,channelUrl,channelName]);
} catch (error) {
    console.error(error.message);
}

const entries = result.feed.entry;

entries.forEach(async (entry) => {
  const link = entry.link.$.href; 
  const mediaGroup = entry["media:group"];
  const mediaCommunity = mediaGroup["media:community"];
  const mediaStatistics = mediaCommunity["media:statistics"];
  const views = mediaStatistics.$.views;
  const videoId = entry["yt:videoId"]; 
  const title = entry.title;
  const publishedAt = entry.published;
  const thumbnailUrl = mediaGroup["media:thumbnail"].$.url;

  try {
    const video = await pool.query("insert into videos(channelid,videoid,title,link,publishedAt,thumbnailUrl,views) values ($1,$2,$3,$4,$5,$6,$7)",[id, videoId, title, link, publishedAt, thumbnailUrl, views]);
    console.log(video.rows[0]);
  } catch (error) {
    console.error(error.message);
  }

//   console.log(`
//     title: ${entry.title},
//     link: ${link},
//     views: ${views},
//     publishedOn: ${entry.published};
//   `);
});
// console.dir(entries);


