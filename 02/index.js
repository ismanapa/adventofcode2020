const fs = require('fs');

const inputFile = './input.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
    let password = 0;
    const dataArray = data.split('\r\n');

    console.log('---------------- PART 1 ----------------');
    dataArray.forEach(d => {
        const row = d.split(':');
        const rule = row[0].split(' ');
        const char = rule[1];
        const minApper = rule[0].split('-')[0];
        const maxApper = rule[0].split('-')[1];

        const word = row[1];

        const appears = (word.match(new RegExp(char, 'g')) || []).length;
        if (minApper <= appears && maxApper >= appears) {
            // console.log(d);
            password++;
        }
    });
    console.log('part 1', password);

    console.log('---------------- PART 2 ----------------');
    password = 0;
    dataArray.forEach(d => {
        const row = d.split(':');
        const rule = row[0].split(' ');
        const char = rule[1];
        const firstPosition = rule[0].split('-')[0];
        const secondPosition = rule[0].split('-')[1];

        const word = row[1];

        if (
            word.charAt(firstPosition-1) === char && word.charAt(secondPosition-1) !== char
            ||
            word.charAt(firstPosition-1) !== char && word.charAt(secondPosition-1) === char
        ) {
            password++;
        }

    });
    console.log('part 2', password);

});
