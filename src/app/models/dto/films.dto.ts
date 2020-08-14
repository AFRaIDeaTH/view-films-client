import { JsonProperty, JsonObject } from "json2typescript";

@JsonObject("Media")
export class MediaDto {
  @JsonProperty("quality", [String])
  quality = [];

  @JsonProperty("file")
  file = "";
}

@JsonObject("Content")
export class ContentDto {
  @JsonProperty("translation")
  translation = "";

  @JsonProperty("media", [MediaDto])
  media = null;

  @JsonProperty("quality", [String])
  quality = [];
}

@JsonObject("GetFilmsByNameRequest")
export class GetFilmsByNameRequest {
  @JsonProperty("name")
  name = "";

  constructor(name: string) {
    this.name = name;
  }
}

@JsonObject("GetLinksByIdRequest")
export class GetLinksByIdRequest {
  @JsonProperty("id")
  id = "";

  constructor(id: string) {
    this.id = id;
  }
}

@JsonObject("GetFilmsByNameResponse")
export class GetFilmsByNameResponse {
  @JsonProperty("id")
  id = "";

  @JsonProperty("name")
  name = "";

  @JsonProperty("rus")
  rus = "";

  @JsonProperty("year")
  year = "";

  @JsonProperty("type")
  type = "";

  @JsonProperty("link")
  link = "";

  @JsonProperty("image")
  image = "";

  @JsonProperty("ur_rating")
  ur_rating? = "";

  @JsonProperty("name")
  is_serial? = "";
}

@JsonObject("GetLinksByIdResponse")
export class GetLinksByIdResponse {
  @JsonProperty("id")
  id = "";

  @JsonProperty("err")
  err = "";

  @JsonProperty("title_ru")
  title_ru = "";

  @JsonProperty("title_orig")
  title_orig = "";

  @JsonProperty("type")
  type = "";

  @JsonProperty("content", [ContentDto])
  content = null;

  @JsonProperty("link")
  link = "";
}
