import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

    //POKEMON
    async getPokemon(options?: any) {
      return await this.http
        .get(`https://pokeapi.co/api/v2/pokemon?limit=100`, options)
        .toPromise()
        .then((retorno: any) => retorno);
    }

    async getPokemonById(id: any) {
      return await this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .toPromise()
        .then((retorno: any) => retorno);
    }
}
