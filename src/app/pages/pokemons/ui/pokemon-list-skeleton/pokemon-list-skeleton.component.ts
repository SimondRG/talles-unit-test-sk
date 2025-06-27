import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../../../pokemons/interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent { }
