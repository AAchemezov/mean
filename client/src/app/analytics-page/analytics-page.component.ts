import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {AnalyticsService} from "../shared/services/analytics.service";
import {Subscription} from "rxjs";
import Chart from 'chart.js/auto'

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
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }
    this.aSub = this.service.getAnalytics().subscribe(
      (data) => {
        this.average = data.average

        gainConfig.labels = data.chart.map(item => item.label)
        gainConfig.data = data.chart.map(item => item.gain)
        orderConfig.labels = data.chart.map(item => item.label)
        orderConfig.data = data.chart.map(item => item.order)

        const gainContext = this.gainRef?.nativeElement.getContext('2d')
        gainContext.canvas.height = '300px'
        const orderContext = this.orderRef?.nativeElement.getContext('2d')
        orderContext.canvas.height = '300px'

        new Chart(gainContext, createChartConfig(gainConfig))
        new Chart(orderContext, createChartConfig(orderConfig))
        this.pending = false
      }
    )
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe()
  }

}

function createChartConfig({labels, data, label, color}: any) {
return {
  type: 'line' as const,
  option: {
    responsive: true,
  },
  data: {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        steppedLine: false,
        fill: false,
      }
    ]
  }
}
}
