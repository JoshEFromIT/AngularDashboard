import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import {
  CodeExercise,
  QuizQuestion,
  ExerciseType,
  Milestone
} from '../../models/exercise.model';

@Component({
  selector: 'app-exercise-viewer',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './exercise-viewer.component.html',
  styleUrls: ['./exercise-viewer.component.css']
})
export class ExerciseViewerComponent implements OnInit, OnDestroy {
  exercise?: CodeExercise;
  loading: boolean = true;
  error: string = '';

  // Quiz state
  quizAnswers: Map<string, any> = new Map();
  quizSubmitted: boolean = false;
  quizScore: number = 0;
  showExplanations: boolean = false;

  // Coding challenge state
  userCode: string = '';
  showSolution: boolean = false;
  showHints: boolean = false;

  // Project state
  completedMilestones: Set<string> = new Set();

  private routeSub?: Subscription;
  private startTime: Date = new Date();

  // Expose enum for template
  ExerciseType = ExerciseType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const exerciseId = params['id'];
      if (exerciseId) {
        this.loadExercise(exerciseId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadExercise(id: string): void {
    this.loading = true;
    this.exerciseService.getExercise(id).subscribe({
      next: (exercise) => {
        if (exercise) {
          this.exercise = exercise;
          if (exercise.codingChallenge) {
            this.userCode = exercise.codingChallenge.starterCode;
          }
          this.loading = false;
        } else {
          this.error = 'Exercise not found';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load exercise';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Quiz methods
  selectAnswer(questionId: string, answer: any): void {
    this.quizAnswers.set(questionId, answer);
  }

  isAnswerSelected(questionId: string, answer: any): boolean {
    return this.quizAnswers.get(questionId) === answer;
  }

  submitQuiz(): void {
    if (!this.exercise || !this.exercise.quiz) return;

    this.quizScore = this.exerciseService.submitQuizAnswers(
      this.exercise.id,
      this.quizAnswers
    );
    this.quizSubmitted = true;
    this.showExplanations = true;

    const passed = this.quizScore >= this.exercise.quiz.passingScore;
    if (passed) {
      alert(`Congratulations! You passed with ${this.quizScore}%`);
    } else {
      alert(
        `You scored ${this.quizScore}%. Passing score is ${this.exercise.quiz.passingScore}%. Try again!`
      );
    }
  }

  resetQuiz(): void {
    this.quizAnswers.clear();
    this.quizSubmitted = false;
    this.quizScore = 0;
    this.showExplanations = false;
  }

  isAnswerCorrect(question: QuizQuestion, answer: any): boolean {
    return question.correctAnswer === answer;
  }

  getQuestionResult(question: QuizQuestion): string {
    const userAnswer = this.quizAnswers.get(question.id);
    if (userAnswer === question.correctAnswer) {
      return 'correct';
    }
    return 'incorrect';
  }

  // Coding challenge methods
  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    });
  }

  toggleSolution(): void {
    this.showSolution = !this.showSolution;
  }

  toggleHints(): void {
    this.showHints = !this.showHints;
  }

  submitCode(): void {
    if (!this.exercise) return;

    // In a real application, you would run tests here
    alert(
      'Code submitted! In a production version, this would run automated tests.'
    );
    this.exerciseService.updateExerciseProgress(this.exercise.id, 100, true);
  }

  // Project methods
  toggleMilestone(milestoneId: string): void {
    if (this.completedMilestones.has(milestoneId)) {
      this.completedMilestones.delete(milestoneId);
    } else {
      this.completedMilestones.add(milestoneId);
    }
  }

  isMilestoneCompleted(milestoneId: string): boolean {
    return this.completedMilestones.has(milestoneId);
  }

  getMilestoneProgress(): number {
    if (!this.exercise?.projectAssignment) return 0;
    const total = this.exercise.projectAssignment.milestones.length;
    const completed = this.completedMilestones.size;
    return Math.round((completed / total) * 100);
  }

  completeProject(): void {
    if (!this.exercise) return;

    const progress = this.getMilestoneProgress();
    if (progress === 100) {
      this.exerciseService.updateExerciseProgress(this.exercise.id, 100, true);
      alert('Congratulations! You have completed this project!');
      this.router.navigate(['/exercises']);
    } else {
      alert('Please complete all milestones before finishing the project.');
    }
  }

  // Knowledge check methods
  toggleKnowledgeCheck(index: number): void {
    const element = document.getElementById(`kc-${index}`);
    if (element) {
      element.classList.toggle('expanded');
    }
  }
}
