const generateArray = () => {
    const array = [1];
    let sum = 1;

    for (let i = 1; i < 10; i++) {
        sum += array[i - 1];
        array.push(sum);
    }

    return array;
};

const filterAndSortArray = (array) => {
    return array.filter(num => num % 2 === 0).sort((a, b) => b - a);
};

const task2 = () => {
    const initialArray = generateArray();
    console.log("Initial array:", initialArray);

    const sortedArray = filterAndSortArray(initialArray);
    console.log("Final output (sorted array with only even numbers in descending order):", sortedArray);
};

task2();
