import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';
import { ProgressService } from '../../services/progress.service';
import { Tutorial, TutorialCategory, DifficultyLevel } from '../../models';

@Component({
  selector: 'app-tutorial-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  tutorials: Tutorial[] = [];
  filteredTutorials: Tutorial[] = [];
  categories = Object.values(TutorialCategory);
  difficulties = Object.values(DifficultyLevel);

  selectedCategory: string = 'all';
  selectedDifficulty: string = 'all';
  searchQuery: string = '';

  constructor(
    private tutorialService: TutorialService,
    public progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.loadTutorials();
  }

  loadTutorials(): void {
    this.tutorialService.getTutorials().subscribe({
      next: (tutorials) => {
        this.tutorials = tutorials;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load tutorials', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.tutorials];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.selectedCategory);
    }

    // Filter by difficulty
    if (this.selectedDifficulty !== 'all') {
      filtered = filtered.filter(t => t.difficulty === this.selectedDifficulty);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    this.filteredTutorials = filtered;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getDifficultyClass(difficulty: DifficultyLevel): string {
    switch (difficulty) {
      case DifficultyLevel.BEGINNER:
        return 'difficulty-beginner';
      case DifficultyLevel.INTERMEDIATE:
        return 'difficulty-intermediate';
      case DifficultyLevel.ADVANCED:
        return 'difficulty-advanced';
      default:
        return '';
    }
  }

  isTutorialCompleted(tutorialId: string): boolean {
    return this.progressService.isTutorialCompleted(tutorialId);
  }

  getTutorialProgress(tutorial: Tutorial): number {
    // For now, just return completed (100) or not (0)
    // Can be enhanced to track section-level progress
    return this.isTutorialCompleted(tutorial.id) ? 100 : 0;
  }
}
