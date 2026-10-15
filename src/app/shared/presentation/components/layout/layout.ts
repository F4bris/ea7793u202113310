import { Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    RouterLink,
    MatListItem,
    RouterLinkActive,
    MatSidenavContent,
    RouterOutlet,
    TranslatePipe,
    LanguageSwitcher,
  ],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  protected readonly sidenavOpened = signal(true);
  protected readonly navItems = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'New reservation', path: '/reservations/new', icon: 'add_circle' },
  ];

  protected toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }
}
