import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import xml2js from 'xml2js';

const app = express();

app.use(bodyParser.json());

app.post("/channel", async(req,res)=>{
    const {url} = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).send({ error: "Invalid or missing 'url' in request body." });
    }
    try {
        const response = await axios.get(url);
        const parser = new xml2js.Parser({explicitArray:false});
        const result = await parser.parseStringPromise(response.data);
        const id = result.feed["yt:channelId"];
        const channelUrl = result.feed.author.uri;
        const channelName = result.feed.author.name;
        res.send({id,channelUrl,channelName});
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: "Unable to fetch"});
    }
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})