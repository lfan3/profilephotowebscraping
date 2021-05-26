const Cheerio = require('cheerio');
const MenIds = require('./userId').menId
const Axios = require('axios');
const Fs = require('fs');
/**
 * the belowing function reflect and Promise all allow the promise all continue to execute even there is an error happens *
 */

var radomArr = generateRadomArray();

const reflect = p => p.then(res =>{
    let $ = Cheerio.load(res.data);
    let imgSrc = $('.profile__image-container').children('img').eq(0).attr('src');
    return ({v : imgSrc, status: "fulfilled" })
}, e => ({e, status: "rejected" }));

Promise.all(radomArr.map(reflect)).then(function(results){
    var success = results.filter(x => x.status === "fulfilled" && x.v);
    var imgSrc = success.map(x=>x.v);
    const writeStream = Fs.createWriteStream('photoPath', {
        flags: 'a'
    });
    const pathName = writeStream.path;

    console.log('photo number ', imgSrc.length)

    imgSrc.forEach(value => writeStream.write(`${value},\n`));
    // writeStream.on('finish', () => {
    //     console.log(`wrote all the array data to file ${pathName}`);
    //  });
    // writeStream.on('error', (err) => {
    //     console.error(`There is an error writing the file ${pathName} => ${err}`)
    // });
});

function generateRadomArray(){
    let arr = [];
    for(let i = 20000; i< 20200; i++){
        arr.push(Axios.get(`https://www.gangz.io/fr/profil/${i}`))
    }
    return arr;
}