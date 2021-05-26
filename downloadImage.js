const Fs = require('fs') ;
const Path = require('path');
const Axios = require('axios');
const photos = require('./photoPath').photos;

async function downloadImg(url){
    const image = Path.basename(url)
    const path = Path.resolve(__dirname, './images', image);
    const writer = Fs.createWriteStream(path);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)

    return new Promise((resolve, reject)=>{
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

let urls = [...photos]

function loopImage(urls){
    urls.forEach(url=> {
        downloadImg(url).then(res => res).catch(e=> console.error(e.response.config))
    });
}

loopImage(urls)

