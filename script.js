function Lipsum(clean, dirty){

    this.clean = clean;
    this.dirty = dirty;
    this.canDirty = true;
    this.list;
    this.generateMarkupButton = document.getElementById("generateMarkup");
    this.lipsumParagraphsNum = document.getElementById("lipsumParagraphs");
    this.lipsumWell = document.getElementById("lipsumWell");
    this.canDirty = document.getElementById("lipsumDirty");
    this.minNumSentencesPerParagraph = 5;
    this.maxNumSentencesPerParagraph = 10;
    this.minNumWordsPerSentence = 5;
    this.maxNumWordsPerSentence = 15;

    this.numberOfParagraphs = 3;
    this.maxNumberOfParagraphs = 20;


}

Lipsum.prototype.init = function(){

    this.generateLipsumLister();
};


//creates the list of words from clean and dirty, if this.canDirty then merge in the dirty
Lipsum.prototype.initList = function(){

    this.list = null;
    var list;
    if(this.canDirty.checked == true){

        list = this.clean.slice();

        //push in every dirty word
        for (var i = 0; i < this.dirty.length; i++){
            list.push(this.dirty[i]);
        }
        this.list = list;

    } else {
        list = this.clean.slice();
        this.list = list;
    }

};


//
Lipsum.prototype.generateLipsumLister = function(){

    var lipsum = this;
    this.generateMarkupButton.addEventListener('click', function(){
        lipsum.initList();
        lipsum.generateLipsum();
    });

    //increments num of paras
    document.getElementById("lipsumParagraphsInc").addEventListener('click', function(){
        if(lipsum.numberOfParagraphs < lipsum.maxNumberOfParagraphs){
            lipsum.numberOfParagraphs += 1;
            lipsum.lipsumParagraphsNum.value = lipsum.numberOfParagraphs + " Paragraphs";
        }
    });

    //decrements num of paras
    document.getElementById("lipsumParagraphsDec").addEventListener('click', function(){
        if(lipsum.numberOfParagraphs > 1){
            lipsum.numberOfParagraphs -= 1;
            lipsum.lipsumParagraphsNum.value = lipsum.numberOfParagraphs + " Paragraphs";
        }
    });
};


//Generates the lipsum Paragraphs
Lipsum.prototype.generateLipsum = function(){


    document.getElementById("lipsumWell").style.display = "block";
    var finalString = '';


    for(var i = 0; i < this.numberOfParagraphs; i ++){

        var paragraph = this.generateSentences();
        finalString += '<p>' + paragraph + '</p>';

    }

    this.lipsumWell.innerHTML = finalString;
};


//generates multiple sentences to form a paragraph
Lipsum.prototype.generateSentences = function(){

    var sentencesArray = [];
    var numberOfSentences = this.randomNumBetween(this.minNumSentencesPerParagraph, this.maxNumSentencesPerParagraph);

    for(var i = 0; i < numberOfSentences; i++){

        var numberOfWordsPerSentence = this.randomNumBetween(this.minNumWordsPerSentence, this.maxNumWordsPerSentence);
        var numberOfCommas = this.numberOfCommas(numberOfWordsPerSentence);

        sentencesArray.push(this.generateSentence(numberOfWordsPerSentence, numberOfCommas));

    }

    return sentencesArray.join(' ');

};

//determines number of commas depending o
Lipsum.prototype.numberOfCommas = function(numberOfWordsPerSentence){
    var numberOfCommas;

    if(numberOfWordsPerSentence <= 4) {
        numberOfCommas = 0;
    } else if(numberOfWordsPerSentence >= 5 && numberOfWordsPerSentence <= 9){
        numberOfCommas = 1
    } else if(numberOfWordsPerSentence >= 10){
        numberOfCommas = 2;
    }

    return numberOfCommas;
};

//generates multiple words to form a sentence with proper Capitalisation, full stops, and commas
Lipsum.prototype.generateSentence = function(numberOfWordsPerSentence, numberOfCommas){

    var sentence;
    var sentenceArray = [];
    var arrayOfWordsToUse = this.list.slice();

    for(var i = 0; i < numberOfWordsPerSentence; i++){

        var wordIndex = this.randomNumBetween(0, (arrayOfWordsToUse.length - 1));
        sentenceArray.push(arrayOfWordsToUse[wordIndex]);
        arrayOfWordsToUse.splice(wordIndex, 1);

    }

    //add in necessary commas
    if(numberOfCommas == 1){
        //add one comma in middle of sentence
        var middleOfSentenceIndex = Math.floor((sentenceArray.length - 1) / 2);
        sentenceArray.splice(middleOfSentenceIndex, 0, ', ');
    } else if(numberOfCommas == 2){
        //add comma in 1/3 and 2/3 of sentence
        var commaOneIndex = Math.floor((sentenceArray.length - 1)/ 3);
        var commaTwoIndex = Math.floor((sentenceArray.length - 1)/ 3) * 2;
        sentenceArray.splice(commaOneIndex, 0, ', ');
        sentenceArray.splice(commaTwoIndex, 0, ', ');
    }

    //add spaces in sentence where applicable (not when the next char is a comma, or if is last sentence)
    for(var j = 0; j < sentenceArray.length; j++){
        if(sentenceArray[j + 1]  != ', ' && sentenceArray[j] != sentenceArray[sentenceArray.length - 1]){
            sentenceArray[j] += ' ';
        }
    }

    //join array to make a string then add full stop to complete the sentence
    sentence = sentenceArray.join('');
    sentence += '.';

    //put first char as uppercase + concat with rest of string ommitting the first char
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    return sentence;

};

//return a random number between specified params
Lipsum.prototype.randomNumBetween = function(min, max){
    /*
     Author: Francisc
     Source: http://stackoverflow.com/posts/7228322/revisions
     * */
    return Math.floor(Math.random()*(max-min+1)+min);
};


var clean = [
    'no bunya', 'yeah but nah but', 'nah but yeah but', 'ay', 'outsource me', 'give it a bit of room',
    'the world is not my oyster', 'what even', 'nah you\'re alright ay', 'pretty good', 'that\'s eff\'n gammin\'',
    'so paid', 'I belieb in you', 'Salary Man', 'how does that work?', 'fam', 'Joey from Friends is quicksale',
    'cash jobs', 'I don\'t mind', 'don\'t even worry about it ay', 'I wish I was a tradie', 'Microsoft is so gamm-tech',
    'heyy uhh', 'and that', 'the thing of it is is that', 'punnit for a hunnit', 'bottle of moet don\'t you know it',
    'shoutouts', 'she\'s trouble', 'she\'s a tearout', 'bit of a babe', 'babe-squad', 'squad', 'woe',
    'jetfuel can\'t melt steal beams', 'as long as the outcome is income', 'numbers on the board', 'cup of drink',
    'sparkling water', 'bidnis', '#cashies', 'top shelf', 'a bit gourmet', 'phooooooph', 'bespoke', 'best', 'm9', 'gamm-tech',
    'Samsung invented the iPhone for PC users', 'I feel left out because I\'m not marginalised', 'BATW', 'backs against the wall',
    'there\'s a bit of BATW about that'
];

var dirty = [
    'what a mad eff-bomb', 'that\'s effn\' gammin\''
];

var lipsum = new Lipsum(clean, dirty, false);
lipsum.init();