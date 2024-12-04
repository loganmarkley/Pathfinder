import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent],
  template: `
    <main>
      <app-nav-bar></app-nav-bar>
      <div class="chat-container">
        <div class="chat-box">
          <div class="messages">
            <ng-container *ngFor="let message of messages">
              <div [class]="'message ' + message.type">
                {{ message.text }}
              </div>
            </ng-container>
          </div>
          <div class="input-area">
            <input 
              [(ngModel)]="userInput" 
              (keyup.enter)="sendMessage()"
              placeholder="Type your message..."
              [disabled]="loading"
            >
            <button (click)="sendMessage()" [disabled]="loading">Send</button>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .chat-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
      height: calc(100vh - 120px);
    }
    
    .chat-box {
      width: 80%;
      max-width: 800px;
      background: #f5f5f5;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    
    .message {
      margin: 0.5rem;
      padding: 0.8rem;
      border-radius: 8px;
      max-width: 80%;
      word-break: break-word;
    }
    
    .user {
      background: #007bff;
      color: white;
      margin-left: auto;
    }
    
    .agent {
      background: #e9ecef;
      color: black;
      margin-right: auto;
    }
    
    .input-area {
      display: flex;
      padding: 1rem;
      gap: 0.5rem;
      background: white;
      border-top: 1px solid #ddd;
    }
    
    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    button {
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:disabled {
      background: #ccc;
    }
  `]
})
export class ChatComponent {
  userInput = '';
  messages: Array<{type: string, text: string}> = [];
  loading = false;

  constructor(private agentService: AgentService) {}

  sendMessage() {
    if (!this.userInput.trim() || this.loading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({type: 'user', text: userMessage});
    this.userInput = '';
    this.loading = true;

    this.agentService.interactWithAgent(userMessage).subscribe({
      next: (response) => {
        if (response.response) {
          this.messages.push({type: 'agent', text: response.response});
        } else if (response.error) {
          this.messages.push({type: 'agent', text: `Error: ${response.error}`});
        }
        this.loading = false;
      },
      error: (error) => {
        this.messages.push({type: 'agent', text: 'Sorry, an error occurred.'});
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
} 