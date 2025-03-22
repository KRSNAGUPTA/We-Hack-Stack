import React from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { FileSearch2, FileText, MessageSquare } from "lucide-react";
import {useNavigate} from "react-router-dom"

export default function Home() {
  const nevigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <FileText className="h-6 w-6 mr-2" />
          <span className="font-bold">CaseChat</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Chat with Your Case Studies
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Upload your case documents, get instant summaries, and chat
                  with your cases like never before.
                </p>
              </div>
              <div className="space-x-4">
                <Button name="Get Started" onClick={()=>(nevigate("/case"))}/>
                <Button name="Learn more" variant="outline" onClick={()=>(nevigate("#"))} />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <FileSearch2 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Search</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily search your case studies & documents{" "}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FileText className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Summarize</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant, AI-generated summaries of your uploaded
                  documents.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Chat</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Interact with your documents through a chat interface for
                  deeper insights.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Case Analysis?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of professionals who are already using CaseChat
                  to streamline their research and analysis.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" name="Sign Up" />
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial today. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 CaseChat. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
