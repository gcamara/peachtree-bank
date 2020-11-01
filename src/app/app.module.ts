import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { FormFieldComponent } from './shared/form-field/form-field.component';
import { InputComponent } from './shared/input/input.component';
import { PanelComponent } from './shared/panel/panel.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transactions/transfer/transfer.component';
import { TransferPreviewComponent } from './shared/transfer-preview/transfer-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    MakeTransferComponent,
    TransactionsComponent,
    HeaderComponent,
    PanelComponent,
    InputComponent,
    FormFieldComponent,
    TransferComponent,
    TransferPreviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
