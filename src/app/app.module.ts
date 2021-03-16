import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { CardGameComponent } from './card-game/card-game.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddFormComponent } from './add-form/add-form.component';
import { OptionsPopUpComponent } from './options-pop-up/options-pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ExercisesComponent,
    FilterFormComponent,
    ExerciseComponent,
    CardGameComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    AddFormComponent,
    OptionsPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
