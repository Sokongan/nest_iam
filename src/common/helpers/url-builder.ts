import { Injectable, Module } from "@nestjs/common";

@Injectable()
export class UrlBuilder {
  build(baseUrl: string, path: string): string {
    return new URL(path, baseUrl).toString();
  }
}

export interface ProviderConfig {
  getAdmin(): string;
  getPublic(): string;
}

export interface ProviderHttpClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
  put<T>(path: string, body: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export const PROVIDER_TOKENS = {
  HYDRA: Symbol("HYDRA_PROVIDER"),
  KRATOS: Symbol("KRATOS_PROVIDER"),
  KETO: Symbol("KETO_PROVIDER"),
} as const;


@Module({
  providers: [UrlBuilder],
  exports: [UrlBuilder],
})

export class CommonModule {}