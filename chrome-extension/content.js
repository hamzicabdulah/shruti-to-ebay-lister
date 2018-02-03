$(document).ready(() => {
    console.log('Shruti Page');
    if (isProductPage()) {
        console.log('Shruti Product Page');
        addListToEBayBtn();
    }
});

function isProductPage() {
    const addToCartBtn = $('.AddToCartBtn');
    return !!addToCartBtn.length;
}

function addListToEBayBtn() {
    const listOnEBayBtn = `<div class='AddToCartBtn'>LIST ITEM ON EBAY</div>`;
    const btnsContainer = $('.PrdAddCrtBtnCont');
    btnsContainer.append(listOnEBayBtn);
    $('.AddToCartBtn').click(listItem);
}

function listItem() {
    const title = encodeURIComponent($('#ContentPlaceHolder1_ProductName').text());
    const description = encodeURIComponent($('#ContentPlaceHolder1_ProductDescription').text());
    const priceTag = $('#ContentPlaceHolder1_SingleSP').text().split(' ');
    const currency = encodeURIComponent(priceTag[0]);
    const startPrice = encodeURIComponent(priceTag[1]);
    const mainKeywords = $('.BrdcmbClk').eq(2).text();
    const subKeywords = $('.BrdcmbClk').eq(1).text();
    const keywords = encodeURIComponent(`${mainKeywords} ${subKeywords}`);
    const pictureURLs = encodeURIComponent($('.PrdThmbHld img')
        .map((index, element) => {
            return $(element).attr('src').replace('medium', 'big');
        }).get().join(' '));
    const siteID = '203';
    const country = 'IN';
    const query = `siteID=${siteID}&title=${title}&description=${description}&country=${country}&currency=${currency}&startPrice=${startPrice}&keywords=${keywords}&pictureURLs=${pictureURLs}`;
    const listItemFormUrl = `http://localhost:3000/?${query}`;
    window.location.href = listItemFormUrl;
}