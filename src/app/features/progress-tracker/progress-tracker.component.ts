import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { TutorialService } from '../../services/tutorial.service';
import { UserProgress, Tutorial } from '../../models';

@Component({
  selector: 'app-progress-tracker',
  imports: [CommonModule, RouterLink],
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  progress!: UserProgress;
  allTutorials: Tutorial[] = [];
  completedTutorials: Tutorial[] = [];
  inProgressTutorial?: Tutorial;

  constructor(
    private progressService: ProgressService,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load progress
    this.progressService.getProgress().subscribe(progress => {
      this.progress = progress;
      this.loadTutorials();
    });
  }

  loadTutorials(): void {
    this.tutorialService.getTutorials().subscribe(tutorials => {
      this.allTutorials = tutorials;

      // Filter completed tutorials
      this.completedTutorials = tutorials.filter(t =>
        this.progress.completedTutorials.includes(t.id)
      );

      // Find current tutorial
      if (this.progress.currentTutorial) {
        this.inProgressTutorial = tutorials.find(
          t => t.id === this.progress.currentTutorial
        );
      }
    });
  }

  getCompletionPercentage(): number {
    return this.progressService.getCompletionPercentage(this.allTutorials.length);
  }

  getTotalEstimatedTime(): number {
    return this.allTutorials.reduce((sum, t) => sum + t.estimatedTime, 0);
  }

  getCompletedTime(): number {
    return this.completedTutorials.reduce((sum, t) => sum + t.estimatedTime, 0);
  }

  formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }

  resetProgress(): void {
    if (
      confirm(
        'Are you sure you want to reset all your progress? This action cannot be undone.'
      )
    ) {
      this.progressService.resetProgress();
      this.loadData();
    }
  }

  exportProgress(): void {
    const data = this.progressService.exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `angular-learning-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  importProgress(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const success = this.progressService.importProgress(event.target.result);
          if (success) {
            alert('Progress imported successfully!');
            this.loadData();
          } else {
            alert('Failed to import progress. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  getLastAccessedText(): string {
    if (!this.progress?.lastAccessed) return 'Never';

    const now = new Date();
    const lastAccessed = new Date(this.progress.lastAccessed);
    const diffMs = now.getTime() - lastAccessed.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return lastAccessed.toLocaleDateString();
  }
}
