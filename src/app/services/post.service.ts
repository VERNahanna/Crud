import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Categories, FAQ, Icategories, ICategoriesViewModel, IFAQViewModel} from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "https:/mocawebsitebackend.techno-politan.xyz/api/v1/";


  private CategoryWithFAQ = "https:/mocawebsitebackend.techno-politan.xyz/api/v1/Faqs";




  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
/******************Category Tab************************************************/
  getAll(): Observable<ICategoriesViewModel> {

    return this.httpClient.get<ICategoriesViewModel>(this.apiURL + '/Categories')

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post:Categories): Observable<any> {

    return this.httpClient.post(this.apiURL + '/Categories/', JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + 'Categories/' + id + '?LobSpaceTypeId=1')

    .pipe(
      catchError(this.errorHandler)
    )
  }


  update(post:Categories): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/Categories/${post.id}`, post, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


  delete(id:number):Observable<{}>{
    return this.httpClient.delete<{}>(this.apiURL + '/categories/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }


/*==============================FAQ=====================================*/
getAllFAQ(categoryId: number): Observable<IFAQViewModel> {

  return this.httpClient.get<IFAQViewModel>(this.CategoryWithFAQ + `/Category/${categoryId}`)
  .pipe(
    catchError(this.errorHandler)
  )
}

/**
 * Write code on Method
 *
 * @return response()
 */
// /api/v{version}/Faqs/Category/{categoryId}
createFAQ(faq:FAQ): Observable<any> {

  return this.httpClient.post(this.CategoryWithFAQ + `/Category/${faq.categoryId}`, faq, this.httpOptions)

  .pipe(
    catchError(this.errorHandler)
  )
}


updateFAQ(faq:FAQ): Observable<any> {
  return this.httpClient.put<any>(`${this.CategoryWithFAQ}/Category/{faqId}${faq.id}`, faq, this.httpOptions)

  .pipe(
    catchError(this.errorHandler)
  )
}


deleteFAQ(faqId:number):Observable<{}>{
  return this.httpClient.delete<{}>(`${this.CategoryWithFAQ}/Category/1/${faqId}`, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}
/*===================================================================*/





  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
