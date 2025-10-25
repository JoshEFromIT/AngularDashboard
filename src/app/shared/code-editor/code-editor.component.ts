import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule, NgxEditorModel } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit {
  @Input() starterCode: string = '';
  @Input() language: string = 'typescript';
  @Input() readOnly: boolean = false;
  @Input() showActions: boolean = true;
  @Input() height: string = '400px';

  @Output() codeChange = new EventEmitter<string>();
  @Output() codeSubmit = new EventEmitter<string>();
  @Output() codeRun = new EventEmitter<string>();

  editorOptions = {
    theme: 'vs-dark',
    language: this.language,
    automaticLayout: true,
    minimap: { enabled: true },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: this.readOnly,
    wordWrap: 'on'
  };

  code: string = '';

  ngOnInit(): void {
    this.code = this.starterCode || this.getDefaultCode();
    this.editorOptions = {
      ...this.editorOptions,
      language: this.language,
      readOnly: this.readOnly
    };
  }

  onCodeChange(code: string): void {
    this.code = code;
    this.codeChange.emit(code);
  }

  onRunCode(): void {
    this.codeRun.emit(this.code);
  }

  onSubmitCode(): void {
    this.codeSubmit.emit(this.code);
  }

  resetCode(): void {
    this.code = this.starterCode || this.getDefaultCode();
    this.codeChange.emit(this.code);
  }

  private getDefaultCode(): string {
    if (this.language === 'typescript') {
      return `// Write your TypeScript code here\n\n`;
    } else if (this.language === 'javascript') {
      return `// Write your JavaScript code here\n\n`;
    } else if (this.language === 'html') {
      return `<!-- Write your HTML code here -->\n\n`;
    } else if (this.language === 'css') {
      return `/* Write your CSS code here */\n\n`;
    }
    return '';
  }
}
