import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {AnalyticsService} from "../shared/services/analytics.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef?: ElementRef
  @ViewChild('order') orderRef?: ElementRef

  average?: number
  pending = true
  private aSub?: Subscription;

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    this.aSub = this.service.getAnalytics().subscribe(
      (data)=>{
        this.average = data.average
        this.pending = false
      }
    )
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe()
  }

}
