import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MBI App';
  generatedMBI = 'XXXX-XXX-XXXX';
  inputData;
  formError = false;
  isValid;

  public constructor(private titleService: Title,
                     private appService: AppService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }


  // function to generate random mbi
  getRandomMbi() {
    this.appService.getRandomMbi()
      .then(() => this.generatedMBI = this.formatMbi(this.appService.generatedMbi));
  }

  // function to format MBI value
  formatMbi(mbi: string) {
    return mbi.substring(0, 4) + '-' + mbi.substring(4, 7) + '-' + mbi.substring(7, mbi.length + 1);
  }

  // function to validate passed in MBI
  validateMbi(mbiInput: string) {

    if (mbiInput === undefined || mbiInput.length === 0) {
      this.formError = true;
      return;
    } else {
      this.formError = false;
    }

    // remove dashes from input
    mbiInput = mbiInput.replace(/-/g, '');

    console.log(mbiInput);
    this.appService.validateMbi(mbiInput)
      .then(() => this.isValid = this.appService.isValid);
  }


}
