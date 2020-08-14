import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogWindow } from "../units/dialog.component";
import { NgForm } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import {
  GetFilmsByNameRequest,
  GetFilmsByNameResponse,
} from "src/app/models/dto/films.dto";
import {
  first,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";
import {
  GetLinksByIdRequest,
  GetLinksByIdResponse,
} from "../../models/dto/films.dto";
import { Subject, SubscriptionLike } from "rxjs";

@Component({
  selector: "main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  subscription: SubscriptionLike;
  inputSubject = new Subject();
  searchName: string;
  filmsList = null;

  ngOnInit(): void {
    //subscription on search tips on keyUp event
    this.subscription = this.inputSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchName: string) => {
          const body = new GetFilmsByNameRequest(searchName);
          return this.api.getFilmsByName(body).pipe(first());
        })
      )
      .subscribe(
        (res) => {
          this.filmsList = res.filter((listItem) => {
            //Get rid of persons in search tips
            return listItem.link.split("/")[1] !== "name";
          });
        },
        (err) => {
          /* here error handler */
        }
      );
  }

  public onSubmit(): void {
    const body = new GetFilmsByNameRequest(this.searchName);
    this.api
      .getFilmsByName(body)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          this.filmsList = res.filter((listItem) => {
            return listItem.link.split("/")[1] !== "name";
          });
        },
        (err) => {
          /* here error handler */
        }
      );
  }

  openDialog(filmId: string) {
    this.api
      .getLinksById(new GetLinksByIdRequest(filmId))
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          let dialogRef = this.dialog.open(DialogWindow, {
            data: res,
          });
        },
        (err) => {
          /* here error handler */
        }
      );
  }

  getSearchTips(evt: any): void {
    //Emit a value of input on KeyUp event
    this.inputSubject.next(evt.target.value);
  }

  unsubscribeIfNeeded(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeIfNeeded();
  }
}
