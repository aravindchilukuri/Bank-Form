import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};
    onGetValues: any;
    branch: any[];
    constructor(private userService: UserService) { }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
    addFieldValue() {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
        localStorage.setItem('bankform', JSON.stringify(this.fieldArray));
    }
    branchArray(branchArray: any): any {
        throw new Error('Method not implemented.');
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }
    onGetLocalValues() {
        this.onGetValues = JSON.parse(localStorage.getItem('bankform'));
        console.log('value', this.onGetValues);
    }
// tslint:disable-next-line: semicolon
};
