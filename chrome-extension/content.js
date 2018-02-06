$(document).ready(() => {
    if (isProductPage()) addListToEBayBtn();
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
    const description = encodeURIComponent($('#ContentPlaceHolder1_ProductDescription').text().replace(/&/gi, 'AND').trim().replace(/\n\s*\n/g, '\n'));
    const mainKeywords = $('.BrdcmbClk').eq(2).text().trim();
    const subKeywords = $('.BrdcmbClk').eq(1).text().trim();
    const keywords = encodeURIComponent(`${mainKeywords} ${subKeywords}`);
    const pictureURLs = encodeURIComponent($('.PrdThmbHld img')
        .map((index, element) => {
            return $(element).attr('src').replace('medium', 'big');
        }).get().join(' '));
    const siteID = '0';
    const country = 'IN';
    const postalCode = '400002';
    const priceTag = $('#ContentPlaceHolder1_SingleSP').text().split(' ');
    const currencyFromPage = encodeURIComponent(priceTag[0]);
    const priceFromPage = encodeURIComponent(priceTag[1]);
    const fixerAPIUrl = 'https://api.fixer.io/latest?symbols=INR,USD';
    const brand = $('#ContentPlaceHolder1_BrandName').text();
    const UPC = $('#ContentPlaceHolder1_ProductCode').text();
    $.get(fixerAPIUrl, data => {
        const { INR, USD } = data.rates;
        const currency = 'USD';
        const startPrice = INRToUSD(INR, USD, priceFromPage).toFixed(2);
        const query = `siteID=${siteID}&title=${title}&description=${description}&country=${country}&currency=${currency}&startPrice=${startPrice}&keywords=${keywords}&pictureURLs=${pictureURLs}&postalCode=${postalCode}&brand=${brand}&UPC=${UPC}`;
        const listItemFormUrl = `https://e-bay-lister.herokuapp.com/?${query}`;
        openInNewTab(listItemFormUrl);
    });
}

function INRToUSD(INRRate, USDRate, INRAmount) {
    const EURAmount = INRAmount / INRRate;
    const USDAmount = EURAmount * USDRate;
    return USDAmount;
}

function openInNewTab(URL) {
    const newTab = window.open(URL, '_blank');
    newTab.focus();
}