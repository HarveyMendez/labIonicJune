import { Component } from '@angular/core';

import { Haptics, ImpactStyle } from '@capacitor/haptics'; //vibracion
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  flashlightOn: boolean = false;

  filePath!: string; 
  audio!: MediaObject; 
  recording: boolean = false;

  isConnected: boolean = false;

  constructor(private flashlight: Flashlight, private media: Media, private file: File, private platform: Platform) {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory + 'audio.mp3';
      } else {
        this.filePath = this.file.documentsDirectory + 'audio.mp3';
      }
    });
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }


  toggleFlashlight() {
    if (this.flashlightOn) {
      this.flashlight.switchOff();
    } else {
      this.flashlight.switchOn();
    }
    this.flashlightOn = !this.flashlightOn;
  }

  startRecord() {
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;
  }

  playAudio() {
    this.audio = this.media.create(this.filePath);
    this.audio.play();
  }


  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;
  }

}