import { render, screen } from "@testing-library/react";
import DisplayCsvFile from "../../src/components/DisplayCsvFile";
import { MockResponseData, MockEmptyResponseData } from "../MockData";

describe("DisplayCsvFile", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Empty Mock Data provided - expecting "No data available"', async () => {
    render(
      <DisplayCsvFile
        data={MockEmptyResponseData.data}
        totalRecords={MockEmptyResponseData.data.length}
      />
    );
    const alert = screen.getByRole("alert");
    expect(alert);

    screen.debug();
  });

  it('Mock Data provided - expecting to find "Mr. Zero" in the Mock Data', async () => {
    render(
      <DisplayCsvFile
        data={MockResponseData.data}
        totalRecords={MockResponseData.data.length}
      />
    );
    expect(screen.getAllByRole("cell", { name: "Mr. Zero" })).toHaveLength(1);

    screen.debug();
  });
});
