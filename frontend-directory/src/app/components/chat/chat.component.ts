import { Component } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-chat',
  template: `
    <div>
      <input [(ngModel)]="userMessage" placeholder="Type your message" />
      <button (click)="sendMessage()">Send</button>
      <div *ngIf="agentResponse">
        <strong>Agent:</strong> {{ agentResponse }}
      </div>
    </div>
  `
})
export class ChatComponent {
  userMessage: string = '';
  agentResponse: string | null = null;

  constructor(private agentService: AgentService) {}

  sendMessage() {
    this.agentService.interactWithAgent(this.userMessage).subscribe(
      response => {
        this.agentResponse = response.response;
      },
      error => {
        console.error('Error interacting with agent:', error);
      }
    );
  }
} 