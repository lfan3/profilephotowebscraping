# profilephotowebscraping

## purpose: 
to create a web scraping app to get 500 profile's photos and download them

## tools: node.js, cheerio.js, axios

## functions:
### scraping a model website to get the images
- if we know the all the photo url, we can do with certainUrlScrapping.js, otherwise with uncertainUrlScraping by trying most possible userId
- then we store all the url in the photoPath file
### download all the images from the photo url
- dowload the image from url, and check si all the url has an image, if there is no image, we delete the url in the photoPath file

