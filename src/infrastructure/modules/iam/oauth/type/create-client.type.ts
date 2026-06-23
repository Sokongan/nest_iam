export type CreateClientType = {
     client_id: string,
     client_secret: string,
     grant_types: string[],
     response_types: string[],
     scope: string,
     redirect_uris: string[],
     token_endpoint_auth_method: string,
}