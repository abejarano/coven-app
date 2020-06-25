// @ts-ignore
import { Injectable } from "@angular/core";
// @ts-ignore
import { HttpClient, HttpHeaders } from "@angular/common/http";
// @ts-ignore
import { Observable } from "rxjs";
// @ts-ignore
import { environment } from "../environments/environment";

// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class RequestAPI {
    private ambiente: string;

    constructor(private http: HttpClient) {
        console.log(environment.URL_API);
        this.ambiente = environment.URL_API;
    }

    getBody(form: any) {
        return new Promise((resolve) => {
            const body: FormData = new FormData();
            // tslint:disable-next-line:forin
            for (const key in form) {
                body.append(key, form[key]);
            }
            console.log(body);
            resolve(body);
        });
    }

    /**
     * POST
     * url recebe função a ser chamada na API
     * dados recebe uma string
     */
    post(url: string, form: any, isPrivate = true): Observable<any> {
        let headerRequest: any;
        if (isPrivate) {
            headerRequest = {
                headers: this.getHeader()
            };
        } else {
            headerRequest = {};
        }

        return this.http.post(
            this.ambiente + url,
            form,
            headerRequest
        );

    }

    put(url: string, dados) {

        return this.http.put(
            this.ambiente + url,
            JSON.stringify(dados)
        );
    }

    /**
     * GET
     * url recebe função a ser chamada na API
     * filtro valor que será filtrado na API
     */
    get(url: string, dados = {}, prv = true) {
        if (prv) {
            return this.http.get(
                this.ambiente + url,
                {
                    params: dados,
                    headers: this.getHeader()
                }
            );
        } else {
            return this.http.get(
                this.ambiente + url,
                {
                    params: dados
                }
            );
        }

    }

    /**
     * DELETE
     * url recebe função a ser chamada na API
     * filtro valor que será filtrado na API
     */
    delete(url: string, dados = {}) {
        return this.http.delete(
            this.ambiente + url,
            {
                params: dados
            }
        );
    }

    /**
     * GET com promise
     * url recebe função a ser chamada na API
     * filtro valor que será filtrado na API
     */
    async getPromise(url: string, dados = {}) {
        return this.http
            .get(this.ambiente + url, {
                params: dados
            })
            .toPromise()
            .then((resposta: any) => {
                return resposta;
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    private getHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: "Token " + environment.API_TOKEN
        });
    }

}
