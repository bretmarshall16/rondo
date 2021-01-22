import { Component, OnInit } from '@angular/core';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rondo';

  constructor(
    private pwaService: PwaService
  ) {}

  ngOnInit(): void {
    this.pwaService.init();
  }
}
