import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

export type ProjectInfo = {
  image: string;
  title: string;
  desc: string;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  allProjects: ProjectInfo[] = [];
  projectForm: FormGroup;
  @ViewChild('addProjectDialog') addProjectDialog!: TemplateRef<any>;
  noProjectSelected: boolean = true;

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.allProjects = this.data.getAllProjects();
    this.projectForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.data.selectedProject$.subscribe((selectedProject) => {
      if (selectedProject) {
        this.noProjectSelected = false;
      } else {
        this.noProjectSelected = true;
      }
    });

    this.allProjects = this.data.getAllProjects();
  }
  trackByTitle(index: number, project: any): string {
    return project.title;
  }

  openAddProjectDialog(): void {
    this.dialog.open(this.addProjectDialog);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.allProjects.push(this.projectForm.value);
      this.closeDialog();
      this.projectForm.reset();
    }
  }
  onProjectClick(projectTitle: string) {
    this.data.setSelectedProject(projectTitle);
    this.router.navigate(['/projects/home']);
  }
}
