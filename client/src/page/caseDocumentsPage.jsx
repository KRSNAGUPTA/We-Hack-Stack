import React, { useEffect, useState } from "react";
import { FileText, Search, Filter } from "lucide-react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header.jsx";

export default function CaseDocumentsPage() {
  const [caseDocuments, setCaseDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await api.get("/cases/case");
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getData();
        setCaseDocuments(data);
      } catch (error) {
        console.error("Failed to fetch case documents:", error);
        setError("Failed to load case documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = caseDocuments.filter(
    (doc) =>
      doc.CaseTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || doc.category === filterCategory)
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.CaseTitle.localeCompare(b.CaseTitle);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDocuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-amber-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg bg-white/60 backdrop-blur-md"
              >
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="bg-white/40">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-amber-50">
      {error && (
        <div className="max-w-7xl mx-auto p-4 mt-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <header className="bg-gradient-to-r from-blue-700 to-violet-900 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h3
              onClick={() => navigate("/")}
              className="hover:cursor-pointer font-extrabold text-white text-3xl tracking-tight flex items-center gap-1"
            >
              Legal <span className="text-blue-400">Lens</span>
              <span role="img" aria-label="magnifier">
                🔍
              </span>
            </h3>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl text-white font-medium tracking-wide">
              Case Documents
            </h2>
          </div>
        </div>
      </header>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-full border-violet-200 bg-white/70 backdrop-blur-sm focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-violet-200 bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="CaseTitle">Sort by Case Title</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-white/70 backdrop-blur-sm border-violet-200"
              >
                <Filter size={18} className="mr-2 text-violet-600" />
                <span className="text-violet-800">Filter</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((doc) => (
              <Card
                key={doc._id}
                className="flex flex-col justify-between border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md"
              >
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold text-violet-900">
                    {doc.CaseTitle}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 line-clamp-3 overflow-hidden max-h-[4.5rem]">
                    <ReactMarkdown>{doc.CaseSummary}</ReactMarkdown>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-violet-600 font-medium">
                      {doc.date}
                    </span>
                    {doc.category && (
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0 shadow-sm">
                        {doc.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-white/40 backdrop-blur-sm p-4 mt-2">
                  <Button
                    className="rounded-full w-full bg-blue-700 hover:bg-blue-800 active:scale-75 transition-all ease-in-out duration-500 text-white shadow-md hover:shadow-lg "
                    onClick={() => navigate(`/case/${doc._id}`)}
                  >
                    <FileText className="mr-2" size={20} />
                    View Case
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sortedDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center p-10 mt-8 bg-white/60 backdrop-blur-md rounded-lg shadow-md">
              <FileText size={48} className="text-violet-300 mb-4" />
              <h3 className="text-lg font-medium text-violet-900 mb-2">
                No cases found
              </h3>
              <p className="text-violet-600 text-center">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}

          {sortedDocuments.length > 0 && (
            <div className="mt-8 flex justify-between items-center bg-white/60 backdrop-blur-sm p-4 rounded-full shadow-md">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="w-36 border-violet-200 text-violet-700 hover:bg-violet-50 rounded-full shadow-sm"
              >
                &lt; Previous
              </Button>
              <span className="text-sm font-medium text-violet-800 bg-white/70 px-4 py-2 rounded-full shadow-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                variant="outline"
                className="w-36 border-violet-200 text-violet-700 hover:bg-violet-50 rounded-full shadow-sm"
              >
                Next &gt;
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
