"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// factory pattern
exports.Person = (name, age, occupation) => ({
    name,
    age,
    occupation,
    sayHello() {
        console.log(`Hello, my name is ${name}`);
    },
});
