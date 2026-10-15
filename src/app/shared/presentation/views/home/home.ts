import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampsStore } from '../../../../adventure-camps/application/adventure-camps.store';
import {
  MyAdventureCamps
} from '../../../../adventure-camps/presentation/components/my-adventure-camps/my-adventure-camps';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, MyAdventureCamps],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly store = inject(AdventureCampsStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
