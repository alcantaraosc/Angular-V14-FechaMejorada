import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';


@NgModule({
  declarations: [  
   
  ],
  imports: [
    CommonModule, 
  ],

  entryComponents: [],

  exports:[DragDropModule,
    ClipboardModule, CdkStepperModule, CdkTableModule, CdkTreeModule,  ScrollingModule,
    ]  ,

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SecurityModule { }
