import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker dynamically to ensure compatibility with Next.js
if (typeof window !== "undefined") {
    console.log("Initializing PDF.js worker");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }

export const extractPDFText = async (pdfFile: File) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let textContent = "";
      let numberOfCurrentPdfPageSimplified = pdf.numPages;
      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const textLayer = await page.getTextContent();
        console.log(textLayer);

        const pageText = textLayer.items
          .map((item: any) =>
            typeof item === "object" && "str" in item ? item.str : "",
          )
          .join(" "); // Filter out non-string items
        textContent += pageText + "\n";
      }
 
      return {success: textContent};
    } catch (error) {
      console.error("PDF extraction error:", error);
      
      return {error: ""};
    }
  };