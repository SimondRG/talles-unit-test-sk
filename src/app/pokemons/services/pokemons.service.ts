import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject( HttpClient );

  public loadPage( page: number): Observable<SimplePokemon[]>{

    // Valida que si envian un numero negativo siempre le reste uno para tener la pagina correcta
    if( page !== 0 ){
      --page;
    }

    // Valida si envian un numero negativo que la pagina sea 0
    page = Math.max(0 , page);

    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map( resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              name: pokemon.name,
              id: pokemon.url.split('/').at(-2) ?? '',
            })
          );

          return simplePokemons;
        }),
        tap( console.log )
      );

  }

  public loadPokemon( id: string ): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

}
