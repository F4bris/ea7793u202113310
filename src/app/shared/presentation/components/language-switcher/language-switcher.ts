import { Component, inject } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  protected readonly languages = ['en', 'es'];

  protected readonly currentLang = this.translate.currentLang();

  protected changeLanguage(event: MatButtonToggleChange): void {
    this.translate.use(event.value);
  }
}
