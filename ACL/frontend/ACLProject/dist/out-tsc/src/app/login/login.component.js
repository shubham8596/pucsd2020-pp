import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(_snackBar, formBuilder, dataService, router) {
        this._snackBar = _snackBar;
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.router = router;
        this.username = new FormControl('', [Validators.required, Validators.maxLength(100)]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
    }
    ngOnInit() {
        this.createFormValidations();
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            duration: 6000,
            verticalPosition: 'top'
        });
    }
    createFormValidations() {
        this.registerForm = this.formBuilder.group({
            username: this.username,
            password: this.password
        });
    }
    passwordMatchValidator(group) {
        return group.get('password').value === group.get('confirmPassword').value ? null : { misMatch: true };
    }
    onSubmit() {
        let userData = {
            "u_id": this.registerForm.value.username,
            "u_password": this.registerForm.value.password,
        };
        if (this.registerForm.invalid) {
            return;
        }
        console.log(userData);
        this.dataService.insertUser(userData).subscribe(data => {
            this.openSnackBar("New Record Added Successfully", " ");
        });
        this.registerForm.reset();
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map