import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Copy,
  FileText,
  Loader2,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "@/utils/api";

const CaseViewer = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchCaseDocument();
  }, [id]);

  const fetchCaseDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/cases/${id}`);
      setCaseData(response.data);
      console.log(response.data);
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
      await navigator.clipboard.writeText(caseData.CaseSummary);
      showNotification("Case summary copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy content");
    }
  };

  const handleDownloadPDF = () => {
    showNotification("PDF download started");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <Alert variant="destructive" className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="flex-1">
                Error loading case: {error}
              </AlertDescription>
              <Button
                onClick={fetchCaseDocument}
                className="ml-4 bg-blue-600 hover:bg-blue-700 rounded-full"
              >
                Retry
              </Button>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-8">
      {showAlert && (
        <div className="fixed top-6 right-6 z-50 w-80 transition-all ease-in-out duration-300">
          <Alert className="bg-blue-600 text-white border-none shadow-xl">
            <AlertDescription className="flex items-center">
              {alertMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-6xl mx-auto mb-6">
        <Link to="/case">
          <Button
            variant="ghost"
            className="gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Library
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="border-b bg-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Badge className="mb-2 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer rounded-full">
                      Case Summary
                    </Badge>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {isLoading ? (
                        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        caseData.CaseTitle
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCopy}
                      disabled={isLoading}
                      className="gap-2 rounded-xl border-blue-200 hover:bg-blue-50"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    {/* <Button
                      onClick={handleDownloadPDF}
                      disabled={isLoading}
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button> */}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center p-16">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <span className="ml-4 text-lg text-gray-600">
                      Loading case details...
                    </span>
                  </div>
                ) : (
                  <div className="bg-white p-6 md:p-8 prose prose-slate max-w-none">
                    <ReactMarkdown>{caseData.CaseSummary}</ReactMarkdown>
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-t p-4 text-sm text-gray-500 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                For educational purposes only
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Cases */}
            <Card className="shadow-md border-0 rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Related Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {!isLoading ? (
                  <>
                    {[
                      {
                        id: "123",
                        title: "Rodriguez v. Metropolitan Housing",
                        desc: "Maintenance standards",
                      },
                      {
                        id: "456",
                        title: "Nelson v. City Apartments",
                        desc: "Warranty of habitability",
                      },
                      {
                        id: "789",
                        title: "Washington Tenants Union v. State",
                        desc: "Class action",
                      },
                    ].map((related) => (
                      <div key={related.id}>
                        <Link
                          to={`/cases/${related.id}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {related.title}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                        <p className="text-xs text-gray-500">{related.desc}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  Array(3)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="animate-pulse space-y-1">
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            <Card className="shadow-md border-0 bg-blue-50 rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-800">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {!isLoading ? (
                  <>
                    {[
                      "Landlords must provide habitable premises",
                      "Tenants have rights under local housing codes",
                      "Case established important legal precedent",
                    ].map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <p className="text-sm text-gray-700">{takeaway}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  Array(3)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="animate-pulse space-y-1">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseViewer;
