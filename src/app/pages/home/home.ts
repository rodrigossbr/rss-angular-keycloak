import { Component } from '@angular/core';
import {Toolbar} from '@shared/components';

@Component({
  selector: 'app-home',
  imports: [
    Toolbar
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
