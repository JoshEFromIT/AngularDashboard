import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Tutorial,
  TutorialCategory,
  DifficultyLevel,
  TutorialSection
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private tutorials: Tutorial[] = [];

  constructor(private http: HttpClient) {
    this.initializeTutorials();
  }

  /**
   * Initialize with built-in tutorials
   * In a real application, this could fetch from an API
   */
  private initializeTutorials(): void {
    this.tutorials = [
      {
        id: 'angular-intro',
        title: 'Introduction to Angular',
        description: 'Learn the basics of Angular framework, its architecture, and core concepts.',
        category: TutorialCategory.BASICS,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 30,
        sections: [
          {
            id: 'what-is-angular',
            title: 'What is Angular?',
            content: `Angular is a powerful, open-source web application framework developed and maintained by Google.

It's a complete rewrite of AngularJS and provides a platform for building scalable single-page applications (SPAs).

Key Features:
- Component-based architecture
- Two-way data binding
- Dependency injection
- TypeScript support
- Powerful CLI tools
- Rich ecosystem of libraries`,
            order: 1
          },
          {
            id: 'first-component',
            title: 'Your First Component',
            content: `Components are the building blocks of Angular applications. Every Angular app has at least one component - the root component.

A component consists of:
1. TypeScript class (logic)
2. HTML template (view)
3. CSS styles (optional)`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: \`
    <div class="hello-container">
      <h1>{{ title }}</h1>
      <p>Welcome to Angular!</p>
    </div>
  \`,
  styles: [\`
    .hello-container {
      padding: 20px;
      text-align: center;
    }
  \`]
})
export class HelloComponent {
  title = 'Hello Angular';
}`,
              description: 'A simple Angular component with template and styles'
            },
            order: 2
          }
        ]
      },
      {
        id: 'data-binding',
        title: 'Data Binding in Angular',
        description: 'Master Angular\'s powerful data binding mechanisms.',
        category: TutorialCategory.BASICS,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 45,
        sections: [
          {
            id: 'interpolation',
            title: 'Interpolation',
            content: `Interpolation allows you to embed expressions into your HTML template using double curly braces {{ }}.

Angular evaluates the expression and converts the result to a string.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  template: \`
    <h2>{{ title }}</h2>
    <p>1 + 1 = {{ 1 + 1 }}</p>
    <p>Hello {{ userName }}!</p>
  \`
})
export class InterpolationComponent {
  title = 'Interpolation Example';
  userName = 'Developer';
}`,
              description: 'Using interpolation to display dynamic data'
            },
            order: 1
          },
          {
            id: 'property-binding',
            title: 'Property Binding',
            content: `Property binding allows you to set properties of HTML elements or directives.

Use square brackets [property] to bind to a property.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: \`
    <img [src]="imageUrl" [alt]="imageAlt">
    <button [disabled]="isDisabled">Click Me</button>
    <input [value]="inputValue">
  \`
})
export class PropertyBindingComponent {
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  imageAlt = 'Angular Logo';
  isDisabled = false;
  inputValue = 'Hello';
}`,
              description: 'Binding to element properties'
            },
            order: 2
          },
          {
            id: 'event-binding',
            title: 'Event Binding',
            content: `Event binding allows you to listen to events such as clicks, mouse movements, key presses, etc.

Use parentheses (event) to bind to an event.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  template: \`
    <button (click)="handleClick()">Click Me</button>
    <input (keyup)="onKeyUp($event)">
    <p>You clicked {{ clickCount }} times</p>
    <p>Last key: {{ lastKey }}</p>
  \`
})
export class EventBindingComponent {
  clickCount = 0;
  lastKey = '';

  handleClick(): void {
    this.clickCount++;
  }

  onKeyUp(event: KeyboardEvent): void {
    this.lastKey = (event.target as HTMLInputElement).value;
  }
}`,
              description: 'Handling user events'
            },
            order: 3
          },
          {
            id: 'two-way-binding',
            title: 'Two-Way Binding',
            content: `Two-way binding combines property binding and event binding using [(ngModel)].

This creates a two-way data flow between the component and the template.

Note: You need to import FormsModule to use ngModel.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="name">
    <p>Hello {{ name }}!</p>
  \`
})
export class TwoWayBindingComponent {
  name = 'Angular Developer';
}`,
              description: 'Two-way data binding with ngModel'
            },
            order: 4
          }
        ]
      },
      {
        id: 'services-di',
        title: 'Services and Dependency Injection',
        description: 'Learn how to create services and use dependency injection in Angular.',
        category: TutorialCategory.SERVICES,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 50,
        sections: [
          {
            id: 'what-are-services',
            title: 'What are Services?',
            content: `Services are classes that handle business logic, data access, or other reusable functionality.

They follow the Single Responsibility Principle and keep components lean.

Benefits:
- Code reusability
- Separation of concerns
- Easier testing
- Shared state management`,
            order: 1
          },
          {
            id: 'creating-service',
            title: 'Creating a Service',
            content: `Services are typically created with the @Injectable decorator and can be provided at different levels.`,
            codeExample: {
              language: 'typescript',
              code: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Service is available app-wide
})
export class DataService {
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return this.data;
  }

  clearData(): void {
    this.data = [];
  }
}`,
              description: 'A simple service for managing data'
            },
            order: 2
          },
          {
            id: 'using-service',
            title: 'Using a Service',
            content: `To use a service, inject it into your component's constructor.

Angular's dependency injection system will provide the instance.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-list',
  template: \`
    <div>
      <input #inputBox>
      <button (click)="add(inputBox.value)">Add</button>
      <button (click)="clear()">Clear</button>

      <ul>
        <li *ngFor="let item of items">{{ item }}</li>
      </ul>
    </div>
  \`
})
export class DataListComponent {
  items: string[] = [];

  constructor(private dataService: DataService) {
    this.items = this.dataService.getData();
  }

  add(value: string): void {
    if (value) {
      this.dataService.addData(value);
    }
  }

  clear(): void {
    this.dataService.clearData();
  }
}`,
              description: 'Component using the DataService'
            },
            order: 3
          }
        ],
        prerequisites: ['angular-intro']
      },
      {
        id: 'routing-basics',
        title: 'Angular Routing',
        description: 'Navigate between different views in your Angular application.',
        category: TutorialCategory.ROUTING,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 40,
        sections: [
          {
            id: 'setup-routing',
            title: 'Setting Up Routes',
            content: `Angular Router enables navigation between different views/components.

Routes are defined in a routes configuration array.`,
            codeExample: {
              language: 'typescript',
              code: `import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];`,
              description: 'Basic route configuration'
            },
            order: 1
          },
          {
            id: 'router-outlet',
            title: 'Router Outlet',
            content: `The <router-outlet> directive acts as a placeholder where the routed component should be displayed.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
      <a routerLink="/contact">Contact</a>
    </nav>

    <router-outlet></router-outlet>
  \`,
  styles: [\`
    nav {
      padding: 1rem;
      background: #333;
    }
    nav a {
      color: white;
      margin: 0 1rem;
      text-decoration: none;
    }
  \`]
})
export class AppComponent {
  title = 'My App';
}`,
              description: 'App component with navigation'
            },
            order: 2
          }
        ],
        prerequisites: ['angular-intro', 'data-binding']
      },
      {
        id: 'http-client',
        title: 'HTTP Client',
        description: 'Make HTTP requests to external APIs and handle responses.',
        category: TutorialCategory.HTTP,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 55,
        sections: [
          {
            id: 'http-setup',
            title: 'Setting Up HttpClient',
            content: `Angular's HttpClient module provides a simplified API for HTTP functionality.

It's based on Observables from RxJS, making it powerful for handling asynchronous operations.`,
            codeExample: {
              language: 'typescript',
              code: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(\`\${this.apiUrl}/\${id}\`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}`,
              description: 'Service with HTTP operations'
            },
            order: 1
          },
          {
            id: 'using-http',
            title: 'Using HTTP Service',
            content: `Subscribe to Observables to receive data from HTTP requests.

Always handle errors appropriately.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: \`
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <ul *ngIf="!loading && !error">
      <li *ngFor="let user of users">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  \`
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error(err);
      }
    });
  }
}`,
              description: 'Component using HTTP service'
            },
            order: 2
          }
        ],
        prerequisites: ['services-di']
      }
    ];
  }

  /**
   * Get all available tutorials
   */
  getTutorials(): Observable<Tutorial[]> {
    return of(this.tutorials);
  }

  /**
   * Get a specific tutorial by ID
   */
  getTutorial(id: string): Observable<Tutorial | undefined> {
    const tutorial = this.tutorials.find(t => t.id === id);
    return of(tutorial);
  }

  /**
   * Get tutorials by category
   */
  getTutorialsByCategory(category: TutorialCategory): Observable<Tutorial[]> {
    const filtered = this.tutorials.filter(t => t.category === category);
    return of(filtered);
  }

  /**
   * Get tutorials by difficulty level
   */
  getTutorialsByDifficulty(difficulty: DifficultyLevel): Observable<Tutorial[]> {
    const filtered = this.tutorials.filter(t => t.difficulty === difficulty);
    return of(filtered);
  }

  /**
   * Search tutorials by keyword
   */
  searchTutorials(keyword: string): Observable<Tutorial[]> {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = this.tutorials.filter(
      t =>
        t.title.toLowerCase().includes(lowerKeyword) ||
        t.description.toLowerCase().includes(lowerKeyword)
    );
    return of(filtered);
  }

  /**
   * Fetch additional tutorials from external API
   * This can be extended to fetch from real APIs like:
   * - GitHub gists
   * - Dev.to API
   * - Medium API
   * - Custom tutorial backend
   */
  fetchExternalTutorials(): Observable<Tutorial[]> {
    // Example: Fetch from a public API
    // return this.http.get<Tutorial[]>('https://api.example.com/tutorials');

    // For now, return empty array
    // In production, implement actual API calls
    return of([]);
  }
}
