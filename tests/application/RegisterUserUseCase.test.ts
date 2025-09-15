import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/register/route";

describe("RegisterUserUseCase", () => {
  it("should return data with status 200", async () => {
    const request = new NextRequest("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify({ username: "test", password: "secreto" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toHaveProperty("length");
    expect(body.length).toBe(2);
  });
});
