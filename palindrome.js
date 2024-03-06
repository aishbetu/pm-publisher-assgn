const inpStr = 'Nitin';

const palindrome = (inpStr) => {
    inpStr = inpStr.toLowerCase();

    let revStr = inpStr.split('').reverse().join('');
		console.log(revStr)
    return inpStr === revStr
}

console.log(palindrome(inpStr));