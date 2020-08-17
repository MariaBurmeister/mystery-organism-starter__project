// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates a new p Aequor Object
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      };
      const mutated = this.dna.splice(randomIndex, 1, newBase);
      return this.dna;
    },
    compareDNA(anotherPAequor) {
      const arraySame =
      this.dna.filter((base, index) => base === anotherPAequor.dna[index]);

      const percentage = ((arraySame.length/15)*100).toFixed(2);
      return `Specimen #${this.specimenNum} and specimen #${anotherPAequor.specimenNum} have ${percentage}% DNA in common.`;
    },
    willLikelySurvive() {
      const arrayCorG =
      this.dna.filter(base => base ===`C` || base === `G`);

      const percentage = Math.floor((arrayCorG.length/15)*100);

      return percentage >= 60 ? true : false;
    },
    complementStrand() {
      const complementStrandArray = this.dna.map(base => {
        return base === `A` ? `T`
        : base === `T` ? `A`
        : base === `C` ? `G`
        : `C`;
      });
      return complementStrandArray;
    }
  };
};

const create30Survivors = () => {
  const arraySurvivors = [];
  let i = 1;
  while (arraySurvivors.length < 30) {
    const newSpecimen = pAequorFactory(i, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      arraySurvivors.push(newSpecimen);
      i++;
    };
  };
  return arraySurvivors;
};
