import { getPreq, getCoreq} from './courseInfo'

class Preq{
    constructor(
        course,
        preq, 
        coreq, 
        creditsReq, 
        upperCreditsReq,
        instructorPermission
    ){
        this.course = course,
        this.preq = preq,
        this.coreq = coreq,
        this.creditsReq = creditsReq,
        this.upperCreditsReq = upperCreditsReq,
        this.instructorPermission = instructorPermission
    }
}

// input CMPT 120
function setPreq(course){

    let preReq = getPreq(course)
    let coReq = getCoreq(course)

    const coreqChecker = 'Corequisite:'
    const instructorPermissionChecker = 'permission of the instructor'
}

function preqCoursesParser(preReq){
    const logicGates = ['and', 'or', 'one of']
}