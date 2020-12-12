const fs = require('fs');

const inputFile = './input.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
    const dataArray = data.split('\r\n').map(x => parseInt(x));

    //Part 1
    console.log('---------------- PART 1 ----------------');
    dataArray.forEach(firstMember => {
        dataArray.forEach(secondMember => {
            const result = firstMember + secondMember;
            if (result === 2020) {
                console.log(firstMember, secondMember, firstMember * secondMember);
            }
        });
    });


    //Part 2
    console.log('---------------- PART 2 ----------------');
    dataArray.forEach(firstMember => {
        dataArray.forEach(secondMember => {
            dataArray.forEach(thirdMember => {
                const result = firstMember + secondMember + thirdMember;
                if (result === 2020) {
                    console.log(firstMember, secondMember, thirdMember, firstMember * secondMember * thirdMember);
                }
            });
        });
    });

});
