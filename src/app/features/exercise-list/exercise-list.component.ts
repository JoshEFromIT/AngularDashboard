import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import {
  CodeExercise,
  ExerciseCategory,
  DifficultyLevel,
  ExerciseType
} from '../../models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: CodeExercise[] = [];
  filteredExercises: CodeExercise[] = [];

  categories = Object.values(ExerciseCategory);
  difficulties = Object.values(DifficultyLevel);
  types = Object.values(ExerciseType);

  selectedCategory: string = 'all';
  selectedDifficulty: string = 'all';
  selectedType: string = 'all';
  searchQuery: string = '';

  constructor(public exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load exercises', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.exercises];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === this.selectedCategory);
    }

    // Filter by difficulty
    if (this.selectedDifficulty !== 'all') {
      filtered = filtered.filter(e => e.difficulty === this.selectedDifficulty);
    }

    // Filter by type
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(e => e.type === this.selectedType);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        e =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query)
      );
    }

    this.filteredExercises = filtered;
  }

  onFilterChange(): void {
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

  getTypeIcon(type: ExerciseType): string {
    switch (type) {
      case ExerciseType.QUIZ:
        return '📝';
      case ExerciseType.CODING_CHALLENGE:
        return '💻';
      case ExerciseType.PROJECT_ASSIGNMENT:
        return '🚀';
      case ExerciseType.MIXED:
        return '🎯';
      default:
        return '📚';
    }
  }

  getTypeClass(type: ExerciseType): string {
    switch (type) {
      case ExerciseType.QUIZ:
        return 'type-quiz';
      case ExerciseType.CODING_CHALLENGE:
        return 'type-challenge';
      case ExerciseType.PROJECT_ASSIGNMENT:
        return 'type-project';
      case ExerciseType.MIXED:
        return 'type-mixed';
      default:
        return '';
    }
  }

  isExerciseCompleted(exerciseId: string): boolean {
    return this.exerciseService.isExerciseCompleted(exerciseId);
  }
}
