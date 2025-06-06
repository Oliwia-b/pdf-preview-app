import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./styles/PdfUploader.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfUploader() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1); // default zoom level
  const [pageHeight, setPageHeight] = useState(800); // default fallback height

  const minScale = 0.5;
  const maxScale = 1.25;

  const handleFile = (uploadedFile) => {
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setError("");
      setPageNumber(1);
      simulateProgress();
    } else {
      setFile(null);
      setError("Please upload a valid PDF file.");
    }
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const simulateProgress = () => {
    setLoading(true);
    setProgress(0);
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 80);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.max(prev - 1, 1);
      return newPage;
    });
  };

  const goToNextPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.min(prev + 1, numPages);
      return newPage;
    });
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, maxScale));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, minScale));
  };

  const resetZoom = () => setScale(1);

  const handleRenderSuccess = (page) => {
    const viewport = page.getViewport({ scale });
    setPageHeight(viewport.height);
  };

  return (
    <div className="pdf-uploader">
      <header className="header">
        <h1>PDF Viewer</h1>
        <p>
          Upload and preview PDF documents easily right in your browser. Drag
          and drop or use the file selector to get started.
        </p>
      </header>

      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Drag & drop a PDF file here, or click to select</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="file-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <p>Loading... {progress}%</p>
        </div>
      )}

      {file && !loading && (
        <div className="pdf-viewer">
          <div className="pdf-navbar">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              ◀ Prev
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next ▶
            </button>
          </div>
          <div className="zoom-controls">
            <button onClick={zoomOut} disabled={scale <= minScale}>
              ➖ Zoom Out
            </button>
            <button onClick={resetZoom} disabled={scale === 1.5}>
              🔄 Reset
            </button>
            <button onClick={zoomIn} disabled={scale >= maxScale}>
              ➕ Zoom In
            </button>
          </div>

          <div className="pdf-preview" style={{ minHeight: `${pageHeight}px` }}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setError("Failed to load PDF.")}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale}
                onRenderSuccess={handleRenderSuccess}
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
