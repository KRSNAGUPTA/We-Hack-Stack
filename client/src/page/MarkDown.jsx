import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/Button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Download, Copy, FileText, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const MarkDown = () => {
  const { id } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);
    //   console.log("id",id   );
      
      // Replace with your actual API endpoint
      const response = await api.get(`/cases/${id}`);
      console.log("response",response);
      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }
      const data = await response.json();
      setMarkdownContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      showNotification("Content copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy content");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Replace with your actual PDF download endpoint
      const response = await fetch("/api/document/pdf");
      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification("PDF downloaded successfully!");
    } catch (err) {
      showNotification("Failed to download PDF");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertDescription>
                Error loading document: {error}
                <Button
                  variant="outline"
                  onClick={fetchDocument}
                  className="ml-4"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {showAlert && (
          <div className="mb-4">
            <Alert>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Document Viewer
            </CardTitle>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopy}
                disabled={isLoading}
                className="flex items-center"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                disabled={isLoading}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6 prose prose-slate max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: markdownContent }}
                  className="space-y-4"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkDown;
