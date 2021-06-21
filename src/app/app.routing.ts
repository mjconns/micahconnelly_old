import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { BattlemetricsComponent } from './examples/battlemetrics/battlemetrics/battlemetrics.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SkillsComponent } from './skills/skills.component';
import { GithubComponent } from './examples/github/github.component'
import { MapExampleComponent } from './examples/map-example/map-example.component';
import { AmChartsComponent } from './examples/amCharts/amCharts.component';
import { PhotographyComponent } from './examples/photography/photography.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, },
  { path: 'main', component: MainComponent, },
  { path: 'skills', component: SkillsComponent, },
  { path: 'experience', component: ExperienceComponent, },
  { path: 'examples', component: ExamplesComponent, },
  { path: 'contact', component: ContactComponent, },
  { path: 'battlemetrics', component: BattlemetricsComponent, },
  { path: 'github', component: GithubComponent, },
  { path: 'googlemaps', component: MapExampleComponent, },
  { path: 'amcharts', component: AmChartsComponent, },
  { path: 'photography', component: PhotographyComponent, },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});
