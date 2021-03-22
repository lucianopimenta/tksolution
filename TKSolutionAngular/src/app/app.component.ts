import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { BodyOutputType, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public config: ToasterConfig = 
  new ToasterConfig(
  {
      animation: 'fade',
      positionClass: 'toast-top-full-width',
      timeout: 5000,
      limit: 1,
      bodyOutputType: BodyOutputType.TrustedHtml
  });
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }
}
