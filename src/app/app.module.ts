import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PlayUIComponent } from './play/components/play-ui/play-ui.component';
import { TTTFieldComponent } from './play/components/tttfield/tttfield.component';
import { OverviewComponent } from './overview/components/overview/overview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestComponent } from './test/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogVictoryComponent } from './play/components/dialog-victory/dialog-victory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PlayUIComponent,
    TTTFieldComponent,
    OverviewComponent,
    TestComponent,
    DialogVictoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
