import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialService, MaterialInstance} from "../shared/classes/material.service";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef?: ElementRef
  tooltip?: MaterialInstance
  isFilterOpen = false

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tooltip = this.tooltipRef && MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip?.destroy?.()
  }

}
