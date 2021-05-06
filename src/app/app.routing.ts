import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SkillsComponent } from './skills/skills.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, },
  { path: 'main', component: MainComponent, },
  { path: 'skills', component: SkillsComponent, },
  { path: 'experience', component: ExperienceComponent, },
  { path: 'examples', component: ExamplesComponent, },
  { path: 'contact', component: ContactComponent, },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});
