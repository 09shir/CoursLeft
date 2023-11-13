// splitYearTerm
// coursePrevTerms
// predict

import { getCurrentYear } from './terms'

// input Spring 2024
function splitYearTerm(data){
    var year = ''; 
    var term = '';
    for (let i = 0; i < data.length; i++){
        if (data[i] !== ' '){
            term += data[i];
        }
        else{
            for (let j = i+1; j < data.length; j++){
                year += data[j];
            }
            break;
        }
    }
    return [year, term]
}

async function api(course, year, term){

    const url = 'https://www.sfu.ca/bin/wcm/course-outlines?'
    var data = ''
    var url_tmp = url + year + "/" + term + course;
    
    data = await fetch(url_tmp);

    if (data.ok){
      return year + term
    }
}

// @param1: course name
// @param2: boolean (true: only past 2 years; false: all past terms)
async function coursePrevTerms(course_input, pastTwoYears){

    var courseInput = course_input
    var course = "/"

    for (let i = 0; i < courseInput.length; i++){
        if (isNaN(courseInput[i])){
        course += courseInput[i];
        }
        else{
        course = course + "/";
        for (let j = i+1; j < courseInput.length; j++){
            course += courseInput[j]
        }
        break;
        }
    }


    // for demo purpose when entering website
    if (courseInput === ''){course='/cmpt/225'; courseInput='CMPT225'}

    // var course = "/" + department + "/" + number
    // only look for course openings after 2020 
    const term = ["fall", "summer", "spring"]
    let year = []
    if (pastTwoYears){
        let currentYear = getCurrentYear()
        year = [2024, currentYear,currentYear-1]
        console.log('years', year)
    }
    else{
        for (let i = getCurrentYear(); i > 2013; i--){
            year.push(i)
        }
    }

    var ret = []

    for (const yr of year){
        for (const tm of term){
            var data = await api(course,yr,tm);
            if (data !== undefined){
                ret.push([yr, tm]);
            }
        }
    }

    return ret;

    /*ret = [
        [year, term],
        [year, term],
        ...
    ]*/
}

// prediction algorithm
// returns NA if not available
// return:
//      {predictResult: array of terms predicted [spring, summer, fall], 
//       pastTerms: array of past terms available}
async function predict(course_input){

    try{
        let ret = await coursePrevTerms(course_input, true)
        //let ret2 = await coursePrevTerms(course_input, false)
        // spr, summer, fall
        let termCount = [0,0,0]
        const term = ["spring", "summer", "fall"]

        ret.forEach((item) =>{
            for (let i = 0; i < 3; i++){
                if (item[1] === term[i]){
                    termCount[i]++; 
                    break;
                }
            }
        })

        let ret_terms = []
        for (let i = 0; i < 3; i++){
            if (termCount[i] !== 0){
                ret_terms.push(term[i] + ' ')
            }
        }
        console.log(termCount)
        console.log(ret)
        //console.log(ret_terms)
        return {
            predictResult: ret_terms, 
            pastTerms: ret
        }
    }
    catch(err){
        console.log(err)
    }

  }

export {splitYearTerm, coursePrevTerms, predict}