const birthdayGreeter = (name: string, age: number): string => {
	return `Happy birthday ${name}, you are now ${age} years old!`;
}

const birthdayHero = "Jane User";
const age = 22;

console.log(birthdayGreeter(birthdayHero, age));

type Operation = 'multiply' | 'add' | 'divide';
type Result = number | string;

const calculator = (a: number, b: number, op: Operation): Result => {
	if (op == 'multiply') {
		return a * b;
	} else if (op == 'add') {
		return a + b;
	} else if (op == 'divide') {
		if (b == 0) return 'can\'t divide by 0!';
		return a / b;
	}
}

var result = calculator(2, 4, 'multiply');
console.log("Old calc:", result);

var result = calculator(4, 0, 'divide');
console.log("Old calc:", result);