import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadCsvFile from "../../src/components/UploadCsvFile";
import { MockResponseData } from "../MockData";
import axios from "axios";

vi.mock("axios");

describe("UploadCsvFile", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Uploading a .csv file - expecting "Upload Progress: 100%"', async () => {
    const mockOnUploadComplete = vi.fn();

    (axios.post as vi.Mock).mockImplementation((url, formData, config) => {
      if (config.onUploadProgress) {
        for (let percent = 0; percent <= 100; percent += 25) {
          config.onUploadProgress({ loaded: percent, total: 100 });
        }
      }
      return Promise.resolve({
        status: 200,
        data: MockResponseData,
      });
    });

    const { getByRole, getByText } = render(
      <UploadCsvFile onUploadComplete={mockOnUploadComplete} />
    );

    const file = new File(["content"], "test.csv", { type: "text/csv" });
    const input = getByRole("button");

    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(mockOnUploadComplete).toHaveBeenCalledWith(MockResponseData)
    );
    expect(getByText(/Upload Progress: 100%/)).toBeInTheDocument();

    screen.debug();
  });

  it('Uploading a .txt file - expecting "Upload failed, please upload a .csv file."', async () => {
    const mockOnUploadComplete = vi.fn();

    (axios.post as vi.Mock).mockRejectedValueOnce(new Error("Upload failed"));

    const { getByRole, getByText } = render(
      <UploadCsvFile onUploadComplete={mockOnUploadComplete} />
    );

    const file = new File(["content"], "test.txt", { type: "text/txt" });
    const input = getByRole("button");

    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(
        getByText(/Upload failed, please upload a .csv file./)
      ).toBeInTheDocument()
    );

    expect(mockOnUploadComplete).toHaveBeenCalledWith(null);
    screen.debug();
  });
});
