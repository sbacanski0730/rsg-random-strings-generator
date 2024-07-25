// TODO: create unit tests for this class as this class contains main functionality of the project

class StringsGenerator {
	private _allRequiredLengths: Array<number> = [];
	public _allPossibleStringsPermutations: Array<string> = [];
	private _characters: string;

	constructor(minLength: number, maxLength: number, characters: string) {
		this._characters = characters;
		this.createListOfAllRequiredStringsLengths(minLength, maxLength);
	}

	public generateStrings = (combinations: number): Array<string> => {
		this.generatePermutations();
		return this.getRandomStrings(combinations);
	};

	private generatePermutations = (): void => {
		this._allRequiredLengths.forEach((length) =>
			this._allPossibleStringsPermutations.push(...this.createPermutations(this._characters, length))
		);
	};

	private getRandomStrings = (combinations: number): Array<string> => {
		let randomStrings: Array<string> = [];

		for (let i = 0; i < combinations; i++)
			randomStrings.push(
				this._allPossibleStringsPermutations[
					Math.floor(Math.random() * (this._allPossibleStringsPermutations.length - 1) + 1)
				]
			);

		return randomStrings;
	};

	private createPermutations = (str: string, length: number): Array<string> => {
		if (str.length == 0 || length == 0) return [str];
		if (str.length == 1) return [str];

		if (length - 1 == 0) {
			let arr = new Array<string>();

			for (let i = 0; i < str.length; i++) arr.push(str[i]);

			return arr;
		}

		const permutations: Array<string> = [];

		for (let i = 0; i < str.length; i++) {
			const currChar: string = str[i];

			const restChars: string = str.slice(0, i) + str.slice(i + 1);

			const possiblePermutations: Array<string> = this.createPermutations(restChars, length - 1);

			possiblePermutations.forEach((e) => permutations.push(currChar + e));
		}

		return permutations;
	};

	private createListOfAllRequiredStringsLengths = (minLength: number, maxLength: number): void => {
		if (minLength === maxLength) this._allRequiredLengths = [minLength];

		this._allRequiredLengths = Array.from({ length: maxLength - minLength + 1 }, (_, i) => minLength + i);
	};
}

export default StringsGenerator;
