import { Injectable } from "@nestjs/common";
import { HttpClient } from "../../../../common/helpers/http-client";
import { OauthConfigService } from "./oauth-module";

@Injectable()
export class HydraClientService {
    constructor(
        private readonly http: HttpClient,
        private readonly oauth: OauthConfigService
    ) { }

    createClient(body: any) {
        return this.http.request(
            this.oauth.getAdmin(),
            "/admin/clients",
            {
                method: "POST",
                body: JSON.stringify(body),
            });
    }
}