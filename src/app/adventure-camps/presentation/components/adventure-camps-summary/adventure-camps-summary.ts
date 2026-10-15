import { Component, input } from '@angular/core';
import { AdventureCampsOccupancy } from '../../../domain/model/adventure-camps-occupancy.entity';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [MatCardHeader, MatCardTitle, MatCard, MatCardContent, MatCardFooter, TranslatePipe],
  selector: 'app-adventure-camps-summary',
  styleUrl: './adventure-camps-summary.css',
  templateUrl: './adventure-camps-summary.html',
})
export class AdventureCampsSummary {
  readonly occupancy = input.required<AdventureCampsOccupancy>();
}
