interface User {
    name: string;
    age: number;
    isMale: boolean;
    gf: string;
}
let john: User = {
    name: "John",
    age: 20,
    isMale: true,
    gf: "may",
};

console.log(john);

// 加一個新field 去舊object
let newJohn = {
    ...john,
    bf: "ben",
};

// 改舊object field
// newJohn = {
//     ...john,
//     name: "Ken", //同名field
// };

let { gf: _gf, isMale: _isMale, ...john2 } = john;

let john3 = { ...john };
let john4 = JSON.parse(JSON.stringify(john));

console.log(newJohn);
