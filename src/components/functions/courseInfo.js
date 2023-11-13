import coursePrevTerms from './termsPrediction'

async function courseInfo(courseInput){

    pastTerms = coursePrevTerms(courseInput)
    /*[
        [year,term]
        [year,term]
    ]*/
    var year = pastTerms[pastTerms.length][0]
    var semester = pastTerms[pastTerms.length][1]

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

    if (courseInput == ''){course='/cmpt/225'; courseInput='CMPT225'}

    const URL = 'https://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + semester + course + '/d100'

    var data = await fetch(URL);
    if (data.ok){
        return data
    }
}

function getPreq(courseInput){
    let info = courseInfo(courseInput)
    return info.prerequisites
}

function getCoreq(courseInput){
    let info = courseInfo(courseInput)
    return info.corequisites
}