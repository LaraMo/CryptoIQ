/**
 * This class is for client side validation of input fields
 */

 /**
  * Validate the "number of students" input fields
  * @param element to test
  * @param pattern to match
  * @param length to set max length (not manditory)
  */
 export function validator(element, pattern, length)
{
    if(length) {
        //only if length is passed as a param we check the following condition
        if(element.length > length) {
            return false;
        }
    }
    const regexp = pattern;
    return regexp.test(element);
}

/**
 * Validate if element is not empty 
 * @param {input} element 
 */
export function validateOnSubmission (element, message){
    const regexp = /^\s*$/;
    const testPass = !regexp.test(element.value);
    if(testPass){
        return testPass;
    } //if not empty space, the valid
    else {
        if(message){
            alert(message);
        }
    }
}

/**
 * Validate elements in a loop
 * @param {input} arrayOfElements
 */
export function validateArrayOnSubmission(elements, message){
    for(let i = 0 ; i <elements.childElementCount; i++){
        for(let j = 0; j < elements.children[i].childElementCount; j++){
            if(!validateOnSubmission(elements.children[i].children[j].children[1])){
                if(message){
                    alert(message);
                  } 
                  return false;   
                }
        }
    }
    return true;
}
