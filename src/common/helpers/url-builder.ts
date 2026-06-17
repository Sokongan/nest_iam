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

@Module({
  providers: [UrlBuilder],
  exports: [UrlBuilder],
})
export class CommonModule {}