import { HttpClient, HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent{
  title = "allfilms-client";

  public listOfFilms;
  public searchName: string;
  public currPage: string;

  constructor(private http: HttpClient) {}

  public test(): void {
    let params = new HttpParams().set("name", this.searchName);
    this.http
      .get("http://localhost:4200/getFilmsByName", { params: params })
      .subscribe((res) => {
        this.listOfFilms = res;
      });
  }

  public test2(id: string): void {
    let params = new HttpParams().set("id", id);
    this.http
      .get("http://localhost:4200/getLinksById", { params: params })
      .subscribe((res) => {
        // this.listOfFilms = res
      });
  }
}
