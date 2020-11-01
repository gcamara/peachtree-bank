import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransferPreviewComponent } from './transfer-preview.component';


@Component({
  selector: 'app-test-transfer-preview',
  template: `<app-transfer-preview [show]="true" [toAccount]="toAccount" [amount]="amount"></app-transfer-preview>`,
  styleUrls: ['./transfer-preview.component.css']
})
export class TestTransferPreviewComponent implements AfterViewInit {

  toAccount = 'Dummy Account';
  amount = '1500';

  @ViewChild(TransferPreviewComponent)
  testComponent: TransferPreviewComponent;

  ngAfterViewInit(): void { }
}

describe('TransferPreviewComponent', () => {
  let component: TestTransferPreviewComponent;
  let fixture: ComponentFixture<TestTransferPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferPreviewComponent, TestTransferPreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTransferPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have show class', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component.testComponent.show).toBeTrue();
    expect(fixture.debugElement.children[0].nativeNode.classList.value).toEqual('show');
  });

  it('should onConfirm()', fakeAsync(() => {
    spyOn(component.testComponent.submitHandler, 'emit');
    spyOn(component.testComponent.cancelHandler, 'emit');

    component.testComponent.onConfirm();
    expect(component.testComponent.confirmed).toBe(true, 'on user confirm');

    tick(500);

    expect(component.testComponent.submitHandler.emit).toHaveBeenCalled();
    expect(component.testComponent.cancelHandler.emit).toHaveBeenCalled();
    expect(component.testComponent.confirmed).toBe(false, 'on event finished');
  }));

  it('should onCancel()', () => {
    spyOn(component.testComponent.cancelHandler, 'emit');
    component.testComponent.confirmed = true;
    component.testComponent.onCancel();

    expect(component.testComponent.confirmed).toBeFalse();
    expect(component.testComponent.cancelHandler.emit).toHaveBeenCalled();
  });
});
