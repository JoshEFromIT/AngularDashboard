# Angular Learning Tool

An interactive Angular front-end training application that helps you learn Angular web development with live tutorial content from the internet.

## Features

- **10+ Comprehensive Tutorials** covering Angular concepts from beginner to advanced
- **3 Real-World Projects** (Todo App, Weather Dashboard, E-Commerce)
- **UI Design Tutorials** (Angular Material, CSS Grid/Flexbox, Animations)
- **Live Code Examples** with syntax highlighting and copy-to-clipboard
- **Hands-on Exercises** with solutions and hints
- **Progress Tracking** to monitor your learning journey with localStorage persistence
- **Filtering & Search** to find tutorials by category, difficulty, and keywords
- **Modern, Responsive UI** for learning on any device

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Build

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `/src/app/components` - Reusable UI components
- `/src/app/features` - Feature modules (tutorials, exercises, progress tracking)
- `/src/app/services` - Services for fetching tutorial content and managing state
- `/src/app/models` - TypeScript interfaces and models

## Technology Stack

- Angular 20+ (generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7)
- TypeScript
- RxJS for reactive programming
- Angular Router for navigation
- HttpClient for fetching tutorial content from APIs

## Learning Path

The tool covers the following Angular topics:

### Core Concepts
1. **Basics**: Components, Templates, Data Binding
2. **Services**: Dependency Injection, Service Architecture
3. **Routing**: Navigation, Guards, Lazy Loading
4. **HTTP**: API calls, Interceptors, Error Handling
5. **State Management**: Signals, Services, State Patterns

### UI Design & Styling
6. **Angular Material**: Component library, themes, form controls
7. **Responsive Design**: CSS Grid, Flexbox, mobile-first approach
8. **Animations**: Angular animation system, transitions, complex effects

### Hands-On Projects

#### Beginner Projects
- **Todo List Application** (120 min)
  - CRUD operations, filtering, localStorage
  - Practice: Component communication, forms, event handling

#### Intermediate Projects
- **Weather Dashboard** (150 min)
  - Real-time API integration, geolocation
  - Practice: HTTP requests, RxJS operators, error handling

#### Advanced Projects
- **E-Commerce Product Catalog** (240 min)
  - Shopping cart, filters, checkout process
  - Practice: State management, routing, guards, custom pipes

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
