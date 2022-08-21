import { Component, OnInit } from '@angular/core';
import { FormBuilder  } from '@angular/forms';

import { UsersServices } from '../users-list.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponents implements OnInit {

  users: Array<any>;

  constructor(
    private usersService: UsersServices,
    private formBuilder: FormBuilder,
    ) {}

  checkoutForm = this.formBuilder.group({
    name: '',
    email: '',
    cpf: ''
  });

  ngOnInit() {
    this.list();
  }

  list() {
    this.usersService.list()
      .subscribe(data => {
        return this.users = data
      });
  }


  onSubmit(): void {
    if(this.checkoutForm.value.name && this.checkoutForm.value.email && this.checkoutForm.value.cpf){
      this.usersService.post(
        this.checkoutForm.value.name,
        this.checkoutForm.value.email,
        this.checkoutForm.value.cpf
      ).subscribe(
          user => this.users.push(user)
        );

      this.checkoutForm.reset();
    }else {
      console.error('Empty inputs');
     }

  }

  edit(id: number){
   if(this.checkoutForm.value.name && this.checkoutForm.value.email && this.checkoutForm.value.cpf){
    this.usersService.edit(
      id,
      this.checkoutForm.value.name,
      this.checkoutForm.value.email,
      this.checkoutForm.value.cpf
    ).subscribe();

    this.checkoutForm.reset();

    window.location.reload();
   }else{
    console.error('Empty inputs');
   }
  }

  delete(id: number){
    this.usersService.delete(
      id,
    ).subscribe();

    window.location.reload();
  }
}
