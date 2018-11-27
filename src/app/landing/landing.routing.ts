import {Routes} from '@angular/router';
import {LandingComponent} from './landing.component';


export const LandingRoutes: Routes = [{
  path: '',
  component: LandingComponent,
  children: [
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule'
    },
    {
      path: 'about',
      loadChildren: './about/about.module#AboutModule'
    },
    {
      path: 'our-clients',
      loadChildren: './our-clients/our-clients.module#OurClientsModule'
    },
    {
      path: 'career',
      loadChildren: './carrer/carrer.module#CarrerModule'
    },
    {
      path: 'connect',
      loadChildren: './connect/connect.module#ConnectModule'
    },
    {
      path: 'feedback',
      loadChildren: './feedback/feedback.module#FeedbackModule'
    },
    {
      path: 'demo',
      loadChildren: './demo/demo.module#DemoModule'
    },
    {
      path: 'features',
      loadChildren: './features/features.module#FeaturesModule'
    },
     {
      path: 'technology',
      loadChildren: './technology/technology.module#TechnologyModule'
    }, 
    {
      path: 'terms',
      loadChildren: './terms/terms.module#TermsModule'
    },
    {
      path: 'privacy',
      loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'
    },
    {
      path: '',
      redirectTo: 'home'
    }
  ]
}];
