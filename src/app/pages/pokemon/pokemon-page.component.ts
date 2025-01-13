import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  public pokemon = signal<Pokemon | null>(null);
  private pokemonService = inject(PokemonsService);
  private activateRoute = inject( ActivatedRoute );
  private title = inject( Title );
  private meta = inject( Meta );

  ngOnInit(): void {

    // this.activateRoute.params
    //   .pipe(
    //     switchMap( ({ id }) => this.pokemonService.loadPokemon( id ) )
    //   )
    //   .subscribe( pokemon => {
    //       this.pokemon.set( pokemon );
    //   });

    // Esta forma es mas simple
    const id = this.activateRoute.snapshot.paramMap.get( 'id' );
    if( !id ) return;

    this.pokemonService.loadPokemon(id)
      .pipe(
        tap( ({ name, id}) => {
          const pageTitle = `#${ id } - ${ name }`;
          const pageDescription = `Pagina del Pokemon ${ name }`;

          this.title.setTitle( pageTitle );
          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`
          });
        }),
      )
      .subscribe( this.pokemon.set );


  }

}
