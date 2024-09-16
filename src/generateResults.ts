type Results = [number, number][];

const shuffle = <T>(results: T[]): T[] => {
    let newResults = results
        .map(v => ({ v, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ v }) => v)

    return newResults;
}

const getRandomNumbers = (max: number, amount: number): number[] => {
    const numbers = Array.from({ length: max }).map((_v, i) => i);
    const shuffledNumbers = shuffle(numbers);

    return shuffledNumbers.slice(0, amount);
}

const generate = (): Results => {
    const results:Results = [];
    for (let r = 1; r <= 6; r++) {
        for (let b = 1; b <= 8; b++) {
            results.push([r, b]);
        }
    }
    return results;
};

const removeX = (results:Results, amount: number): Results => {
    const randomNumbers = getRandomNumbers(results.length, amount);
    let newResults = [...results];
    randomNumbers.forEach(n => newResults.splice(n, 1));

    return newResults;
}

const duplicateAll = (results:Results): Results => {
    let newResults = [...results, ...results];
    return newResults;
}

const getXDuplicates = (results :Results, amount: number): Results => {
    const dulicates: Results = [];
    const randomNumbers = getRandomNumbers(results.length, amount);
    randomNumbers.forEach(n => dulicates.push(results[n]));

    return dulicates;
}

const generateResults = (): Results => {
    let results: Results;

    results = generate();
    results = removeX(results, 10);

    const duplicates = getXDuplicates(results, 10);

    results = duplicateAll(results);
    results = shuffle([...results, ...duplicates]);

    return results;
};

class ResultsStore {

    private results: Results = generateResults();
    private index: number = 0;
    private listener?: () => void;

    public onChange(listener: () => void) {
        this.listener = listener;
    }

    public offChange(listener: () => void) {
        this.listener = undefined;
    }

    private emit() {
        this.listener?.();
    }

    public next() {
        this.index = (this.index + 1) % this.results.length;
        this.emit();
    }

    public getResult() {
        return this.results[this.index];
    }

}

export const resultsStore = new ResultsStore();
