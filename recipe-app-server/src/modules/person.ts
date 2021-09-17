// factory pattern
export const Person = (name: string, age: number, occupation: string) => ({
  name,
  age,
  occupation,
  sayHello() {
    console.log(`Hello, my name is ${name}`);
  },
});
