import React from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, ArrowLeft, Scale, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header.jsx";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-amber-50 flex flex-col">
      <header className="bg-gradient-to-r from-purple-700 to-violet-800 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
        </div>
      </header>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="max-w-2xl w-full bg-white/60 backdrop-blur-md border-0 shadow-xl">
          <CardContent className="pt-12 pb-12 px-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="flex items-center justify-center">
                  <div className="absolute">
                    <Scale size={120} className="text-violet-200" />
                  </div>
                  <div className="text-7xl font-bold text-violet-900 relative z-10 pb-4">
                    404
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <BookOpen size={32} className="text-amber-400" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-violet-900 mb-4">
                Page Not Found
              </h2>

              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg mb-8 border-l-4 border-amber-400">
                <p className="text-sm text-amber-800 font-medium">
                  "In the absence of evidence, the case must be dismissed."
                </p>
                <p className="text-xs text-right text-amber-600 mt-1">
                  — Legal Precedent
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="border-violet-200 text-violet-700 hover:bg-violet-50 rounded-full shadow-sm"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Return to Previous Page
                </Button>

                <Button
                  onClick={() => navigate("/case")}
                  className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all rounded-full"
                >
                  <FileSearch className="mr-2" size={18} />
                  Go to Case Directory
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
