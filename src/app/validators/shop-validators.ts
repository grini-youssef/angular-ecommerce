import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

    // whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)){
            // invalid, return error message
            return {'notOnlyWhiteSpace': true};
        }
        else{
            // valid return nll
            return null;
        }
        
    }

}
