// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases, using returnRandBase() as a supplier
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      //The above finds a random index position within the length of the dna array in 'this' object.
      let newBase = returnRandBase();
      //We use the returndRandBase function to generate a new random base, but put it within a new variable
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
        //I think this part says, if the randIndex position matches the random newBase generated, then keep using the returnRandBase function to find a new base.
      }
      this.dna[randIndex] = newBase;
      //When we've found a suitable base, assign that position in the dna array the value of the randomly generated newBase.
      return this.dna;
    },
    compareDNA(otherOrg) {
      //new method which takes the parameter otherOrg, which will just be a
      //new DNA array
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        //.reduce method is iterative, it goes through an array and 'reduces'
        //all of an array's values into one value. 'acc' refers to the 
        //'accumulator' parameter, the single value to be returned by reduce().
        //'curr' I believe refers to the current item of the array. As in 
        //this documentation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
        //I believe .reduce cycles through it's given function cumulatively. 
        //In this case, it cycles through the original array index, and the 'otherOrg'
        //index, and if they match, adds 1 to the accumulator. Otherwise, just
        //returns the current accumulator value. However, we do have two criteria
        // - the bases must be both identical and at the same index point.
        //How does this particular function match their identities? To me it looks
        //as though it only matches their indices.
        //We could also do this with a loop structure I believe? This is otherwise
        //a brand new method.
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      //here we create a percentage similarity via amount of matches / total bases
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      //we then round up this decimal number to have less decimal points
      console.log(`${this.specimenNum} and ${otherOrg.specimenNum} have ${percentageTo2Deci}% DNA in common.`);
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === "C" || el === "G");
      //in this instance, the const cOrG uses the .filter() function to create
      //I suppose a new array with only C or G bases.
      return cOrG.length / this.dna.length >= 0.6;
      //then we evaluate the length of that new cOrG array against the length of
      //the dna strand, and if it is more than 60% of that strand, then it returns 
      //true. Otherwise, false.
    },
  }
};

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

//Above we make a simple while loop which says we will create 30 instances 
// of 'surviving specimen' within the eponymous array. Those specimens
// will be given an id and a random base strand. They are evaluated in terms of
// survival likelihood, and if they pass the willLikelySurvive() function as true,
// then they're added to the newOrg array.

console.log(survivingSpecimen)