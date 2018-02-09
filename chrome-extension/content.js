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
    const titleWithUPC = encodeURIComponent($('#ContentPlaceHolder1_ProductName').text());
    const mainKeywords= $('.BrdcmbClk').eq(2).text().trim();
    const subKeywords= $('.BrdcmbClk').eq(1).text().trim();
    const itemParams = {
        productUrl: encodeURIComponent(document.URL),
        title: getTitleWithoutUPC(titleWithUPC),
        keywords: encodeURIComponent(`${mainKeywords} ${subKeywords}`),
        pictureURLs: encodeURIComponent($('.PrdThmbHld img')
            .map((index, element) => {
                return $(element).attr('src').replace('_medium', '');
            }).get().join(' ')),
        siteID: '0',
        country: 'IN',
        postalCode: '400002',
        currency: 'USD',
        brand: $('#ContentPlaceHolder1_BrandName').text(),
        UPC: $('#ContentPlaceHolder1_ProductCode').text()
    };
    const fixerAPIUrl = 'https://api.fixer.io/latest?symbols=INR,USD';
    $.get(fixerAPIUrl, data => {
        const { INR, USD } = data.rates;
        const priceTag = $('#ContentPlaceHolder1_SingleSP').text().split(' ');
        const priceFromPage = encodeURIComponent(priceTag[1]);
        itemParams.startPrice = INRToUSD(INR, USD, priceFromPage).toFixed(2);
        const query = Object.keys(itemParams).map(param => `${param}=${itemParams[param]}`).join('&');
        const listItemFormUrl = `http://localhost:3000/?${query}`;
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

function getTitleWithoutUPC(titleWithUPC) {
    let indexWhereUPCEnds = 0;
    for (let i = 0; i < titleWithUPC.length; i++) {
        if (isNaN(titleWithUPC[i]) && titleWithUPC[i] !== ' ') {
            indexWhereUPCEnds = i;
            break;
        }
    }
    const title = titleWithUPC.slice(indexWhereUPCEnds);
    return title;
}