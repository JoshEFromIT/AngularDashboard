import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TutorialService } from '../../services/tutorial.service';
import { ProgressService } from '../../services/progress.service';
import { Tutorial, TutorialSection } from '../../models';

@Component({
  selector: 'app-tutorial-viewer',
  imports: [CommonModule, RouterLink],
  templateUrl: './tutorial-viewer.component.html',
  styleUrls: ['./tutorial-viewer.component.css']
})
export class TutorialViewerComponent implements OnInit, OnDestroy {
  tutorial?: Tutorial;
  currentSection?: TutorialSection;
  currentSectionIndex: number = 0;
  loading: boolean = true;
  error: string = '';

  private routeSub?: Subscription;
  private startTime: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tutorialService: TutorialService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const tutorialId = params['id'];
      if (tutorialId) {
        this.loadTutorial(tutorialId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    this.trackTimeSpent();
  }

  loadTutorial(id: string): void {
    this.loading = true;
    this.tutorialService.getTutorial(id).subscribe({
      next: (tutorial) => {
        if (tutorial) {
          this.tutorial = tutorial;
          this.tutorial.sections.sort((a, b) => a.order - b.order);
          this.currentSectionIndex = 0;
          this.currentSection = this.tutorial.sections[0];
          this.progressService.setCurrentTutorial(id, this.currentSection?.id);
          this.loading = false;
        } else {
          this.error = 'Tutorial not found';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load tutorial';
        this.loading = false;
        console.error(err);
      }
    });
  }

  goToSection(index: number): void {
    if (this.tutorial && index >= 0 && index < this.tutorial.sections.length) {
      this.currentSectionIndex = index;
      this.currentSection = this.tutorial.sections[index];
      this.progressService.setCurrentTutorial(
        this.tutorial.id,
        this.currentSection.id
      );
      this.scrollToTop();
    }
  }

  nextSection(): void {
    if (this.tutorial && this.currentSectionIndex < this.tutorial.sections.length - 1) {
      this.goToSection(this.currentSectionIndex + 1);
    }
  }

  previousSection(): void {
    if (this.currentSectionIndex > 0) {
      this.goToSection(this.currentSectionIndex - 1);
    }
  }

  hasNextSection(): boolean {
    return (
      !!this.tutorial &&
      this.currentSectionIndex < this.tutorial.sections.length - 1
    );
  }

  hasPreviousSection(): boolean {
    return this.currentSectionIndex > 0;
  }

  completeTutorial(): void {
    if (this.tutorial) {
      this.progressService.completeTutorial(this.tutorial.id);
      this.trackTimeSpent();
      alert('Congratulations! You have completed this tutorial!');
      this.router.navigate(['/tutorials']);
    }
  }

  private trackTimeSpent(): void {
    const endTime = new Date();
    const timeSpent = Math.round(
      (endTime.getTime() - this.startTime.getTime()) / 60000
    );
    if (timeSpent > 0) {
      this.progressService.addTimeSpent(timeSpent);
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      // Could show a toast notification here
      console.log('Code copied to clipboard');
    });
  }

  getSectionProgress(): number {
    if (!this.tutorial) return 0;
    return Math.round(
      ((this.currentSectionIndex + 1) / this.tutorial.sections.length) * 100
    );
  }

  formatContent(content: string): string {
    // Simple formatting: convert newlines to <br> and preserve spacing
    return content.replace(/\n/g, '<br>');
  }
}
