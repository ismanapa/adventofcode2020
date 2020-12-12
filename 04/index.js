const fs = require('fs');
const inputFile = './input.txt';


fs.readFile(inputFile, 'utf8', (err, data) => {

  let validPassports = 0;
  const dataArray = data.split('\r\n');
  const dataGrouped = [];
  let tempData = {};
  dataArray.forEach(data => {
    if (data === '') {
      dataGrouped.push(tempData);
      tempData = {};
    } else {
      data
        .split(' ')
        .forEach(d => {
          const match = d.match(/([a-z]*:[\d\D]*)/);
          match.forEach(m => {
            const mathSplitted = m.split(':');
            tempData[mathSplitted[0]] = mathSplitted[1];
          });
        });
    }
  });

  console.log('---------------- PART 1 ----------------');
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  dataGrouped.forEach(d => {
    const intersections = requiredFields.filter(x => Object.keys(d).indexOf(x) !== -1);
    if (intersections.length === requiredFields.length) {
      validPassports++;
    }
  });
  console.log('part1', validPassports);

  console.log('---------------- PART 2 ----------------');
  validPassports = 0;
  dataGrouped.forEach(d => {
    const intersections = requiredFields.filter(x => Object.keys(d).indexOf(x) !== -1);
    if (intersections.length === requiredFields.length) {
      const validation = Object.keys(d).map(passportField => {
        let value = d[passportField];
        switch (passportField) {
          case 'byr':
            value = parseInt(value);
            return value >= 1920 && value <= 2002;
          case 'iyr':
            value = parseInt(value);
            return value >= 2010 && value <= 2020;
          case 'eyr':
            value = parseInt(value);
            return value >= 2020 && value <= 2030;
          case 'hgt':
            if (value.includes('cm')) {
              value = parseInt(value.split('cm')[0]);
              return value >= 150 && value <= 193;
            } else if (value.includes('in')) {
              value = parseInt(value.split('in')[0]);
              return value >= 59 && value <= 76;
            }
          case 'hcl':
            return /^#[a-f0-9]{6}$/.test(value);
          case 'ecl':
            return 'amb blu brn gry grn hzl oth'.split(' ').includes(value);
          case 'pid':
            return /^[0-9]{9}$/.test(value);
          default:
            return true;
        }
      });

      if (validation.every(x => x)) {
        validPassports++;
      }
    }
  });
  console.log('part2', validPassports);
});
