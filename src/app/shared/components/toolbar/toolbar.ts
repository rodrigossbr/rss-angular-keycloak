import {Component, inject} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthService, UserState} from '@core/auth';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatMenuItem,
    MatDivider,
    MatMenu,
    MatIconButton,
    MatToolbar,
    MatMenuTrigger,
    MatIconModule
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  private readonly auth = inject(AuthService);

  protected get user(): UserState {
    return this.auth.getState();
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
  }
}
