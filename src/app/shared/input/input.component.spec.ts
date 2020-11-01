import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';


@Component({
  selector: 'app-test-input',
  template: `<app-input [control]="control" [prefix]="prefix"></app-input>`,
  styleUrls: ['./input.component.css']
})
export class TestInputComponent implements AfterViewInit {
  control = new FormControl('abc');
  prefix = 'Dummy Prefix';

  @ViewChild(InputComponent)
  testInput: InputComponent;

  ngAfterViewInit(): void { }
}


describe('InputComponent', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, TestInputComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngAfterViewInit();

    expect(component.testInput.prefix).toEqual('Dummy Prefix');
  });

  it('should clearInputField()', () => {
    expect(component).toBeTruthy();
    component.ngAfterViewInit();

    component.testInput.clearInputField();
    expect(component.control.value).toEqual('');
  });
});
