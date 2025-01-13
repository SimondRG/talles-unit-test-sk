
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { map, single, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css'
})
export default class PokemonsPageComponent {

    private pokemonService = inject( PokemonsService );
    public pokemons = signal<SimplePokemon[]>([]);
    public loadDataPokemons = signal<boolean>(false);

    private route = inject(ActivatedRoute);
    private router = inject( Router );
    private title = inject( Title );

    public currentPage = toSignal<number>(
      this.route.params.pipe(
        map( params => params['page'] ?? '1' ),
        map( page => ( isNaN(+page) ? 1 : +page )),
        map( page => Math.max(1, page)),
      )
    );

  // public isLoading = signal(true);

  // ngOnInit(): void {
  //   this.loadPokemons();

  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 500);

  // }

  public loadOnPageChanged = effect( () => {
    console.log('Page changed', this.currentPage());
    this.loadPokemons(this.currentPage());
    this.loadDataPokemons.set(true);

  },{
    allowSignalWrites: true,
  })


  public loadPokemons(page = 0){

    this.pokemonService.loadPage(page)
      .pipe(
        // tap( () => {
        //   this.router.navigate([], { queryParams: {  page: pageToLoad } });
        // }),
        tap( () => {
          this.title.setTitle(`Pokemons SSR - Page ${ page }`);
        })
      )
      .subscribe( pokemons => {
        this.pokemons.set(pokemons);
      });

  }

}
