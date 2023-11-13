import { splitYearTerm } from './termsPrediction'

const semester = ['Spring', 'Summer', 'Fall']

function getCurrentYear() {
    let date = new Date()
    console.log(date.getFullYear())
    return date.getFullYear()
}

function getCurrentMonth() {
    let date = new Date()
    return date.getMonth()
}

function getCurrentTerm() {
    let month = getCurrentMonth()
    if (month <= 4){
        return semester[0]
    }
    else if (month <= 8){
        return semester[1]
    }
    else{
        return semester[2]
    }
}

function getNextTerm(currentTerm){
    // input Spring 2024
    // output Summer 2024
    let cYear = splitYearTerm(currentTerm)[0]
    let cTerm = splitYearTerm(currentTerm)[1]

    let rYear = ''
    let rTerm = ''

    if (cTerm === semester[2]){rTerm = semester[0]; rYear = String(parseInt(cYear)+1)}
    else if (cTerm === semester[0]){rTerm = semester[1]; rYear = cYear}
    else {rTerm = semester[2]; rYear = cYear}

    let ret = rTerm + ' ' + rYear
    return ret
}


function sortTerms(terms){

    let terms2 = []

    // [Summer 2023, Spring 2024, Fall 2021]

    terms.map((term) => (
        terms2.push([
            splitYearTerm(term)[0], 
            semester.indexOf(splitYearTerm(term)[1])
        ])
    ))

    // [[2023, 1], [2024, 0], [2021, 2]]

    terms2.sort((a, b) => {
        // First, compare by the first element (year)
        if (a[0] < b[0]) {
          return -1;
        } else if (a[0] > b[0]) {
          return 1;
        } else {
          // If the years are the same, compare by the second element (value)
          return a[1] - b[1];
        }
    });

    // [[2021, 2], [2023, 1], [2024, 0]] 
    let ret = []
    for (let i = 0; i < terms2.length; i++){
        terms2[i][1] = semester[terms2[i][1]]
        ret.push(terms2[i][1] + ' ' + terms2[i][0])
    }

    return ret;

}

export {getCurrentYear, getCurrentMonth, getCurrentTerm, getNextTerm, sortTerms}