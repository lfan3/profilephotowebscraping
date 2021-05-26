const Cheerio = require('cheerio');
const MenIds = require('./userId').menId
const Axios = require('axios');



function generateRequestArray(ids){
    var array = [];
    array = ids.map(i => Axios.get(`https://www.gangz.io/fr/profil/${i}`))

    return array;
}

var requestarr = generateRequestArray(MenIds);

Axios.all(requestarr)
.then(Axios.spread((...response)=>{
    let imgSrc = [];
    imgSrc = response.map(r =>{
        let $ = Cheerio.load(r.data);
        return $('.profile__image-container').children('img').eq(0).attr('src');
    })
})).catch(e => console.error(e))

//data base id
//put into cloudify