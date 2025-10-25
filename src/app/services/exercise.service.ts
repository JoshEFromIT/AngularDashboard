import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
  CodeExercise,
  ExerciseType,
  ExerciseCategory,
  DifficultyLevel,
  QuestionType,
  ExerciseProgress,
  UserExerciseData
} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercises: CodeExercise[] = [];
  private readonly STORAGE_KEY = 'exercise_progress';
  private progressSubject: BehaviorSubject<UserExerciseData>;

  constructor() {
    this.initializeExercises();
    const savedProgress = this.loadProgress();
    this.progressSubject = new BehaviorSubject<UserExerciseData>(savedProgress);
  }

  private initializeExercises(): void {
    this.exercises = [
      // BEGINNER EXERCISES
      {
        id: 'quiz-angular-basics',
        title: 'Angular Fundamentals Quiz',
        description: 'Test your knowledge of Angular basics including components, templates, and data binding.',
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 20,
        category: ExerciseCategory.FUNDAMENTALS,
        type: ExerciseType.QUIZ,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              question: 'What decorator is used to define an Angular component?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['@NgModule', '@Component', '@Directive', '@Injectable'],
              correctAnswer: '@Component',
              explanation: '@Component is the decorator used to define a component class and its metadata including selector, template, and styles.'
            },
            {
              id: 'q2',
              question: 'Which syntax is used for property binding in Angular?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['{{ property }}', '[property]', '(property)', '[(property)]'],
              correctAnswer: '[property]',
              explanation: 'Square brackets [] are used for property binding, binding a value from the component to an element property.'
            },
            {
              id: 'q3',
              question: 'What will this code display?\n```typescript\nexport class AppComponent {\n  name = "Angular";\n}\n```\n```html\n<h1>Hello {{ name }}!</h1>\n```',
              type: QuestionType.CODE_OUTPUT,
              options: ['Hello Angular!', 'Hello {{ name }}!', 'Hello name!', 'Error'],
              correctAnswer: 'Hello Angular!',
              explanation: 'Interpolation {{ }} evaluates the expression and converts it to a string. It will display "Hello Angular!"',
              code: 'export class AppComponent {\n  name = "Angular";\n}'
            },
            {
              id: 'q4',
              question: 'Event binding uses parentheses () to listen to events.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'Event binding uses parentheses (event) to listen to and respond to user actions like clicks, keypresses, etc.'
            },
            {
              id: 'q5',
              question: 'Two-way binding in Angular uses which syntax?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['[]', '()', '[()]', '{{}}'],
              correctAnswer: '[()]',
              explanation: 'Two-way binding uses [(ngModel)] which combines property binding [] and event binding () - also called "banana in a box" syntax.'
            },
            {
              id: 'q6',
              question: 'What is the purpose of the ngOnInit lifecycle hook?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'To initialize the component after Angular creates it',
                'To destroy the component',
                'To detect changes in the component',
                'To render the template'
              ],
              correctAnswer: 'To initialize the component after Angular creates it',
              explanation: 'ngOnInit is called once after the component is initialized, making it perfect for initialization logic and data fetching.'
            }
          ]
        },
        knowledgeChecks: [
          {
            id: 'kc1',
            concept: 'Component Anatomy',
            question: 'What are the three main parts of an Angular component?',
            answer: 'TypeScript class (logic), HTML template (view), and CSS styles (presentation)',
            importance: 'high'
          },
          {
            id: 'kc2',
            concept: 'Data Flow',
            question: 'How does data flow from parent to child components?',
            answer: 'Data flows from parent to child using @Input() properties',
            importance: 'high'
          }
        ]
      },
      {
        id: 'challenge-component-creation',
        title: 'Build Your First Component',
        description: 'Create a user profile card component with properties and event handling.',
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 45,
        category: ExerciseCategory.COMPONENTS,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc1',
          prompt: `Create a UserCardComponent that displays user information and emits an event when clicked.

Requirements:
1. Accept @Input properties: name, email, and avatar URL
2. Display the user information in a card layout
3. Emit an @Output event when the card is clicked
4. Add a "Follow" button that tracks follow state

The component should be reusable and follow Angular best practices.`,
          starterCode: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <!-- Add your template here -->
  \`,
  styles: [\`
    /* Add your styles here */
  \`]
})
export class UserCardComponent {
  // Add your properties and methods here
}`,
          solution: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <div class="user-card" (click)="onCardClick()">
      <img [src]="avatarUrl" [alt]="name" class="avatar">
      <div class="user-info">
        <h3>{{ name }}</h3>
        <p>{{ email }}</p>
      </div>
      <button
        (click)="onFollowClick($event)"
        [class.following]="isFollowing"
        class="follow-btn">
        {{ isFollowing ? 'Following' : 'Follow' }}
      </button>
    </div>
  \`,
  styles: [\`
    .user-card {
      display: flex;
      align-items: center;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: box-shadow 0.3s;
    }
    .user-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 1rem;
    }
    .user-info {
      flex: 1;
    }
    .follow-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #dd0031;
      background: white;
      color: #dd0031;
      border-radius: 4px;
      cursor: pointer;
    }
    .follow-btn.following {
      background: #dd0031;
      color: white;
    }
  \`]
})
export class UserCardComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() avatarUrl: string = '';
  @Output() cardClick = new EventEmitter<void>();
  @Output() followToggle = new EventEmitter<boolean>();

  isFollowing = false;

  onCardClick(): void {
    this.cardClick.emit();
  }

  onFollowClick(event: Event): void {
    event.stopPropagation(); // Prevent card click
    this.isFollowing = !this.isFollowing;
    this.followToggle.emit(this.isFollowing);
  }
}`,
          testCases: [
            {
              input: '@Input() name = "John Doe"',
              expectedOutput: 'Displays "John Doe" in the h3 tag',
              description: 'Component accepts and displays name input'
            },
            {
              input: 'Click on card',
              expectedOutput: 'cardClick event is emitted',
              description: 'Card click emits event'
            },
            {
              input: 'Click follow button',
              expectedOutput: 'isFollowing toggles, followToggle event emitted',
              description: 'Follow button toggles state and emits event'
            }
          ],
          hints: [
            'Use @Input() decorator to accept properties from parent component',
            'Use @Output() with EventEmitter to emit events',
            'Remember to stop event propagation on the button click',
            'Use [class.following] for conditional styling'
          ],
          guidelines: [
            'Keep the component focused on presentation',
            'Use meaningful event names',
            'Make the component reusable',
            'Add proper TypeScript types'
          ]
        }
      },
      {
        id: 'project-contact-form',
        title: 'Build a Contact Form Application',
        description: 'Create a complete contact form with validation, submission, and success messaging.',
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 90,
        category: ExerciseCategory.FORMS,
        type: ExerciseType.PROJECT_ASSIGNMENT,
        prerequisites: ['angular-intro', 'data-binding'],
        projectAssignment: {
          id: 'pa1',
          brief: `Build a contact form application that allows users to submit inquiries. The form should include validation, error handling, and success feedback.`,
          requirements: [
            'Create a reactive contact form with name, email, subject, and message fields',
            'Implement form validation (required fields, email format)',
            'Display validation errors below each field',
            'Disable submit button when form is invalid',
            'Show loading state during submission',
            'Display success message after submission',
            'Clear form after successful submission',
            'Make the form responsive'
          ],
          userStories: [
            'As a user, I want to fill out a contact form so I can send inquiries',
            'As a user, I want to see validation errors so I know what to fix',
            'As a user, I want confirmation that my message was sent',
            'As a user, I want the form to work on mobile devices'
          ],
          technicalSpecs: [
            'Use ReactiveFormsModule',
            'Implement custom validators if needed',
            'Use FormBuilder for form creation',
            'Handle async operations with RxJS',
            'Add proper TypeScript typing',
            'Follow Angular style guide'
          ],
          milestones: [
            {
              id: 'm1',
              title: 'Setup and Form Structure',
              description: 'Create the component and form structure',
              tasks: [
                'Generate ContactFormComponent',
                'Import ReactiveFormsModule',
                'Create FormGroup with FormBuilder',
                'Add form controls for name, email, subject, message'
              ],
              estimatedTime: 20
            },
            {
              id: 'm2',
              title: 'Add Validation',
              description: 'Implement form validation',
              tasks: [
                'Add required validators to all fields',
                'Add email validator to email field',
                'Create validation error messages',
                'Display errors in template'
              ],
              estimatedTime: 25
            },
            {
              id: 'm3',
              title: 'Submission Logic',
              description: 'Handle form submission',
              tasks: [
                'Create submit handler',
                'Add loading state',
                'Simulate API call with setTimeout',
                'Show success message',
                'Reset form after submission'
              ],
              estimatedTime: 25
            },
            {
              id: 'm4',
              title: 'Styling and Polish',
              description: 'Add styling and responsiveness',
              tasks: [
                'Style the form',
                'Add responsive design',
                'Add smooth transitions',
                'Test on different screen sizes'
              ],
              estimatedTime: 20
            }
          ],
          resources: [
            {
              title: 'Angular Reactive Forms Guide',
              url: 'https://angular.dev/guide/forms/reactive-forms',
              type: 'documentation'
            },
            {
              title: 'Form Validation',
              url: 'https://angular.dev/guide/forms/form-validation',
              type: 'documentation'
            }
          ]
        }
      },
      // INTERMEDIATE EXERCISES
      {
        id: 'quiz-services-di',
        title: 'Services & Dependency Injection Quiz',
        description: 'Test your understanding of services, dependency injection, and RxJS observables.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        category: ExerciseCategory.SERVICES,
        type: ExerciseType.QUIZ,
        quiz: {
          passingScore: 75,
          questions: [
            {
              id: 'q1',
              question: 'What does the @Injectable({ providedIn: "root" }) decorator do?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Makes the service available only in the root module',
                'Creates a singleton instance available application-wide',
                'Prevents the service from being injected',
                'Makes the service injectable into other services only'
              ],
              correctAnswer: 'Creates a singleton instance available application-wide',
              explanation: 'providedIn: "root" creates a singleton service that is available throughout the entire application and is tree-shakeable.'
            },
            {
              id: 'q2',
              question: 'How do you inject a service into a component?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Using @Input() decorator',
                'Through the constructor parameters',
                'Using the inject() function in ngOnInit',
                'By importing it in the component decorator'
              ],
              correctAnswer: 'Through the constructor parameters',
              explanation: 'Services are injected through constructor dependency injection: constructor(private myService: MyService) {}'
            },
            {
              id: 'q3',
              question: 'What is the purpose of BehaviorSubject in Angular services?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'To make HTTP requests',
                'To manage and share state across components',
                'To handle routing',
                'To validate forms'
              ],
              correctAnswer: 'To manage and share state across components',
              explanation: 'BehaviorSubject is perfect for state management as it stores the current value and emits it to new subscribers immediately.'
            },
            {
              id: 'q4',
              question: 'Services should contain business logic, not presentation logic.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'Services should handle business logic, data access, and state management. Presentation logic belongs in components.'
            },
            {
              id: 'q5',
              question: 'What operator would you use to transform data from an HTTP response?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['filter', 'map', 'reduce', 'subscribe'],
              correctAnswer: 'map',
              explanation: 'The map operator is used to transform emitted values, perfect for transforming HTTP response data.',
              code: 'this.http.get(url).pipe(\n  map(response => transform(response))\n)'
            }
          ]
        }
      },
      {
        id: 'challenge-data-service',
        title: 'Build a Data Service with CRUD Operations',
        description: 'Create a service that manages data with full CRUD operations and state management.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 60,
        category: ExerciseCategory.SERVICES,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc2',
          prompt: `Create a BookService that manages a collection of books with CRUD operations.

Requirements:
1. Use BehaviorSubject to manage state
2. Implement getBooks(), getBook(id), addBook(), updateBook(), deleteBook()
3. Persist data to localStorage
4. Return Observables from all public methods
5. Include proper TypeScript interfaces

The service should follow Angular best practices for state management.`,
          starterCode: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Implement the service here
}`,
          solution: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly STORAGE_KEY = 'books';
  private booksSubject = new BehaviorSubject<Book[]>(this.loadBooks());
  public books$ = this.booksSubject.asObservable();

  private loadBooks(): Book[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveBooks(books: Book[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    this.booksSubject.next(books);
  }

  getBooks(): Observable<Book[]> {
    return this.books$;
  }

  getBook(id: string): Observable<Book | undefined> {
    const books = this.booksSubject.value;
    const book = books.find(b => b.id === id);
    return new Observable(subscriber => {
      subscriber.next(book);
      subscriber.complete();
    });
  }

  addBook(book: Omit<Book, 'id'>): void {
    const books = this.booksSubject.value;
    const newBook: Book = {
      ...book,
      id: Date.now().toString()
    };
    this.saveBooks([...books, newBook]);
  }

  updateBook(id: string, updates: Partial<Book>): void {
    const books = this.booksSubject.value;
    const updatedBooks = books.map(book =>
      book.id === id ? { ...book, ...updates } : book
    );
    this.saveBooks(updatedBooks);
  }

  deleteBook(id: string): void {
    const books = this.booksSubject.value;
    const filteredBooks = books.filter(book => book.id !== id);
    this.saveBooks(filteredBooks);
  }
}`,
          testCases: [
            {
              input: 'addBook({ title: "Book", author: "Author", year: 2024 })',
              expectedOutput: 'Book added to collection and localStorage',
              description: 'Add book operation'
            },
            {
              input: 'updateBook(id, { title: "Updated" })',
              expectedOutput: 'Book title updated in collection',
              description: 'Update book operation'
            },
            {
              input: 'deleteBook(id)',
              expectedOutput: 'Book removed from collection',
              description: 'Delete book operation'
            }
          ],
          hints: [
            'Use BehaviorSubject to store and emit the current state',
            'Remember to update localStorage whenever data changes',
            'Return Observables for consistency',
            'Use the spread operator for immutability'
          ],
          guidelines: [
            'Keep methods simple and focused',
            'Use proper TypeScript types',
            'Handle edge cases',
            'Follow the single responsibility principle'
          ]
        }
      },
      {
        id: 'project-blog-platform',
        title: 'Build a Blog Platform',
        description: 'Create a multi-page blog application with routing, guards, and API integration.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 180,
        category: ExerciseCategory.ROUTING,
        type: ExerciseType.PROJECT_ASSIGNMENT,
        prerequisites: ['routing-basics', 'http-client', 'services-di'],
        projectAssignment: {
          id: 'pa2',
          brief: `Build a blog platform where users can view, create, and edit blog posts. Implement routing with guards and lazy loading.`,
          requirements: [
            'Create multiple routes: home, post list, post detail, create post, edit post',
            'Implement route guards for create/edit pages',
            'Add route resolvers to pre-fetch data',
            'Use route parameters for post detail page',
            'Implement lazy loading for admin module',
            'Add breadcrumb navigation',
            'Handle 404 not found page',
            'Integrate with JSONPlaceholder API for posts'
          ],
          userStories: [
            'As a visitor, I want to browse blog posts',
            'As a visitor, I want to read individual posts',
            'As an admin, I want to create new posts',
            'As an admin, I want to edit existing posts',
            'As a user, I want clear navigation between pages'
          ],
          technicalSpecs: [
            'Use Angular Router with feature modules',
            'Implement AuthGuard for protected routes',
            'Use Resolver for data pre-fetching',
            'Handle navigation events',
            'Implement proper error handling',
            'Use HttpClient for API calls'
          ],
          milestones: [
            {
              id: 'm1',
              title: 'Setup Routing',
              description: 'Configure routes and navigation',
              tasks: [
                'Define route structure',
                'Create route components',
                'Add RouterLink navigation',
                'Configure route parameters'
              ],
              estimatedTime: 45
            },
            {
              id: 'm2',
              title: 'API Integration',
              description: 'Connect to JSONPlaceholder API',
              tasks: [
                'Create PostService',
                'Implement HTTP methods',
                'Add error handling',
                'Display posts in components'
              ],
              estimatedTime: 45
            },
            {
              id: 'm3',
              title: 'Guards and Resolvers',
              description: 'Add route protection and data pre-fetching',
              tasks: [
                'Create AuthGuard',
                'Implement PostResolver',
                'Add guard to routes',
                'Test protection'
              ],
              estimatedTime: 45
            },
            {
              id: 'm4',
              title: 'Forms and Editing',
              description: 'Add create and edit functionality',
              tasks: [
                'Create post form component',
                'Implement create logic',
                'Implement edit logic',
                'Add form validation'
              ],
              estimatedTime: 45
            }
          ],
          resources: [
            {
              title: 'JSONPlaceholder API',
              url: 'https://jsonplaceholder.typicode.com/',
              type: 'tool'
            },
            {
              title: 'Angular Routing Guide',
              url: 'https://angular.dev/guide/routing',
              type: 'documentation'
            }
          ]
        }
      },
      // ADVANCED EXERCISES
      {
        id: 'quiz-advanced-patterns',
        title: 'Advanced Angular Patterns Quiz',
        description: 'Test your knowledge of advanced concepts including RxJS operators, change detection, and optimization.',
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 30,
        category: ExerciseCategory.PERFORMANCE,
        type: ExerciseType.QUIZ,
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q1',
              question: 'What is the purpose of the OnPush change detection strategy?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'To check for changes more frequently',
                'To reduce change detection cycles by only checking when inputs change',
                'To disable change detection completely',
                'To make components run faster'
              ],
              correctAnswer: 'To reduce change detection cycles by only checking when inputs change',
              explanation: 'OnPush change detection only runs when input references change, async pipe emits, or events occur, improving performance.'
            },
            {
              id: 'q2',
              question: 'Which RxJS operator would you use to cancel previous HTTP requests when a new one is made?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['mergeMap', 'concatMap', 'switchMap', 'exhaustMap'],
              correctAnswer: 'switchMap',
              explanation: 'switchMap cancels the previous inner observable when a new value arrives, perfect for search/autocomplete scenarios.'
            },
            {
              id: 'q3',
              question: 'What does trackBy function do in *ngFor?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Tracks user interactions',
                'Helps Angular identify which items changed to minimize DOM updates',
                'Tracks the iteration count',
                'Creates a backup of the array'
              ],
              correctAnswer: 'Helps Angular identify which items changed to minimize DOM updates',
              explanation: 'trackBy provides a unique identifier for each item, allowing Angular to reuse DOM elements instead of recreating them.'
            },
            {
              id: 'q4',
              question: 'Lazy loading modules can improve initial load time.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'Lazy loading loads feature modules on-demand rather than at startup, reducing the initial bundle size and improving load time.'
            },
            {
              id: 'q5',
              question: 'What is the benefit of using the async pipe in templates?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'It makes the code run asynchronously',
                'It automatically subscribes and unsubscribes from observables',
                'It speeds up the application',
                'It validates async operations'
              ],
              correctAnswer: 'It automatically subscribes and unsubscribes from observables',
              explanation: 'The async pipe handles subscription lifecycle automatically, preventing memory leaks and reducing boilerplate code.'
            }
          ]
        }
      },
      {
        id: 'challenge-state-management',
        title: 'Implement Custom State Management',
        description: 'Build a state management solution using RxJS and services.',
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 90,
        category: ExerciseCategory.STATE_MANAGEMENT,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc3',
          prompt: `Create a generic Store class that can manage application state with the following features:

Requirements:
1. Generic type support for different state shapes
2. Immutable state updates
3. Action-based state mutations
4. State selectors
5. DevTools support (console logging)
6. Time-travel debugging capability

Build a store that other services can extend for their specific needs.`,
          starterCode: `import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export abstract class Store<T> {
  // Implement the store here
}

// Example usage:
interface AppState {
  user: { name: string; loggedIn: boolean };
  cart: { items: any[]; total: number };
}

export class AppStore extends Store<AppState> {
  // Implement specific store
}`,
          solution: `import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export abstract class Store<T> {
  private state$: BehaviorSubject<T>;
  private history: T[] = [];
  private maxHistory = 50;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
    this.addToHistory(initialState);
  }

  /**
   * Get current state value
   */
  get state(): T {
    return this.state$.getValue();
  }

  /**
   * Get state as observable
   */
  get state(): Observable<T> {
    return this.state$.asObservable();
  }

  /**
   * Select a slice of state
   */
  select<K>(selector: (state: T) => K): Observable<K> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

  /**
   * Update state immutably
   */
  protected setState(newState: Partial<T>): void {
    const currentState = this.state;
    const updatedState = { ...currentState, ...newState };

    this.state$.next(updatedState);
    this.addToHistory(updatedState);
    this.logStateChange(currentState, updatedState);
  }

  /**
   * Update state using a function
   */
  protected updateState(updateFn: (state: T) => T): void {
    const currentState = this.state;
    const updatedState = updateFn(currentState);

    this.state$.next(updatedState);
    this.addToHistory(updatedState);
    this.logStateChange(currentState, updatedState);
  }

  /**
   * Add state to history for time-travel
   */
  private addToHistory(state: T): void {
    this.history.push(state);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  /**
   * Travel back in state history
   */
  timeTravel(stepsBack: number): void {
    const targetIndex = this.history.length - 1 - stepsBack;
    if (targetIndex >= 0 && targetIndex < this.history.length) {
      const previousState = this.history[targetIndex];
      this.state$.next(previousState);
      console.log(\`⏮️ Time traveled back \${stepsBack} steps\`);
    }
  }

  /**
   * Log state changes for debugging
   */
  private logStateChange(oldState: T, newState: T): void {
    if (typeof window !== 'undefined' && (window as any).devMode) {
      console.group('State Update');
      console.log('Previous:', oldState);
      console.log('Current:', newState);
      console.groupEnd();
    }
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    if (this.history.length > 0) {
      this.state$.next(this.history[0]);
    }
  }
}

// Example usage:
interface AppState {
  user: { name: string; loggedIn: boolean };
  cart: { items: any[]; total: number };
}

export class AppStore extends Store<AppState> {
  constructor() {
    super({
      user: { name: '', loggedIn: false },
      cart: { items: [], total: 0 }
    });
  }

  // Selectors
  selectUser(): Observable<{ name: string; loggedIn: boolean }> {
    return this.select(state => state.user);
  }

  selectCart(): Observable<{ items: any[]; total: number }> {
    return this.select(state => state.cart);
  }

  // Actions
  login(name: string): void {
    this.setState({
      user: { name, loggedIn: true }
    } as Partial<AppState>);
  }

  logout(): void {
    this.setState({
      user: { name: '', loggedIn: false }
    } as Partial<AppState>);
  }

  addToCart(item: any): void {
    this.updateState(state => ({
      ...state,
      cart: {
        items: [...state.cart.items, item],
        total: state.cart.total + item.price
      }
    }));
  }
}`,
          testCases: [
            {
              input: 'store.setState({ user: { name: "John", loggedIn: true } })',
              expectedOutput: 'State updated and history recorded',
              description: 'State update operation'
            },
            {
              input: 'store.select(state => state.user)',
              expectedOutput: 'Observable of user state slice',
              description: 'State selection'
            },
            {
              input: 'store.timeTravel(2)',
              expectedOutput: 'State restored to 2 steps back',
              description: 'Time travel debugging'
            }
          ],
          hints: [
            'Use generics to make the store reusable',
            'Maintain immutability with spread operators',
            'Use distinctUntilChanged to prevent unnecessary emissions',
            'Keep history in an array for time-travel'
          ],
          guidelines: [
            'Make state updates atomic',
            'Provide clear selector methods',
            'Add DevTools integration',
            'Document the API clearly'
          ]
        }
      },
      {
        id: 'project-realtime-dashboard',
        title: 'Build a Real-Time Analytics Dashboard',
        description: 'Create a dashboard with WebSockets, state management, and performance optimization.',
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 240,
        category: ExerciseCategory.STATE_MANAGEMENT,
        type: ExerciseType.PROJECT_ASSIGNMENT,
        prerequisites: ['services-di', 'http-client', 'routing-basics'],
        projectAssignment: {
          id: 'pa3',
          brief: `Build a real-time analytics dashboard that displays live data updates using WebSockets, implements advanced state management, and follows performance best practices.`,
          requirements: [
            'Implement WebSocket connection for real-time data',
            'Create custom state management solution',
            'Use OnPush change detection strategy',
            'Implement virtual scrolling for large data sets',
            'Add data visualization with charts',
            'Implement lazy loading for modules',
            'Add error handling and reconnection logic',
            'Optimize bundle size and performance'
          ],
          userStories: [
            'As a user, I want to see real-time data updates without refreshing',
            'As a user, I want to view different metrics on a dashboard',
            'As a user, I want the dashboard to load quickly',
            'As a user, I want smooth scrolling even with large datasets',
            'As an admin, I want to monitor system performance'
          ],
          technicalSpecs: [
            'Use RxJS for data streams',
            'Implement custom Store service',
            'Use ChangeDetectionStrategy.OnPush',
            'Implement CDK Virtual Scroll',
            'Use Chart.js or similar for visualizations',
            'Implement WebSocket reconnection strategy',
            'Use trackBy in *ngFor directives',
            'Lazy load feature modules'
          ],
          milestones: [
            {
              id: 'm1',
              title: 'Setup and Architecture',
              description: 'Set up project structure and core services',
              tasks: [
                'Create feature modules',
                'Set up routing with lazy loading',
                'Create WebSocket service',
                'Implement custom Store'
              ],
              estimatedTime: 60
            },
            {
              id: 'm2',
              title: 'Real-Time Data Integration',
              description: 'Connect to WebSocket and handle data streams',
              tasks: [
                'Implement WebSocket connection',
                'Handle incoming messages',
                'Add reconnection logic',
                'Parse and transform data'
              ],
              estimatedTime: 60
            },
            {
              id: 'm3',
              title: 'Dashboard Components',
              description: 'Build dashboard widgets and visualizations',
              tasks: [
                'Create chart components',
                'Implement data tables with virtual scroll',
                'Add metric cards',
                'Implement OnPush strategy'
              ],
              estimatedTime: 60
            },
            {
              id: 'm4',
              title: 'Optimization and Testing',
              description: 'Optimize performance and test',
              tasks: [
                'Analyze bundle size',
                'Implement code splitting',
                'Add trackBy functions',
                'Test performance with large datasets',
                'Add error boundaries'
              ],
              estimatedTime: 60
            }
          ],
          resources: [
            {
              title: 'Angular Performance Guide',
              url: 'https://angular.dev/guide/change-detection',
              type: 'documentation'
            },
            {
              title: 'RxJS WebSocket',
              url: 'https://rxjs.dev/api/webSocket/webSocket',
              type: 'documentation'
            },
            {
              title: 'Chart.js',
              url: 'https://www.chartjs.org/',
              type: 'tool'
            }
          ]
        }
      },
      // ADDITIONAL QUIZZES
      {
        id: 'quiz-forms',
        title: 'Angular Forms Mastery Quiz',
        description: 'Test your knowledge of template-driven and reactive forms in Angular.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        category: ExerciseCategory.FORMS,
        type: ExerciseType.QUIZ,
        prerequisites: ['data-binding'],
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              question: 'Which module is required for template-driven forms?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['FormsModule', 'ReactiveFormsModule', 'CommonModule', 'BrowserModule'],
              correctAnswer: 'FormsModule',
              explanation: 'FormsModule is required for template-driven forms. It provides directives like ngModel.'
            },
            {
              id: 'q2',
              question: 'Which class is used to build reactive forms?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['FormBuilder', 'FormCreator', 'FormMaker', 'FormGenerator'],
              correctAnswer: 'FormBuilder',
              explanation: 'FormBuilder is a service that provides convenient methods for creating FormGroup and FormControl instances.'
            },
            {
              id: 'q3',
              question: 'What is the correct syntax for two-way binding with ngModel?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['[ngModel]', '(ngModel)', '[(ngModel)]', '{{ngModel}}'],
              correctAnswer: '[(ngModel)]',
              explanation: 'Two-way binding uses [(ngModel)] which combines property binding [] and event binding ().'
            },
            {
              id: 'q4',
              question: 'Reactive forms are more scalable than template-driven forms.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'Reactive forms are more scalable, easier to test, and provide better control over form validation and state.'
            },
            {
              id: 'q5',
              question: 'Which validator checks if a field is required?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['Validators.required', 'Validators.mandatory', 'Validators.notEmpty', 'Validators.filled'],
              correctAnswer: 'Validators.required',
              explanation: 'Validators.required is the built-in validator that ensures a form control has a value.'
            }
          ]
        }
      },
      {
        id: 'quiz-routing',
        title: 'Angular Routing Deep Dive Quiz',
        description: 'Master Angular Router concepts including guards, resolvers, and lazy loading.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        category: ExerciseCategory.ROUTING,
        type: ExerciseType.QUIZ,
        prerequisites: ['routing-basics'],
        quiz: {
          passingScore: 75,
          questions: [
            {
              id: 'q1',
              question: 'Which guard prevents navigation to a route?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['CanActivate', 'CanDeactivate', 'CanLoad', 'Resolve'],
              correctAnswer: 'CanActivate',
              explanation: 'CanActivate guard determines if a route can be activated, typically used for authentication.'
            },
            {
              id: 'q2',
              question: 'What is the purpose of a Resolver?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'To pre-fetch data before navigating to a route',
                'To prevent navigation',
                'To handle errors',
                'To lazy load modules'
              ],
              correctAnswer: 'To pre-fetch data before navigating to a route',
              explanation: 'Resolvers pre-fetch data before the route is activated, ensuring data is available when the component loads.'
            },
            {
              id: 'q3',
              question: 'How do you pass parameters in a route?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Using :paramName in the path',
                'Using ?paramName in the path',
                'Using #paramName in the path',
                'Using &paramName in the path'
              ],
              correctAnswer: 'Using :paramName in the path',
              explanation: 'Route parameters are defined using colon notation like /user/:id in the route configuration.'
            },
            {
              id: 'q4',
              question: 'Lazy loading reduces the initial bundle size.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'Lazy loading loads feature modules on demand, reducing the initial bundle size and improving load time.'
            },
            {
              id: 'q5',
              question: 'Which directive displays the routed component?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['<router-outlet>', '<router-view>', '<route-display>', '<router-component>'],
              correctAnswer: '<router-outlet>',
              explanation: '<router-outlet> is the directive that acts as a placeholder for the routed component.'
            },
            {
              id: 'q6',
              question: 'What does CanDeactivate guard do?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Prevents leaving a route',
                'Prevents entering a route',
                'Loads data before navigation',
                'Handles route errors'
              ],
              correctAnswer: 'Prevents leaving a route',
              explanation: 'CanDeactivate guard prevents navigation away from a route, useful for warning about unsaved changes.'
            }
          ]
        }
      },
      {
        id: 'quiz-http',
        title: 'HTTP & API Integration Quiz',
        description: 'Test your understanding of HttpClient, interceptors, and error handling.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        category: ExerciseCategory.HTTP,
        type: ExerciseType.QUIZ,
        prerequisites: ['http-client'],
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              question: 'Which RxJS operator transforms HTTP response data?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['map', 'filter', 'reduce', 'scan'],
              correctAnswer: 'map',
              explanation: 'The map operator transforms emitted values, commonly used to transform HTTP response data.'
            },
            {
              id: 'q2',
              question: 'What is an HTTP interceptor used for?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'To intercept and modify HTTP requests/responses',
                'To create HTTP requests',
                'To cancel HTTP requests',
                'To cache HTTP responses'
              ],
              correctAnswer: 'To intercept and modify HTTP requests/responses',
              explanation: 'Interceptors intercept HTTP requests and responses, allowing you to add headers, handle errors, etc.'
            },
            {
              id: 'q3',
              question: 'Which operator handles HTTP errors?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: ['catchError', 'handleError', 'onError', 'errorHandler'],
              correctAnswer: 'catchError',
              explanation: 'catchError is the RxJS operator used to handle errors in observable streams, including HTTP errors.'
            },
            {
              id: 'q4',
              question: 'HttpClient methods return Observables.',
              type: QuestionType.TRUE_FALSE,
              options: ['True', 'False'],
              correctAnswer: 'True',
              explanation: 'All HttpClient methods return Observables, which are lazy and must be subscribed to.'
            },
            {
              id: 'q5',
              question: 'How do you add headers to an HTTP request?',
              type: QuestionType.MULTIPLE_CHOICE,
              options: [
                'Using HttpHeaders class',
                'Using headers array',
                'Using setHeader method',
                'Using addHeader function'
              ],
              correctAnswer: 'Using HttpHeaders class',
              explanation: 'HttpHeaders class is used to create and manage HTTP headers for requests.'
            }
          ]
        }
      },
      // ADDITIONAL CODING CHALLENGES
      {
        id: 'challenge-pipe-creation',
        title: 'Create Custom Pipes',
        description: 'Build custom pipes for data transformation in Angular templates.',
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 30,
        category: ExerciseCategory.COMPONENTS,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc-pipes',
          prompt: `Create two custom pipes:

1. TruncatePipe: Truncates text to a specified length and adds "..."
   Usage: {{ longText | truncate:10 }}

2. TimeAgoPipe: Converts a date to relative time (e.g., "2 hours ago")
   Usage: {{ date | timeAgo }}

Requirements:
- Implement the PipeTransform interface
- Handle edge cases (null, undefined)
- Make pipes pure for better performance
- Add proper TypeScript types`,
          starterCode: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    // Implement truncate logic
    return value;
  }
}

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    // Implement time ago logic
    return '';
  }
}`,
          solution: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return \`\${diffMins} minute\${diffMins === 1 ? '' : 's'} ago\`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return \`\${diffHours} hour\${diffHours === 1 ? '' : 's'} ago\`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return \`\${diffDays} day\${diffDays === 1 ? '' : 's'} ago\`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return \`\${diffMonths} month\${diffMonths === 1 ? '' : 's'} ago\`;

    const diffYears = Math.floor(diffMonths / 12);
    return \`\${diffYears} year\${diffYears === 1 ? '' : 's'} ago\`;
  }
}`,
          testCases: [
            {
              input: '"Hello World" | truncate:5',
              expectedOutput: '"Hello..."',
              description: 'Truncate text to 5 characters'
            },
            {
              input: 'new Date(Date.now() - 3600000) | timeAgo',
              expectedOutput: '"1 hour ago"',
              description: 'Show time ago for 1 hour'
            }
          ],
          hints: [
            'Use substring() method for truncating text',
            'Calculate time difference using Date.getTime()',
            'Handle edge cases with early returns',
            'Use conditional (ternary) operators for singular/plural'
          ],
          guidelines: [
            'Make pipes pure for performance',
            'Always check for null/undefined input',
            'Return meaningful default values',
            'Use clear variable names'
          ]
        }
      },
      {
        id: 'challenge-directive',
        title: 'Build a Highlight Directive',
        description: 'Create a custom attribute directive that highlights elements on hover.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 40,
        category: ExerciseCategory.COMPONENTS,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc-directive',
          prompt: `Create a custom directive that highlights elements when you hover over them.

Requirements:
1. Accept @Input for highlight color (default: yellow)
2. Change background color on mouseenter
3. Reset on mouseleave
4. Support custom colors via attribute binding
5. Use HostListener for event handling

Usage:
<p appHighlight>Hover me!</p>
<p [appHighlight]="'lightblue'">Hover me with custom color!</p>`,
          starterCode: `import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Add your implementation here
}`,
          solution: `import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight: string = 'yellow';
  private originalColor: string = '';

  constructor(private el: ElementRef) {
    this.originalColor = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}`,
          testCases: [
            {
              input: 'Hover over element',
              expectedOutput: 'Background changes to yellow',
              description: 'Default highlight color'
            },
            {
              input: 'Hover with [appHighlight]="lightblue"',
              expectedOutput: 'Background changes to lightblue',
              description: 'Custom highlight color'
            },
            {
              input: 'Mouse leave',
              expectedOutput: 'Background returns to original',
              description: 'Reset on mouse leave'
            }
          ],
          hints: [
            'Use ElementRef to access the native DOM element',
            'Use @HostListener to listen to events',
            'Store the original color in the constructor',
            'The @Input name should match the directive selector'
          ],
          guidelines: [
            'Always clean up event listeners',
            'Use descriptive method names',
            'Keep directive logic simple and focused',
            'Consider accessibility'
          ]
        }
      },
      {
        id: 'challenge-reactive-search',
        title: 'Build a Reactive Search Component',
        description: 'Create a search component with debouncing using RxJS operators.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 50,
        category: ExerciseCategory.HTTP,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc-search',
          prompt: `Build a search component that:

1. Accepts user input in a search box
2. Debounces input (wait 300ms after user stops typing)
3. Filters out empty searches
4. Searches an array of items
5. Displays results below the search box
6. Shows loading state while searching

Use RxJS operators: debounceTime, distinctUntilChanged, switchMap, filter

The component should be performant and not search on every keystroke.`,
          starterCode: `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="search-container">
      <input
        [formControl]="searchControl"
        placeholder="Search items..."
        type="text"
      />
      <div *ngIf="loading">Loading...</div>
      <ul>
        <li *ngFor="let item of results">{{ item.name }}</li>
      </ul>
    </div>
  \`
})
export class ReactiveSearchComponent implements OnInit {
  searchControl = new FormControl('');
  results: Item[] = [];
  loading = false;

  items: Item[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'Angular Material' },
  ];

  ngOnInit(): void {
    // Implement search logic here
  }

  searchItems(query: string): Observable<Item[]> {
    // Simulate API call
    return of(
      this.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}`,
          solution: `import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="search-container">
      <input
        [formControl]="searchControl"
        placeholder="Search items..."
        type="text"
      />
      <div *ngIf="loading">Loading...</div>
      <ul *ngIf="!loading">
        <li *ngFor="let item of results">{{ item.name }}</li>
      </ul>
      <p *ngIf="!loading && results.length === 0 && searchControl.value">
        No results found
      </p>
    </div>
  \`
})
export class ReactiveSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  results: Item[] = [];
  loading = false;
  private subscription?: Subscription;

  items: Item[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'Angular Material' },
  ];

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),                    // Wait 300ms after user stops typing
      distinctUntilChanged(),                // Only if value changed
      tap(() => this.loading = true),        // Show loading
      filter(query => query !== null && query.trim().length > 0),  // Filter empty
      switchMap(query => this.searchItems(query || ''))   // Cancel previous, search new
    ).subscribe({
      next: (results) => {
        this.results = results;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  searchItems(query: string): Observable<Item[]> {
    // Simulate API call with delay
    return of(
      this.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}`,
          testCases: [
            {
              input: 'Type "ang" in search box',
              expectedOutput: 'Shows "Angular" and "Angular Material" after 300ms',
              description: 'Debounced search'
            },
            {
              input: 'Type quickly without pausing',
              expectedOutput: 'Only searches after 300ms pause',
              description: 'Debouncing prevents excessive searches'
            },
            {
              input: 'Clear search box',
              expectedOutput: 'No search performed',
              description: 'Filter empty searches'
            }
          ],
          hints: [
            'Use valueChanges observable on the FormControl',
            'Chain operators with pipe()',
            'Remember to unsubscribe in ngOnDestroy',
            'Use tap() operator for side effects like setting loading state'
          ],
          guidelines: [
            'Always handle subscriptions properly',
            'Use switchMap to cancel previous requests',
            'Provide user feedback during loading',
            'Filter out empty or invalid inputs'
          ]
        }
      },
      {
        id: 'challenge-dynamic-form',
        title: 'Build a Dynamic Form Generator',
        description: 'Create a component that generates forms dynamically from a configuration object.',
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 75,
        category: ExerciseCategory.FORMS,
        type: ExerciseType.CODING_CHALLENGE,
        codingChallenge: {
          id: 'cc-dynamic-form',
          prompt: `Build a dynamic form component that generates form fields from configuration.

Requirements:
1. Accept a configuration array defining fields
2. Support field types: text, email, number, select, checkbox
3. Handle validation rules from config
4. Display validation errors
5. Emit form value on valid submission

Configuration format:
{
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  label: string;
  validators?: any[];
  options?: string[]; // for select
}

This is a common pattern for admin panels and config-driven UIs.`,
          starterCode: `import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  label: string;
  validators?: any[];
  options?: string[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- Generate form fields here -->
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  \`
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Build form dynamically
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}`,
          solution: `import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  label: string;
  validators?: any[];
  options?: string[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      <div *ngFor="let field of fields" class="form-field">
        <label [for]="field.name">{{ field.label }}</label>

        <!-- Text/Email/Number inputs -->
        <input
          *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'number'"
          [type]="field.type"
          [id]="field.name"
          [formControlName]="field.name"
          class="form-control"
        />

        <!-- Select dropdown -->
        <select
          *ngIf="field.type === 'select'"
          [id]="field.name"
          [formControlName]="field.name"
          class="form-control"
        >
          <option value="">Select...</option>
          <option *ngFor="let option of field.options" [value]="option">
            {{ option }}
          </option>
        </select>

        <!-- Checkbox -->
        <input
          *ngIf="field.type === 'checkbox'"
          type="checkbox"
          [id]="field.name"
          [formControlName]="field.name"
        />

        <!-- Validation errors -->
        <div
          *ngIf="form.get(field.name)?.invalid && form.get(field.name)?.touched"
          class="error"
        >
          <span *ngIf="form.get(field.name)?.hasError('required')">
            {{ field.label }} is required
          </span>
          <span *ngIf="form.get(field.name)?.hasError('email')">
            Please enter a valid email
          </span>
        </div>
      </div>

      <button type="submit" [disabled]="!form.valid" class="submit-btn">
        Submit
      </button>
    </form>
  \`,
  styles: [\`
    .dynamic-form {
      max-width: 500px;
    }
    .form-field {
      margin-bottom: 1rem;
    }
    .form-field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: red;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .submit-btn {
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  \`]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const group: any = {};

    this.fields.forEach(field => {
      const validators = field.validators || [];
      const initialValue = field.type === 'checkbox' ? false : '';
      group[field.name] = [initialValue, validators];
    });

    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}

// Example usage:
/*
const formConfig: FieldConfig[] = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    validators: [Validators.required]
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    validators: [Validators.required, Validators.email]
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    validators: [Validators.required]
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: ['USA', 'UK', 'Canada'],
    validators: [Validators.required]
  },
  {
    name: 'subscribe',
    type: 'checkbox',
    label: 'Subscribe to newsletter'
  }
];
*/`,
          testCases: [
            {
              input: 'Config with text field and required validator',
              expectedOutput: 'Shows required error when empty and touched',
              description: 'Field validation'
            },
            {
              input: 'Config with select field and options',
              expectedOutput: 'Renders dropdown with all options',
              description: 'Select field rendering'
            },
            {
              input: 'Submit valid form',
              expectedOutput: 'Emits formSubmit event with form values',
              description: 'Form submission'
            }
          ],
          hints: [
            'Use FormBuilder.group() to create the form',
            'Iterate over fields to build the control config',
            'Use *ngFor with *ngIf to render different field types',
            'Access form controls with form.get(fieldName)'
          ],
          guidelines: [
            'Keep the component reusable and generic',
            'Handle all field types consistently',
            'Provide clear validation messages',
            'Make the component type-safe'
          ]
        }
      }
    ];
  }

  getExercises(): Observable<CodeExercise[]> {
    return of(this.exercises);
  }

  getExercise(id: string): Observable<CodeExercise | undefined> {
    const exercise = this.exercises.find(e => e.id === id);
    return of(exercise);
  }

  getExercisesByDifficulty(difficulty: DifficultyLevel): Observable<CodeExercise[]> {
    return of(this.exercises.filter(e => e.difficulty === difficulty));
  }

  getExercisesByCategory(category: ExerciseCategory): Observable<CodeExercise[]> {
    return of(this.exercises.filter(e => e.category === category));
  }

  getExercisesByType(type: ExerciseType): Observable<CodeExercise[]> {
    return of(this.exercises.filter(e => e.type === type));
  }

  // Progress Management
  private loadProgress(): UserExerciseData {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse exercise progress', e);
      }
    }
    return {
      completedExercises: [],
      exerciseProgress: new Map(),
      totalScore: 0,
      totalTimeSpent: 0
    };
  }

  private saveProgress(data: UserExerciseData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.progressSubject.next(data);
  }

  getProgress(): Observable<UserExerciseData> {
    return this.progressSubject.asObservable();
  }

  submitQuizAnswers(exerciseId: string, answers: Map<string, any>): number {
    const exercise = this.exercises.find(e => e.id === exerciseId);
    if (!exercise || !exercise.quiz) return 0;

    let correct = 0;
    exercise.quiz.questions.forEach(q => {
      const userAnswer = answers.get(q.id);
      if (userAnswer === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / exercise.quiz.questions.length) * 100);
    this.updateExerciseProgress(exerciseId, score, true);
    return score;
  }

  updateExerciseProgress(exerciseId: string, score: number, completed: boolean): void {
    const data = this.progressSubject.value;

    if (completed && !data.completedExercises.includes(exerciseId)) {
      data.completedExercises.push(exerciseId);
    }

    data.totalScore += score;
    this.saveProgress(data);
  }

  isExerciseCompleted(exerciseId: string): boolean {
    return this.progressSubject.value.completedExercises.includes(exerciseId);
  }
}
