let arr = new Array(1, 2, 3);
// console.log(arr);

let arr2 = new Array(3);
// console.log(arr2);

// arr2 = arr;

for (let i = 0; i < arr2.length; i++) {
    arr2[i] = i + 1;
}
// console.log(arr2);

const width = 5;
const height = 3;

const field2D = new Array(height).fill("0").map(e => new Array("░", "░"));
// console.log(field2D);

// for (let i = 0; i < height; i++) {
//     console.log(`index at ${i} has an array of : [${field2D[i]}].`);
// }

const fieldCharacter = "░";
const hole = "O";

const field2Dv2 = new Array(height).fill("0").map(e => new Array(width));
console.log(field2Dv2);

let limit = Math.round((Math.random() * 0.1 + 0.1) * 10) / 10;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const ceiling = Math.round(Math.random() * 10) / 10;
        field2Dv2[y][x] = limit < ceiling ? fieldCharacter : hole;
    }
}
console.log(field2Dv2);