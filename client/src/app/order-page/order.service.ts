import {Injectable} from "@angular/core";
import {OrderPosition, Position} from "../shared/interfaces";

@Injectable()
export class OrderService {
  public list: OrderPosition[] = []
  public price = 0

  add(position: Position) {
    if (!position.quantity) {
      return
    }
    const candidate = this.list.find(((p) => p._id === position._id))
    if (candidate) {
      candidate.quantity += position.quantity
    } else {
      this.list.push({
        name: position.name,
        cost: position.cost,
        quantity: position.quantity || 1,
        _id: position._id
      })
    }
    this.computePrice()
  }

  remove(orderPosition: OrderPosition) {
    const index = this.list.findIndex(p=>p._id = orderPosition._id)
    this.list.splice(index, 1)
    this.computePrice()
  }

  clear() {
    this.list = []
    this.price = 0
  }

  computePrice() {
    this.price = this.list.reduce((sum, item) => sum + item.cost * item.quantity, 0)
  }

}
