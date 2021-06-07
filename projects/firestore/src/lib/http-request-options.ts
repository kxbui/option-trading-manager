import { HttpHeaders } from '@angular/common/http';

export interface HttpRequestOptions {
  method?: string;
  url: string;
  params?: Object;
  body?: Object;
  headers?: HttpHeaders;
}
