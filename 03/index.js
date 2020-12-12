const fs = require('fs');

const inputFile = './input.txt';

const treeSymbol = '#';

fs.readFile(inputFile, 'utf8', (err, data) => {
    const dataArray = data.split('\r\n');

    console.log('---------------- PART 1 ----------------');
    let trees = 0;
    let currentPosition = 1;
    dataArray.forEach(data => {
        const element = data.charAt(currentPosition - 1);
        if (element === treeSymbol) {
            trees++;
        }
        currentPosition = (currentPosition + 3) > data.length ? ((data.length - (currentPosition + 3))) * -1 : currentPosition + 3;
    });
    console.log('part1', trees);

    console.log('---------------- PART 2 ----------------');
    const slopes = [
        { down: 1, right: 1, trees: 0, currentPosition: 1 },
        { down: 1, right: 3, trees: 0, currentPosition: 1 },
        { down: 1, right: 5, trees: 0, currentPosition: 1 },
        { down: 1, right: 7, trees: 0, currentPosition: 1 },
        { down: 2, right: 1, trees: 0, currentPosition: 1 },
    ]
    dataArray.forEach((data, index) => {
        slopes.forEach(slope => {
            if ((index) % slope.down === 0) {
                const element = data.charAt(slope.currentPosition - 1);
                if (element === treeSymbol) {
                    slope.trees++;
                }
                slope.currentPosition = (slope.currentPosition + slope.right) > data.length ? ((data.length - (slope.currentPosition + slope.right))) * -1 : slope.currentPosition + slope.right;
            }
        });
    });
    console.log(slopes);
    console.log('part2', slopes.reduce((acc, slope) => slope.trees * acc, 1))
});
