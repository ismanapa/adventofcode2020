const fs = require('fs');
const inputFile = './input.txt';

const getNumeberOfRange = (lowerRange, upperRange, indexes) => {
  indexes.forEach(i => {
    switch (i) {
      case 'F':
      case 'L':
        upperRange = Math.floor(upperRange - ((upperRange - lowerRange) / 2));
        break;

      case 'B':
      case 'R':
        lowerRange = Math.ceil(lowerRange + ((upperRange - lowerRange) / 2));
        break;
    }
    // console.log({ lowerRange, upperRange })
  });
  return upperRange;
};

let highestSeat = 0;
const seats = [];

fs.readFile(inputFile, 'utf8', (err, data) => {
  const dataArray = data.split('\r\n');

  dataArray.forEach((d) => {
    const values = d.split('');

    const rowIndexes = values.slice(0, 7);
    const row = getNumeberOfRange(0, 127, rowIndexes);

    const numberIndexes = values.slice(7, 10);
    const number = getNumeberOfRange(0, 7, numberIndexes);

    const id = row * 8 + number;
    seats.push(id);
    highestSeat = highestSeat > id ? highestSeat : id;
  });

  console.log({ highestSeat });

  const sortedSeats = seats.sort((a, b) => a - b);

  sortedSeats.forEach((x, i) => {
    if (sortedSeats[x + 1] !== undefined) {
      const expectedNext = sortedSeats[x] + 1;
      const effectiveNext = sortedSeats[x + 1];

      if (expectedNext !== effectiveNext) {
        console.log({ expectedNext });
      }
    }
  });
});