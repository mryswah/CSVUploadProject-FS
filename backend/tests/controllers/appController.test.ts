import {
  uploadCsvFile,
  searchCsvFile,
} from "../../src/controllers/appController";
import { Request, Response } from "express";

describe("uploadCsvFile", () => {
  it("Upload tests/data/test.csv - expecting 200 response", async () => {
    const req = {
      file: {
        path: "tests/data/test.csv",
        originalname: "test.csv",
        mimetype: "text/csv",
      },
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;

    await uploadCsvFile(req, res);

    expect(res.status).toBeCalledWith(200);
  });
});

it("Upload tests/data/test.txt - expecting 400 response", async () => {
  const req = {
    file: {
      path: "tests/data/test.txt",
      originalname: "test.txt",
      mimetype: "text/plain",
    },
  } as unknown as Request;

  const res = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
    json: vi.fn(),
  } as unknown as Response;

  await uploadCsvFile(req, res);

  expect(res.status).toBeCalledWith(400);
});

describe("searchCsvFile", () => {
  it('Searching for "Zero" - expecting "Zero" to be present', async () => {
    let searchQuery = "Zero";

    const req = {
      query: { query: searchQuery },
    };
    const res = { json: vi.fn() };
    const jsonSpy = vi.spyOn(res, "json");

    await searchCsvFile(req as any, res as any);

    expect(res.json).toHaveBeenCalled();
    const responseData = res.json.mock.calls[0][0].data;
    console.log("responseData : ", responseData);

    expect(
      responseData.some((item) =>
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).toBe(true);
  });

  it('Searching for "Four" - expecting no results', async () => {
    let searchQuery = "Four";

    const req = {
      query: { query: searchQuery },
    };
    const res = { json: vi.fn() };
    const jsonSpy = vi.spyOn(res, "json");

    await searchCsvFile(req as any, res as any);

    expect(res.json).toHaveBeenCalled();
    const responseData = res.json.mock.calls[0][0].data;
    console.log("responseData : ", responseData);

    expect(responseData).toEqual([]);
  });
});
