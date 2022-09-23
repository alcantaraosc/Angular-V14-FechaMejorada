import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '../_services';
import { User } from '../_models';



//import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    user: User;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {       
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        //cambiar el estado
        //this.loading = false;
      //  myform.controls.name.controls.firstName.invalid
      
        this.accountService.login(this.form.controls['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: (user: User) => {
                    window.location.reload();                    
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';                   
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });    
    }
}