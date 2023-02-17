/** Desc : A Node js Based Indonesian Bank Account Checker */
/** Author : Al FIKRI KM (Al-User12) */

const request = require('request');
const cheerio = require('cheerio');

/** Define Bank Name */

const bankName = [
    "BCA",
    "Blu By BCA",
    "BNI",
    "BRI",
    "Mandiri",
    "CIMB Niaga",
    "Permata",
    "Danamon",
    "Bank DKI",
    "BTPN/Jenius",
    "Bank NOBU",
    "Bank Jago",
    "Line Bank",
    "LinkAja!",
    "GoPay",
    "OVO",
    "DANA"
];

/** Define Bank Mapping */

const bank = {
    "BCA": "bca",
    "Blu By BCA": "royal",
    "BNI": "bni",
    "BRI": "bri",
    "Mandiri": "mandiri",
    "CIMB Niaga": "cimb",
    "Permata": "permata",
    "Danamon": "danamon",
    "Bank DKI": "dki",
    "BTPN/Jenius": "tabungan_pensiunan_nasional",
    "Bank NOBU": "nationalnobu",
    "Bank Jago": "artos",
    "Line Bank": "hana",
    "LinkAja!": "linkaja",
    "GoPay": "gopay",
    "OVO": "ovo",
    "DANA": "dana",
}

/** Get The Bank Choise From User */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Choose Bank From List ${bankName} : `, (accountBank) => {
    if (accountBank in bank) {
        console.log(`You Choose ${accountBank} Bank`);
        readline.question(`Enter Your Account Number : `, (accountNumber) => {
            console.log(`Checking Your Account Number ${accountNumber} in ${accountBank} Bank`);
            checkAccount(accountBank, accountNumber);
            readline.close();
        });
    } else {
        console.log(`Bank Name ${accountBank} Not Found`);
        readline.close();
    }
});

/** Send API Request */

function checkAccount(accountBank, accountNumber) {
    const url = 'https://cekrek.heirro.dev/api/check';
    const params = {
        accountBank: bank[accountBank],
        accountNumber: accountNumber
    };
    request.post({ url: url, form: params }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            const $ = cheerio.load(body);
            const accountInfo = $('body').text();
            console.log(accountInfo);
        }
    });
}