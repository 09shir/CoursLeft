
function parseFullNameToCourseID(name){
    name = name.toUpperCase()

    let ret = ''
    for (let i = 0; i < name.length; i++){
        if (name[i+1] !== '-'){
            ret += name[i]
        }
        else{
            break;
        }
    }
    return ret;
}

export {parseFullNameToCourseID}