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
            alert("Couldn't Generate Game: " + message);
        }
    }
}

/**
 * Validate vocabulary form 
 * @param {input} arrayOfVocs
 */
export function validateArrayOnSubmission(elements, message){
    for(let i = 0 ; i <elements.childElementCount; i++){
        for(let j = 0; j < elements.children[i].childElementCount; j++){
            if(!validateOnSubmission(elements.children[i].children[j].children[1])){
                if(message){
                    alert("Couldn't Generate Game: " + message);
                  } 
                  return false;   
                }
        }
    }
    return true;
}

/**
 * Validate storyline form
 * @param {input} arrayOfStoryline
 */
export function validateStoryline(storylineContainer, message){
    //check all input fields in that form
    const input  =  storylineContainer.getElementsByTagName("input")[0];
    const textarea =  storylineContainer.getElementsByTagName("textarea");
    //validate the input field
    if(validateOnSubmission(input, message)){
        //validate text area field
        for(let i = 0 ; i <textarea.length; i++){
            if(!validateOnSubmission(textarea[i], message)){
                //one field is empty
                return false;
            }
        }
        //none of the fileds in this form is empty
        return true;
    }
    else {
        //at least one field in this form is empty, being the title
        return false;
    }
}

/**
 * Validate bonus ticket field, only if checkbox is selected
 */
export function validateBonusTicket(element, message){
    //the checkbox
    if(isCheckboxChecked("bonusTicket")){
        //validate the bonus ticket field
        return validateOnSubmission(element.children[1].children[1], message);
    }
    //if the checkbox is not checked, the the field could be empty
    return true;
}

/**
 * Validate all page numbers. Make sure there are at least 3 unique combo's
 */
export function validatePageNumbers(elements,id, message){
    ;
    if(isCheckboxChecked(id)){
        const inputs =[];
        for(let i = 0 ; i <elements.length; i++){
            inputs.push(elements[i].value);
        }
    
        if(new Set(inputs).size >= 3){
            return true;
        }
        else {
            alert("Couldn't Generate Game: " + message);
            return false;
        }
    }
    else {
        //since the checkbox wasn't checked, there is no possiblity to enter the page numbers. Hence, can't test for uniqueness
        return true;
    }


}

/** */
/**
 * function finds the checkbox and returns true or false depending on if it's true or false
 * @param {string} id 
 */
export function isCheckboxChecked(id) {
    return document.getElementById(id).checked;
}


/**
 * Validate if there is a unique number of words
 * TODO
 */
export function areUniqueWord(elements){
    const inputs =[];
    for(let i = 0 ; i <elements.length; i++){
        inputs.push(elements[i].children[1].value);
    }
  //set generates unique elements. Therefore, if the length is not equal, there is at least one word that is duplicated!
    return new Set(inputs).size !== elements.length;
}

/**
 * Validate if diff. level is 4, then checkbox of locks should be also selected so that all 4 games could be generated
 */
export function isSelectedCheckbox(diffLevel, id ,message){
    //to finish
    if(diffLevel === 4){
        if(document.getElementById(id).checked){
            return true;
        }
        else {
            alert("Couldn't Generate Game: " + message)
        }
    }
    else {
        return true;
    }
}