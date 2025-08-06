import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { YoutubeEmbedPipe } from './pipes/youtube-embed.pipe';


@NgModule({
  declarations: [
    SafeUrlPipe,
        YoutubeEmbedPipe

  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    SafeUrlPipe, // 👈 Quan trọng: muốn dùng ở module khác phải export ra
    YoutubeEmbedPipe
  ]
})
export class SharedModule { }
