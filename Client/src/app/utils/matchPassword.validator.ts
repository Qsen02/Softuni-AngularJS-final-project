import { ValidatorFn } from "@angular/forms";

export function matchPassword(passwordControl: string, repassControl: string):ValidatorFn {
    return (formGroup) => {
        const password = formGroup.get(passwordControl)?.value;
        const repass = formGroup.get(repassControl)?.value;
        return password == repass ? null : { passwordDontMatch: true };
    }
}