import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokeAPIResponse } from '../../pokemons/interfaces/pokemon-api.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private http = inject(HttpClient);
  // Carga una página de Pokémon (20 por página)
  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page); // Evita negativos

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          // Convierte resultados en array simple
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );

          return simplePokemons;
        }),
        // tap(console.log)
      );
  }
  // Carga un Pokémon por ID
  public loadPokemon(id: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
