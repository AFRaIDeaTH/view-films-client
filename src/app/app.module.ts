import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainPageComponent } from "./components/pages/main-page.component";
import { DialogWindow } from "./components/units/dialog.component";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "./services/api.service";

@NgModule({
  declarations: [AppComponent, MainPageComponent, DialogWindow],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    ApiService,
  ],
  entryComponents: [DialogWindow],
  bootstrap: [AppComponent],
})
export class AppModule {}
