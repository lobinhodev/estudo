import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../../../core/model/course';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    _id: new FormControl<Course['_id']>(''),
    name: new FormControl<Course['name']>('', Validators.required),
    category: new FormControl<Course['category']>('', Validators.required),
  });
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    // this.form = this.formBuilder.group({
    //   name: new FormControl<Course['name']>('', Validators.required),
    //   category: new FormControl<Course['category']>('', Validators.required),
    // });
  }

  ngOnInit(): void {
    const COURSE: Course = this._route.snapshot.data['course'];
    this.form.setValue({
      _id:COURSE._id,
      name:COURSE.name,
      category:COURSE.category,
    })
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit = () => {
    this.isLoading = true;

    if (this.form.valid) {
      this.coursesService.save(this.form.value).subscribe(
        (data) => {
          setTimeout(this.onSuccess, 2000);
          console.log(data);
        },
        (error) => {
          setTimeout(this.onError, 2000);
          console.log(error);
        }
      );
    }
  };

  private onLoading = () => {
    this.isLoading = true;
    // this._router.navigate(['/courses']);
    this._location.back();
  };

  private onError = () => {
    this.isLoading = false;
    this._snackbar.open('Erro ao salvar curso', 'Fechar', {
      horizontalPosition: 'left',
      duration: 2000,
    });
  };

  private onSuccess = () => {
    this.isLoading = true;
    this._snackbar.open('Curso salvo com sucesso', 'Fechar', {
      horizontalPosition: 'left',
      duration: 4000,
    });
    this.onCancel();
  };

  onCancel = () => {
    this._location.back();
  };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
