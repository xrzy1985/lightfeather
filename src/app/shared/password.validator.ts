import { FormGroup } from '@angular/forms';

export function passwordCheck(c: string, c1: string): any {
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[c];
        let ctrl = formGroup.controls[c1];
        let test = control.value !== ctrl.value;
        if (ctrl.errors && !ctrl.errors['passwordCheck']) {
            return;
        } else if (test) {
            ctrl.setErrors(test ? { passwordCheck: true } : null);
        } else {
            ctrl.setErrors(null);
        }
    }
}