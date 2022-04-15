import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialService, MaterialInstance} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {OrderPosition} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef?: ElementRef
  oSub?: Subscription
  modal?: MaterialInstance
  isRoot?: boolean
  pending = false

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = event.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = this.modalRef && MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal?.destroy?.()
    this.oSub?.unsubscribe()
  }

  open() {
    this.modal?.open?.()
  }

  cancel() {
    this.modal?.close?.()
  }

  submit() {
    this.pending = true
    this.oSub = this.ordersService.create({
      list: this.order.list.map(({_id, ...order}) => order)
    }).subscribe(
      (order) => {
        this.modal?.close?.()
        this.order.clear()
        MaterialService.toast(`Заказ№${order.order} сохранён`)
      },
      (error) => {
        MaterialService.toast(error.erroe.message)
      },
      ()=>this.pending = false
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }
}
