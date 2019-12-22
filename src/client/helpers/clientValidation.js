/**
 * This class is for client side validation of input fields
 */

 /**
  * Validate the "number of students" input fields
  */
 export function limit(element)
{
    regexp = /^\d+$/gs;

    if (!regexp.test(element.value)) {
        return false;
    }
}