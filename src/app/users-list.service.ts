import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersServices {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  post(
    name: string | null | undefined,
    email: string | null | undefined,
    cpf: string | null | undefined
    ){
    return this.http.post(`${this.baseUrl}/users`, { name, email, cpf })
    }

  edit(
    id: number,
    name: string | null | undefined,
    email: string | null | undefined,
    cpf: string | null | undefined
    ){
    return this.http.put(`${this.baseUrl}/users/${id}`,{ name, email, cpf }
    )
  }

  delete(
    id: number,
  ){
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }
}
