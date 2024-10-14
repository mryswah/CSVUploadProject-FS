import { render, screen, fireEvent } from "@testing-library/react";
import SearchCsvFile from "../../src/components/SearchCsvFile";
import { MockResponseData, Zero, Three } from "../MockData";

describe("SearchCsvFile", () => {
  const mockSetSearchTerm = vi.fn();
  const mockSetSearchResults = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("Nothing entered into Search yet", async () => {
    render(
      <SearchCsvFile
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        data={null}
        setSearchResults={mockSetSearchResults}
      />
    );
    const input = screen.getByPlaceholderText(/Search.../i);
    expect(input).toBeInTheDocument();

    screen.debug();
  });

  it("Mock Data is present, searching for Zero", async () => {
    const searchTerm = Zero;
    render(
      <SearchCsvFile
        searchTerm={searchTerm}
        setSearchTerm={mockSetSearchTerm}
        data={MockResponseData}
        setSearchResults={mockSetSearchResults}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", searchTerm);
    const filteredData = mockSetSearchResults.mock.calls[0][0];
    console.log("filterData : ", filteredData);
    expect.arrayContaining(filteredData.data);

    screen.debug();
  });

  it("Mock Data is present, updating the search to Three", async () => {
    const searchTerm = Zero;
    const newSearchterm = Three;
    render(
      <SearchCsvFile
        searchTerm={searchTerm}
        setSearchTerm={mockSetSearchTerm}
        data={MockResponseData}
        setSearchResults={mockSetSearchResults}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: newSearchterm } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith(newSearchterm);
    expect(input).toHaveValue(newSearchterm);

    screen.debug();
  });
});
