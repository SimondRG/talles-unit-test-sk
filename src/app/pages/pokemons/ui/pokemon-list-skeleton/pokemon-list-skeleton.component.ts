import { Component, input } from '@angular/core';
import { SimplePokemon } from '../../../../pokemons/interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list-skeleton.component.html',
  styleUrl: './pokemon-list-skeleton.component.css'
})
export class PokemonListSkeletonComponent {

  // public pokemons = input.required<SimplePokemon[]>();

}
