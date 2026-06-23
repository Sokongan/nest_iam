import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpClient {
  private async request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...init,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  }
}