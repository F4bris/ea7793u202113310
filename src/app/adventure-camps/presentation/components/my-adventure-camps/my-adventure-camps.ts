import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampsStore } from '../../../application/adventure-camps.store';
import { AdventureCampsSummary } from '../adventure-camps-summary/adventure-camps-summary';

@Component({
  selector: 'app-my-adventure-camps',
  imports: [MatGridListModule, TranslatePipe, AdventureCampsSummary],
  templateUrl: './my-adventure-camps.html',
  styleUrl: './my-adventure-camps.css',
})
export class MyAdventureCamps {
  protected readonly store = inject(AdventureCampsStore);
}
