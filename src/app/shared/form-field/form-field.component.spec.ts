import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { FormFieldComponent } from './form-field.component';


@Component({
  selector: 'app-test-form-field',
  template: `<app-form-field [control]="control" [placeholder]="placeholder" [prefix]="prefixA" [label]="label"></app-form-field>`,
  styleUrls: ['./form-field.component.css']
})
export class TestFormFieldComponent implements AfterViewInit {
  control = new FormControl();
  placeholder = 'Dummy placeholder';
  prefixA = '';
  label = 'Dummy Label';

  @ViewChild(FormFieldComponent)
  testComponent: FormFieldComponent;

  ngAfterViewInit(): void {
  }
}

describe('FormFieldComponent', () => {
  let component: TestFormFieldComponent;
  let fixture: ComponentFixture<TestFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormFieldComponent, FormFieldComponent, InputComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngAfterViewInit();

    expect(component.testComponent.placeholder).toEqual('Dummy placeholder');
    expect(component.testComponent.label).toEqual('Dummy Label');
    expect(component.testComponent.prefix).toEqual('');
  });
});
