import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProgress } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'angular_learning_progress';
  private progressSubject: BehaviorSubject<UserProgress>;

  constructor() {
    const savedProgress = this.loadProgress();
    this.progressSubject = new BehaviorSubject<UserProgress>(savedProgress);
  }

  /**
   * Load progress from localStorage
   */
  private loadProgress(): UserProgress {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const progress = JSON.parse(stored);
        progress.lastAccessed = new Date(progress.lastAccessed);
        return progress;
      } catch (e) {
        console.error('Failed to parse stored progress', e);
      }
    }

    // Return default progress
    return {
      completedTutorials: [],
      totalTimeSpent: 0,
      lastAccessed: new Date()
    };
  }

  /**
   * Save progress to localStorage
   */
  private saveProgress(progress: UserProgress): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  /**
   * Get current progress as Observable
   */
  getProgress(): Observable<UserProgress> {
    return this.progressSubject.asObservable();
  }

  /**
   * Get current progress value
   */
  getCurrentProgress(): UserProgress {
    return this.progressSubject.value;
  }

  /**
   * Mark a tutorial as completed
   */
  completeTutorial(tutorialId: string): void {
    const progress = this.progressSubject.value;

    if (!progress.completedTutorials.includes(tutorialId)) {
      progress.completedTutorials.push(tutorialId);
      progress.lastAccessed = new Date();

      this.progressSubject.next(progress);
      this.saveProgress(progress);
    }
  }

  /**
   * Check if a tutorial is completed
   */
  isTutorialCompleted(tutorialId: string): boolean {
    return this.progressSubject.value.completedTutorials.includes(tutorialId);
  }

  /**
   * Set current tutorial being viewed
   */
  setCurrentTutorial(tutorialId: string, sectionId?: string): void {
    const progress = this.progressSubject.value;
    progress.currentTutorial = tutorialId;
    progress.currentSection = sectionId;
    progress.lastAccessed = new Date();

    this.progressSubject.next(progress);
    this.saveProgress(progress);
  }

  /**
   * Add time spent learning
   */
  addTimeSpent(minutes: number): void {
    const progress = this.progressSubject.value;
    progress.totalTimeSpent += minutes;
    progress.lastAccessed = new Date();

    this.progressSubject.next(progress);
    this.saveProgress(progress);
  }

  /**
   * Reset all progress
   */
  resetProgress(): void {
    const progress: UserProgress = {
      completedTutorials: [],
      totalTimeSpent: 0,
      lastAccessed: new Date()
    };

    this.progressSubject.next(progress);
    this.saveProgress(progress);
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage(totalTutorials: number): number {
    const completed = this.progressSubject.value.completedTutorials.length;
    if (totalTutorials === 0) return 0;
    return Math.round((completed / totalTutorials) * 100);
  }

  /**
   * Export progress as JSON
   */
  exportProgress(): string {
    return JSON.stringify(this.progressSubject.value, null, 2);
  }

  /**
   * Import progress from JSON
   */
  importProgress(jsonData: string): boolean {
    try {
      const progress: UserProgress = JSON.parse(jsonData);
      progress.lastAccessed = new Date(progress.lastAccessed);

      this.progressSubject.next(progress);
      this.saveProgress(progress);
      return true;
    } catch (e) {
      console.error('Failed to import progress', e);
      return false;
    }
  }
}
