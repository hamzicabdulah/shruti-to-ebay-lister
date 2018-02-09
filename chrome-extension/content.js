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
    const itemParams = {
        productUrl: encodeURIComponent(document.URL),
        pictureURLs: encodeURIComponent($('.PrdThmbHld img')
            .map((index, element) => {
                return $(element).attr('src').replace('_medium', '');
            }).get().join(' '))
    };
    const fixerAPIUrl = 'https://api.fixer.io/latest?symbols=INR,USD';
    $.get(fixerAPIUrl, data => {
        const { INR, USD } = data.rates;
        const priceTag = $('#ContentPlaceHolder1_SingleSP').text().split(' ');
        const priceFromPage = +priceTag[1];
        itemParams.startPrice = encodeURIComponent(INRToUSD(INR, USD, priceFromPage).toFixed(2));
        const query = Object.keys(itemParams).map(param => `${param}=${itemParams[param]}`).join('&');
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