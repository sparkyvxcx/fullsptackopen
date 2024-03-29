const new_calculator = (a: number, b: number, op: Operation): number => {
	switch (op) {
		case 'multiply':
			return a * b;
		case 'divide':
			if (b == 0) throw new Error('Can\'t divide by 0!');
			return a / b;
		case 'add':
			return a + b;
		default:
			throw new Error('Operation is not multiply/add/divide!');
	}
}

try {
	console.log("New calc:", new_calculator(1, 0, 'divide'));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

console.log(process.argv);