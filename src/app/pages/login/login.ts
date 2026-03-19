import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from '../../core/auth';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  private readonly authService = inject(AuthService);

  public loading = signal(true);

  public ngOnInit(): void {
    setTimeout(() => {
      this.loading.set(false);
    }, 1000)
  }

  public async login() {
    this.loading.set(true);
    try {
      await this.authService.login();
    } catch (error) {
      console.error('Erro ao redirecionar para o Keycloak', error);
      this.loading.set(false);
    }
  }
}
