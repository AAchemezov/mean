import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Order} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input('orders') orders?: Order[]
  @ViewChild('modal') modalRef?: ElementRef
  modal?: MaterialInstance
  selectedOrder?: Order

  computePrice(order: Order): number {
    return order.list.reduce((summ, item) => summ + item.cost * item.quantity, 0)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal?.open?.()
  }

  ngAfterViewInit(): void {
    this.modal = this.modalRef && MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal?.destroy?.()
  }

  closeModal() {
    this.modal?.close?.()
  }
}
