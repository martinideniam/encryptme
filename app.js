const encryptInput = document.querySelector('.encrypt-input')
const encryptButton = document.querySelector('button');
const encryptOutput = document.querySelector('.encrypt-output');
const checkbox = document.querySelector('.checkbox')
const encryptKeyi = document.querySelector('.encrypt-key-i');
const encryptKeyh = document.querySelector('.encrypt-key-h');
const encryptKeyItself = document.querySelector('.encrypt-key-itself');

class Encryption {
    constructor(text, enkey = null) {
        this.text = text; 
        this.enkey = enkey;
        this.msg_length = text.length;
        this.preGenerateKey();
    }
    //to generate random numbers within some min-max interval
    //used later on to generate keys values from ASCII 65-126
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    //i need this one to extend the key to match the text

    returnKey(key) {
        this.lettersKey = this.finalKey.map((el) => String.fromCharCode(el));
        this.lettersKey = this.lettersKey.join('');
    }

    extendKey(key, msg_length) {
        this.key_length = key.length;
        if (msg_length <= key.length) {
            //shortening key
            this.finalKey = key.splice(0, msg_length);
        } else {
            //need to know how much should i extend my key
            //for example i have a text of 8 characters
            //but my key is 3 characters 
            //thus i have to multiply my key by 2 and add 2 to it
            const coefficientOfLength = Math.floor(msg_length/key.length);
            this.finalKey = [...key];

            for (let i = 2; i <= coefficientOfLength; i++) {
                this.finalKey = this.finalKey.concat(key);
            };
            if (msg_length%key != 0) {
                const leftPart = [...key];
                this.finalKey = this.finalKey.concat(leftPart.splice(0, msg_length%key.length));
            }
        }
        this.returnKey(this.finalKey);
    }

    generateRandomKey() {
        //random key of 10 characters in length
        const listofkeys = []
        for (let i = 1; i <= 7; i++) {
            listofkeys.push(this.randomIntFromInterval(34, 126));
        }
        //this is needed to match the length of the key with text
        this.extendKey(listofkeys, this.msg_length);
    }

    preGenerateKey() {
        if (this.enkey == null) {
            this.generateRandomKey();
        } else {
            const listofLettersKey = this.enkey.split('');
            const listofNumbersKey = listofLettersKey.map((letter) => letter.charCodeAt(0));
            this.extendKey(listofNumbersKey, this.msg_length);
        }
    }


}

encryptButton.addEventListener('click', () => {
    if (encryptButton.innerText == 'Encrypt') {
        const text = encryptInput.value;
        const letters = [...text];
        const asciiLetters = []; 
        const textEncryption = new Encryption(text);
        const lettersKey = textEncryption.lettersKey;
        const finalKey = textEncryption.finalKey;
        const innerTextArray = lettersKey.split('');
        const innerTextArrayShortened = innerTextArray.splice(0, textEncryption.key_length);
        const innerText = innerTextArrayShortened.join('');
        encryptKeyItself.innerText = innerText;
        letters.forEach((i, index) => asciiLetters.push(i.charCodeAt(0)+finalKey[index]));
        console.log(asciiLetters);
        const encryptedLetters = []
        asciiLetters.forEach((i) => encryptedLetters.push(String.fromCharCode(i)));
        const encryptedText = encryptedLetters.join('');
        encryptOutput.value = encryptedText;
    } else {
        const text = encryptInput.value;
        const letters = [...text];
        const asciiLetters = []; 
        const textEncryption = new Encryption(text, encryptKeyi.value);
        const lettersKey = textEncryption.lettersKey;
        const finalKey = textEncryption.finalKey;
        letters.forEach((i, index) => asciiLetters.push(i.charCodeAt(0)-finalKey[index]));
        console.log(asciiLetters);
        const encryptedLetters = []
        asciiLetters.forEach((i) => encryptedLetters.push(String.fromCharCode(i)));
        const encryptedText = encryptedLetters.join('');
        encryptOutput.value = encryptedText;
    }
});

checkbox.addEventListener('click', () => {
    if (checkbox.checked == true) {
        encryptButton.innerText = 'Decrypt';
    } else {
        encryptButton.innerText = 'Encrypt';
    }
    encryptKeyi.classList.toggle('hide');
    encryptKeyh.classList.toggle('hide');
});

// encryptButton.innerText = 'Vlad';