import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";
import {Order} from "../shared/interfaces";

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef?: ElementRef
  tooltip?: MaterialInstance
  private oSub?: Subscription
  orders: Order[] = [];

  isFilterOpen = false
  offset = 0
  limit = STEP
  loading = false
  reloading = false
  noMore = false

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  ngAfterViewInit(): void {
    this.tooltip = this.tooltipRef && MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip?.destroy?.()
    this.oSub?.unsubscribe()
  }

  private fetch() {
    const {offset, limit} = this
    const params = {offset, limit}
    this.oSub = this.ordersService.fetch(params).subscribe(
      (orders) => {
        this.noMore = orders.length < STEP
        this.orders = [...this.orders, ...orders]
        this.loading = false
        this.reloading = false
      }
    )
  }

  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }
}
