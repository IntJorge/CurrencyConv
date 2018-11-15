import axios from 'axios';

const API_KEY = '32f175a857a01c5aa8f1bb6eeb15cb6e';

const parseAndConvert = ({ value, from, to, data }) => {
    const source = 'USD';
    const quotes = data.quotes;
    const key = `${from}${to}`;

    const rate = quotes[key];

    if (rate !== undefined) {
        return (value*rate).toFixed(2);
    }

    return 1;
}

const ApiHelper = {
    convertCurrencies: ({ value, fromCurr, toCurr, onSuccess, onError }) => {
        axios.get(`http://apilayer.net/api/live?access_key=${API_KEY}`)
        .then(function (response) {
            // console.log(response);
            const converted = parseAndConvert({ value, from: fromCurr, to: toCurr, data: response.data });
            onSuccess && onSuccess(converted);
        })
        .catch(function (error) {
            console.log(error);
            onError && onError(error);
        });
    },
};


export default ApiHelper;