# Angular Learning Tool

An interactive Angular front-end training application that helps you learn Angular web development with live tutorial content from the internet.

## Features

- Interactive tutorials covering Angular concepts from beginner to advanced
- Live code examples and demonstrations
- Hands-on coding exercises with instant feedback
- Progress tracking to monitor your learning journey
- Real-time tutorial content fetched from online resources
- Modern, responsive UI for learning on any device

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

1. **Basics**: Components, Templates, Data Binding
2. **Advanced**: Services, Dependency Injection, RxJS
3. **Routing**: Navigation, Guards, Lazy Loading
4. **Forms**: Template-driven and Reactive Forms
5. **HTTP**: API calls, Interceptors, Error Handling
6. **State Management**: Signals, Services, State Patterns

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
