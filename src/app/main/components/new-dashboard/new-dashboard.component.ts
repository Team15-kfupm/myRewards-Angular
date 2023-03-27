import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          //{id: 1, title: 'Card 1', cols: 1, rows: 1},
          {id: 2, title: 'Number of Offers remaining', cols: 1, rows: 2},
          {id: 3, title: 'Number of offers redeemed', cols: 1, rows: 2},
        ];
      }

      return [
        //{id: 1, title: 'Card 1', cols: 2, rows: 2},
        {id: 2, title: 'Number of Offers remaining', cols: 1, rows: 2},
        {id: 3, title: 'Number of offers redeemed', cols: 1, rows: 2},
        // {id: 4, title: 'Card 4', cols: 1, rows: 1}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}
