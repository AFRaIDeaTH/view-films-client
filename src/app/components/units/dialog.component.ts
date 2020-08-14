import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GetLinksByIdResponse, ContentDto } from "../../models/dto/films.dto";

@Component({
  selector: "dialog-window",
  templateUrl: "dialog.component.html",
})
export class DialogWindow {
  public isShowPlayer = false;
  public isMovie = true;
  public fileFound = true;

  form: FormGroup;
  translates: [ContentDto];

  constructor(@Inject(MAT_DIALOG_DATA) public data: GetLinksByIdResponse) {
    if (data.err) {
      this.fileFound = false;
    } else {
      this.translates = data.content;
      if (data.type !== "movie") {
        this.isMovie = false;
      }

      if (this.isMovie) {
        this.form = new FormGroup({
          translateControl: new FormControl(0),
          qualityControl: new FormControl(this.translates[0].media.quality[0]),
        });
      } else {
        this.form = new FormGroup({
          translateControl: new FormControl(0),
          qualityControl: new FormControl(this.translates[0].quality[0]),
          seasonControl: new FormControl(0),
          episodeControl: new FormControl(0),
        });
      }
    }
  }
}
