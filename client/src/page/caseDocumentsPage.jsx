import React, { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom"; 
import ReactMarkdown from 'react-markdown';
const Button = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-black rounded-full text-white hover:bg-gray-800 disabled:bg-gray-300 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded px-3 py-2 ${className}`}
  />
);

const Select = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="border rounded px-3 py-2"
  >
    {children}
  </select>
);

const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

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
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {error && <div className="text-red-600">{error}</div>}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Case Documents</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex space-x-4">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="CaseTitle">Sort by Case Title</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((doc) => (
              <Card key={doc.id} className="flex flex-col justify-between">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{doc.CaseTitle}</h2>
                  <p className="text-sm text-gray-500 line-clamp-3 overflow-hidden max-h-[4.5rem]">
                  <ReactMarkdown>{doc.CaseSummary}</ReactMarkdown>
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{doc.date}</span>
                    <span className="text-sm font-medium text-blue-600">
                      {doc.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <Button
                    className="w-full flex items-center justify-center"
                    onClick={() => navigate(`/case/${doc._id}`)} // Navigate to the case detail page
                  >
                    <FileText className="mr-2" size={20} />
                    View Case
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-36"
            >
              &lt; Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-36"
            >
              Next &gt;
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
