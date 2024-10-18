import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() message: Array<any> = [];

  // Creamos un EventEmitter para emitir eventos hacia el padre
  @Output() messageOut = new EventEmitter<string>();

  newMessage:string="";
sendMessage() {
    this.messageOut.emit(this.newMessage);
    this.newMessage=""
  }


  // Método para determinar la clase basada en el remitente
  getMessageClass(role: string): string {
    console.log(this.message)

    console.log(role)
    return role === 'user' ? 'message other-message float-right ' : 'message my-message';
  }

}
