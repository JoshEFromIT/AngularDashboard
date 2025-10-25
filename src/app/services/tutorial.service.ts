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
      },
      // UI DESIGN TUTORIALS
      {
        id: 'angular-material',
        title: 'Angular Material - Component Library',
        description: 'Learn to use Angular Material, a comprehensive UI component library following Material Design principles.',
        category: TutorialCategory.UI_DESIGN,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 60,
        sections: [
          {
            id: 'material-setup',
            title: 'Setting Up Angular Material',
            content: `Angular Material is the official Material Design component library for Angular.

Installation Steps:
1. Install Angular Material
2. Configure animations
3. Import modules
4. Add a theme

Benefits:
- Pre-built, tested components
- Consistent Material Design
- Accessibility built-in
- Customizable themes
- Responsive components`,
            codeExample: {
              language: 'bash',
              code: `# Install Angular Material
ng add @angular/material

# Select a theme when prompted
# Choose animations (recommended: yes)
# Set up global typography (recommended: yes)`,
              description: 'Installing Angular Material'
            },
            order: 1
          },
          {
            id: 'material-components',
            title: 'Using Material Components',
            content: `Angular Material provides a wide range of components. Let's use some common ones.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-material-demo',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: \`
    <mat-toolbar color="primary">
      <span>My App</span>
      <span class="spacer"></span>
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Card Title</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>This is a Material Design card component.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">Action</button>
          <button mat-button>Cancel</button>
        </mat-card-actions>
      </mat-card>
    </div>
  \`,
  styles: [\`
    .spacer {
      flex: 1 1 auto;
    }
    .container {
      padding: 20px;
    }
  \`]
})
export class MaterialDemoComponent {}`,
              description: 'Using Material components in your app'
            },
            order: 2
          },
          {
            id: 'material-forms',
            title: 'Material Form Controls',
            content: `Angular Material provides elegant form controls with built-in validation and styling.`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-material-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" placeholder="Enter your name">
        <mat-error *ngIf="form.get('name')?.hasError('required')">
          Name is required
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="form.get('email')?.hasError('email')">
          Please enter a valid email
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Country</mat-label>
        <mat-select formControlName="country">
          <mat-option value="usa">USA</mat-option>
          <mat-option value="uk">UK</mat-option>
          <mat-option value="canada">Canada</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
        Submit
      </button>
    </form>
  \`,
  styles: [\`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
    }
  \`]
})
export class MaterialFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`,
              description: 'Material form controls with validation'
            },
            order: 3
          }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design with CSS Grid & Flexbox',
        description: 'Master modern CSS layout techniques to create responsive, mobile-first Angular applications.',
        category: TutorialCategory.UI_DESIGN,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 75,
        sections: [
          {
            id: 'flexbox-basics',
            title: 'Flexbox Layout',
            content: `Flexbox is perfect for one-dimensional layouts (rows or columns).

Key Concepts:
- Main axis and cross axis
- flex-direction, justify-content, align-items
- flex-grow, flex-shrink, flex-basis
- Perfect for navigation bars, card layouts, centering`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flexbox-demo',
  imports: [CommonModule],
  template: \`
    <nav class="navbar">
      <div class="nav-brand">Logo</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <div class="card-container">
      <div class="card" *ngFor="let item of items">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  \`,
  styles: [\`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #333;
      color: white;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 2rem;
    }

    .card {
      flex: 1 1 300px;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }

    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        gap: 1rem;
      }

      .card {
        flex: 1 1 100%;
      }
    }
  \`]
})
export class FlexboxDemoComponent {
  items = [
    { title: 'Item 1', description: 'Description 1' },
    { title: 'Item 2', description: 'Description 2' },
    { title: 'Item 3', description: 'Description 3' }
  ];
}`,
              description: 'Flexbox layout for navigation and cards'
            },
            order: 1
          },
          {
            id: 'css-grid',
            title: 'CSS Grid Layout',
            content: `CSS Grid is powerful for two-dimensional layouts with rows and columns.

Use Cases:
- Complex page layouts
- Dashboard grids
- Photo galleries
- Magazine-style layouts`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-layout',
  template: \`
    <div class="dashboard">
      <header class="header">Header</header>
      <aside class="sidebar">Sidebar</aside>
      <main class="main-content">
        <div class="widget">Widget 1</div>
        <div class="widget">Widget 2</div>
        <div class="widget">Widget 3</div>
        <div class="widget">Widget 4</div>
      </main>
      <footer class="footer">Footer</footer>
    </div>
  \`,
  styles: [\`
    .dashboard {
      display: grid;
      grid-template-columns: 250px 1fr;
      grid-template-rows: 60px 1fr 50px;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
      min-height: 100vh;
      gap: 1rem;
    }

    .header {
      grid-area: header;
      background: #333;
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
    }

    .sidebar {
      grid-area: sidebar;
      background: #f0f0f0;
      padding: 1rem;
    }

    .main-content {
      grid-area: main;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .widget {
      background: white;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      min-height: 200px;
    }

    .footer {
      grid-area: footer;
      background: #333;
      color: white;
      padding: 1rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .dashboard {
        grid-template-columns: 1fr;
        grid-template-areas:
          "header"
          "main"
          "sidebar"
          "footer";
      }
    }
  \`]
})
export class GridLayoutComponent {}`,
              description: 'CSS Grid for dashboard layout'
            },
            order: 2
          },
          {
            id: 'mobile-first',
            title: 'Mobile-First Design',
            content: `Mobile-first means designing for mobile devices first, then progressively enhancing for larger screens.

Best Practices:
- Start with mobile styles
- Use min-width media queries
- Touch-friendly targets (44px minimum)
- Readable font sizes (16px minimum)
- Simplified navigation for mobile`,
            codeExample: {
              language: 'css',
              code: `/* Mobile-first styles (no media query needed) */
.container {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.button {
  min-height: 44px; /* Touch-friendly */
  font-size: 16px;
  padding: 0.75rem 1.5rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
              description: 'Mobile-first responsive design'
            },
            order: 3
          }
        ]
      },
      {
        id: 'angular-animations',
        title: 'Angular Animations',
        description: 'Create smooth, engaging animations using Angular\'s powerful animation system.',
        category: TutorialCategory.UI_DESIGN,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 90,
        sections: [
          {
            id: 'animation-basics',
            title: 'Animation Basics',
            content: `Angular's animation system is built on CSS functionality and provides a simple DSL for creating animations.

Core Concepts:
- States: Define different animation states
- Transitions: Define how to animate between states
- Triggers: Attach animations to elements
- Timing: Control duration and easing`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-animation-demo',
  template: \`
    <div class="box" [@boxState]="currentState" (click)="toggleState()">
      Click me!
    </div>
  \`,
  styles: [\`
    .box {
      width: 200px;
      height: 200px;
      background: #dd0031;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: bold;
    }
  \`],
  animations: [
    trigger('boxState', [
      state('small', style({
        transform: 'scale(1)',
        backgroundColor: '#dd0031'
      })),
      state('large', style({
        transform: 'scale(1.5)',
        backgroundColor: '#4caf50'
      })),
      transition('small <=> large', animate('300ms ease-in-out'))
    ])
  ]
})
export class AnimationDemoComponent {
  currentState = 'small';

  toggleState(): void {
    this.currentState = this.currentState === 'small' ? 'large' : 'small';
  }
}`,
              description: 'Basic state-based animation'
            },
            order: 1
          },
          {
            id: 'enter-leave',
            title: 'Enter and Leave Animations',
            content: `Animate elements as they enter or leave the DOM.

Common Uses:
- Fade in/out effects
- Slide animations
- List item additions/removals
- Modal dialogs`,
            codeExample: {
              language: 'typescript',
              code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list-animation',
  imports: [CommonModule],
  template: \`
    <button (click)="addItem()">Add Item</button>

    <ul>
      <li *ngFor="let item of items; let i = index"
          [@fadeSlide]
          (click)="removeItem(i)">
        {{ item }} (click to remove)
      </li>
    </ul>
  \`,
  styles: [\`
    li {
      padding: 1rem;
      margin: 0.5rem 0;
      background: #f0f0f0;
      cursor: pointer;
      border-radius: 4px;
    }
    li:hover {
      background: #e0e0e0;
    }
  \`],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ListAnimationComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  counter = 4;

  addItem(): void {
    this.items.push(\`Item \${this.counter++}\`);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}`,
              description: 'Enter and leave animations for list items'
            },
            order: 2
          }
        ]
      },
      // PROJECT TUTORIALS
      {
        id: 'project-todo-app',
        title: 'Project: Todo List Application',
        description: 'Build a complete todo application with CRUD operations, filtering, and local storage.',
        category: TutorialCategory.PROJECTS,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 120,
        sections: [
          {
            id: 'todo-overview',
            title: 'Project Overview',
            content: `Build a fully functional Todo List application to practice fundamental Angular concepts.

Features to Implement:
- Add new todos
- Mark todos as complete
- Edit existing todos
- Delete todos
- Filter by status (all, active, completed)
- Persist data in localStorage
- Display todo count

Skills You'll Practice:
- Component communication
- Forms and validation
- Event handling
- Data binding
- Services for state management
- localStorage API
- TypeScript interfaces`,
            order: 1
          },
          {
            id: 'todo-model',
            title: 'Step 1: Create the Todo Model',
            content: `First, define the data structure for a todo item.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/models/todo.model.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';`,
              description: 'Todo model and filter type'
            },
            order: 2
          },
          {
            id: 'todo-service',
            title: 'Step 2: Create Todo Service',
            content: `Create a service to manage todos and handle localStorage.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodos());
  public todos$ = this.todosSubject.asObservable();

  private loadTodos(): Todo[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  addTodo(title: string): void {
    const todos = this.todosSubject.value;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date()
    };
    this.saveTodos([...todos, newTodo]);
  }

  toggleTodo(id: string): void {
    const todos = this.todosSubject.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos(todos);
  }

  deleteTodo(id: string): void {
    const todos = this.todosSubject.value.filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }

  updateTodo(id: string, title: string): void {
    const todos = this.todosSubject.value.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    );
    this.saveTodos(todos);
  }
}`,
              description: 'Todo service with localStorage'
            },
            order: 3
          },
          {
            id: 'todo-component',
            title: 'Step 3: Create Todo Component',
            content: `Build the main component with the UI and logic.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoFilter } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  newTodoTitle = '';
  filter: TodoFilter = 'all';
  editingId: string | null = null;
  editingTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle.trim());
      this.newTodoTitle = '';
    }
  }

  toggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  startEdit(todo: Todo): void {
    this.editingId = todo.id;
    this.editingTitle = todo.title;
  }

  saveEdit(): void {
    if (this.editingId && this.editingTitle.trim()) {
      this.todoService.updateTodo(this.editingId, this.editingTitle.trim());
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }

  setFilter(filter: TodoFilter): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'active':
        this.filteredTodos = this.todos.filter(t => !t.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(t => t.completed);
        break;
      default:
        this.filteredTodos = this.todos;
    }
  }

  get activeCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }
}`,
              description: 'Complete todo component logic'
            },
            order: 4
          },
          {
            id: 'todo-template',
            title: 'Step 4: Create the Template',
            content: `Design the user interface for the todo app.`,
            codeExample: {
              language: 'html',
              code: `<!-- todo-list.component.html -->
<div class="todo-app">
  <h1>My Todos</h1>

  <!-- Add Todo Form -->
  <div class="add-todo">
    <input
      type="text"
      [(ngModel)]="newTodoTitle"
      (keyup.enter)="addTodo()"
      placeholder="What needs to be done?"
      class="todo-input"
    />
    <button (click)="addTodo()" class="add-btn">Add</button>
  </div>

  <!-- Filter Buttons -->
  <div class="filters">
    <button
      (click)="setFilter('all')"
      [class.active]="filter === 'all'"
    >
      All ({{ todos.length }})
    </button>
    <button
      (click)="setFilter('active')"
      [class.active]="filter === 'active'"
    >
      Active ({{ activeCount }})
    </button>
    <button
      (click)="setFilter('completed')"
      [class.active]="filter === 'completed'"
    >
      Completed ({{ todos.length - activeCount }})
    </button>
  </div>

  <!-- Todo List -->
  <ul class="todo-list">
    <li *ngFor="let todo of filteredTodos" class="todo-item">
      <input
        type="checkbox"
        [checked]="todo.completed"
        (change)="toggleTodo(todo.id)"
        class="todo-checkbox"
      />

      <div *ngIf="editingId !== todo.id" class="todo-content">
        <span [class.completed]="todo.completed">{{ todo.title }}</span>
      </div>

      <input
        *ngIf="editingId === todo.id"
        type="text"
        [(ngModel)]="editingTitle"
        (keyup.enter)="saveEdit()"
        (keyup.escape)="cancelEdit()"
        class="edit-input"
      />

      <div class="todo-actions">
        <button
          *ngIf="editingId !== todo.id"
          (click)="startEdit(todo)"
          class="edit-btn"
        >
          Edit
        </button>
        <button
          *ngIf="editingId === todo.id"
          (click)="saveEdit()"
          class="save-btn"
        >
          Save
        </button>
        <button (click)="deleteTodo(todo.id)" class="delete-btn">Delete</button>
      </div>
    </li>
  </ul>

  <p *ngIf="filteredTodos.length === 0" class="empty-message">
    No todos found. Add one above!
  </p>
</div>`,
              description: 'Todo list template'
            },
            order: 5
          },
          {
            id: 'todo-styling',
            title: 'Step 5: Add Styles',
            content: `Style the todo application for a clean, modern look.`,
            codeExample: {
              language: 'css',
              code: `.todo-app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: #dd0031;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters button {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background: white;
  border-color: #dd0031;
  color: #dd0031;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.todo-content {
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .save-btn, .delete-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn {
  background: #2196f3;
  color: white;
}

.save-btn {
  background: #4caf50;
  color: white;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem;
}`,
              description: 'Todo app styles'
            },
            order: 6
          }
        ]
      },
      {
        id: 'project-weather-dashboard',
        title: 'Project: Weather Dashboard',
        description: 'Build a weather dashboard that fetches real-time data from a weather API.',
        category: TutorialCategory.PROJECTS,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 150,
        sections: [
          {
            id: 'weather-overview',
            title: 'Project Overview',
            content: `Create a weather dashboard that displays current weather and forecasts.

Features:
- Search for cities
- Display current weather conditions
- Show 5-day forecast
- Temperature unit toggle (°C/°F)
- Save favorite cities
- Responsive design
- Loading states and error handling

APIs:
- OpenWeatherMap API (free tier available)
- Geolocation API

Skills You'll Practice:
- HTTP requests and API integration
- RxJS operators (map, catchError, debounceTime)
- Error handling
- Loading states
- Responsive UI design
- Local storage
- Environment variables`,
            order: 1
          },
          {
            id: 'weather-setup',
            title: 'Step 1: Setup & API Key',
            content: `Get your free API key from OpenWeatherMap and configure your environment.`,
            codeExample: {
              language: 'typescript',
              code: `// 1. Sign up at https://openweathermap.org/api
// 2. Get your free API key

// src/environments/environment.ts
export const environment = {
  production: false,
  weatherApiKey: 'YOUR_API_KEY_HERE',
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  weatherApiKey: 'YOUR_API_KEY_HERE',
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5'
};`,
              description: 'Environment configuration'
            },
            order: 2
          },
          {
            id: 'weather-models',
            title: 'Step 2: Create Weather Models',
            content: `Define TypeScript interfaces for weather data.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/models/weather.model.ts
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  date: Date;
}

export interface ForecastDay {
  date: Date;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
}

export interface WeatherResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: { speed: number };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';`,
              description: 'Weather data models'
            },
            order: 3
          },
          {
            id: 'weather-service',
            title: 'Step 3: Create Weather Service',
            content: `Build a service to fetch weather data from the API.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeatherData, WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<WeatherResponse>(\`\${this.apiUrl}/weather\`, { params })
      .pipe(
        map(response => this.mapToWeatherData(response)),
        catchError(error => {
          console.error('Error fetching weather:', error);
          return throwError(() => new Error('Failed to fetch weather data'));
        })
      );
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<WeatherResponse>(\`\${this.apiUrl}/weather\`, { params })
      .pipe(
        map(response => this.mapToWeatherData(response)),
        catchError(error => throwError(() => new Error('Failed to fetch weather data')))
      );
  }

  private mapToWeatherData(response: WeatherResponse): WeatherData {
    return {
      city: response.name,
      country: response.sys.country,
      temperature: Math.round(response.main.temp),
      feelsLike: Math.round(response.main.feels_like),
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      description: response.weather[0].description,
      icon: \`https://openweathermap.org/img/wn/\${response.weather[0].icon}@2x.png\`,
      date: new Date()
    };
  }

  convertTemp(temp: number, toUnit: 'celsius' | 'fahrenheit'): number {
    if (toUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  }
}`,
              description: 'Weather service with API integration'
            },
            order: 4
          },
          {
            id: 'weather-component',
            title: 'Step 4: Build Weather Component',
            content: `Create the main weather dashboard component.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/components/weather-dashboard/weather-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, TemperatureUnit } from '../../models/weather.model';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent {
  weatherData: WeatherData | null = null;
  loading = false;
  error = '';
  searchCity = '';
  unit: TemperatureUnit = 'celsius';
  favorites: string[] = this.loadFavorites();

  constructor(private weatherService: WeatherService) {
    this.getCurrentLocation();
  }

  searchWeather(): void {
    if (!this.searchCity.trim()) return;

    this.loading = true;
    this.error = '';

    this.weatherService.getCurrentWeather(this.searchCity).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'City not found. Please try again.';
        this.loading = false;
      }
    });
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.weatherService.getWeatherByCoordinates(latitude, longitude)
            .subscribe({
              next: (data) => {
                this.weatherData = data;
                this.loading = false;
              },
              error: () => {
                this.loading = false;
              }
            });
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  toggleUnit(): void {
    this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius';
  }

  getTemperature(temp: number): number {
    return this.weatherService.convertTemp(temp, this.unit);
  }

  addToFavorites(): void {
    if (this.weatherData && !this.favorites.includes(this.weatherData.city)) {
      this.favorites.push(this.weatherData.city);
      this.saveFavorites();
    }
  }

  loadFavorite(city: string): void {
    this.searchCity = city;
    this.searchWeather();
  }

  removeFavorite(city: string): void {
    this.favorites = this.favorites.filter(c => c !== city);
    this.saveFavorites();
  }

  private loadFavorites(): string[] {
    const stored = localStorage.getItem('weather-favorites');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem('weather-favorites', JSON.stringify(this.favorites));
  }
}`,
              description: 'Weather dashboard component'
            },
            order: 5
          }
        ],
        prerequisites: ['http-client']
      },
      {
        id: 'project-ecommerce',
        title: 'Project: E-Commerce Product Catalog',
        description: 'Build a complete e-commerce product catalog with cart functionality, filters, and checkout.',
        category: TutorialCategory.PROJECTS,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 240,
        sections: [
          {
            id: 'ecommerce-overview',
            title: 'Project Overview',
            content: `Build a full-featured e-commerce application with modern architecture.

Features:
- Product listing with images
- Category and price filtering
- Search functionality
- Product detail pages
- Shopping cart with quantity controls
- Cart persistence
- Checkout process
- Order summary
- Responsive design

Architecture:
- Feature-based module structure
- State management with services
- Route guards
- Lazy loading
- Shared components
- Reusable pipes

Skills You'll Practice:
- Complex state management
- Route parameters and navigation
- Guards and resolvers
- Component composition
- Custom pipes
- Form validation
- Advanced RxJS patterns`,
            order: 1
          },
          {
            id: 'ecommerce-models',
            title: 'Step 1: Define Models',
            content: `Create comprehensive models for your e-commerce data.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/models/product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  date: Date;
  status: OrderStatus;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered'
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}`,
              description: 'E-commerce data models'
            },
            order: 2
          },
          {
            id: 'ecommerce-service',
            title: 'Step 2: Create Cart Service',
            content: `Build a robust cart management service.`,
            codeExample: {
              language: 'typescript',
              code: `// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'shopping-cart';
  private cartSubject = new BehaviorSubject<Cart>(this.loadCart());
  public cart$ = this.cartSubject.asObservable();

  private loadCart(): Cart {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    this.updateCartTotal(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter(item => item.product.id !== productId);
    this.updateCartTotal(cart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.items.find(item => item.product.id === productId);

    if (item) {
      item.quantity = Math.max(1, quantity);
      this.updateCartTotal(cart);
    }
  }

  clearCart(): void {
    this.saveCart({ items: [], total: 0 });
  }

  private updateCartTotal(cart: Cart): void {
    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    this.saveCart(cart);
  }

  getItemCount(): number {
    return this.cartSubject.value.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }
}`,
              description: 'Shopping cart service'
            },
            order: 3
          }
        ],
        prerequisites: ['routing-basics', 'http-client', 'services-di']
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
