import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'code-editor' },
  { path: 'code-editor', loadChildren: () => import('./code-editor/code-editor.module').then(m => m.CodeEditorModule) },
  { path: 'console', loadChildren: () => import('./console/console.module').then(m => m.ConsoleModule) },
  { path: 'graphs', loadChildren: () => import('./graphs/graphs.module').then(m => m.GraphsModule) },
  { path: 'errors', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
