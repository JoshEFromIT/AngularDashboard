import { Routes } from '@angular/router';
import { TutorialListComponent } from './features/tutorial-list/tutorial-list.component';
import { TutorialViewerComponent } from './features/tutorial-viewer/tutorial-viewer.component';
import { ProgressTrackerComponent } from './features/progress-tracker/progress-tracker.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialListComponent },
  { path: 'tutorial/:id', component: TutorialViewerComponent },
  { path: 'progress', component: ProgressTrackerComponent },
  { path: '**', redirectTo: '/tutorials' }
];
