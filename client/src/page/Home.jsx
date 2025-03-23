import { href, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  BookOpen,
  Trophy,
  FileText,
  ArrowRight,
  CheckCircle,
  Shield,
  Home,
  ShoppingCart,
  Users,
  Lock,
  Send,
  Search,
} from "lucide-react";
import Header from "@/components/Header";
// #F8FAFC
// #D9EAFD
// #BCCCDC
// #9AA6B2
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>

      <main className="flex-1 space-y-6">
        <section className=" bg-gray-100 w-full p-4 flex flex-col justify-center h-screen">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2">
                <div className="space-y-4 text-center lg:text-left">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    Legal <span className="text-blue-600">Lens</span>🔍
                  </h3>
                  {/* <Badge className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Know Your Rights
          </Badge>
          <Badge className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Know Your Rights
          </Badge> */}
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                    Making Legal Knowledge <br className="hidden sm:block" />
                    <span className="text-blue-600">
                      Accessible to Everyone
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                    Simplifying complex laws through AI chatbots, interactive
                    content, gamification, and real-life case studies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
                    <Button
                      size="lg"
                      className="gap-2 w-full sm:w-auto rounded-full active:scale-75 transition-all ease-in-out duration-500"
                      onClick={() => navigate("/daily-quiz")}
                    >
                      Daily Quiz <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto rounded-full active:scale-75 transition-all ease-in-out duration-500"
                      onClick={() => navigate("/case")}
                    >
                      Case Study
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Legal education platform illustration"
                  className="rounded-lg shadow-lg bg-slate-400 w-full max-w-md object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-20 px-4 h-screen">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                Our Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Empowering Citizens Through Legal Education
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers multiple ways to learn about your legal
                rights and responsibilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">
                    AI-Powered Legal Chatbot
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Get simple answers to your legal questions in plain language
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm md:text-base">
                    Ask questions about your rights and get easy-to-understand
                    explanations instantly.
                  </p>
                </CardContent>
                <CardFooter>
                  <button
                    onClick={() => {
                      const section = document.getElementById("chatbot");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1 text-sm md:text-base group"
                  >
                    Try it now{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">
                    Interactive Learning Modules
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Structured curriculum covering various legal topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm md:text-base">
                    Learn at your own pace with bite-sized lessons in text,
                    audio, and video formats.
                  </p>
                </CardContent>
                <CardFooter>
                  <button
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1 text-sm md:text-base group hover:cursor-pointer"
                    onClick={() => {
                      const section = document.getElementById("modules");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Explore modules{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                    <Trophy className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">
                    Gamified Quizzes & Rewards
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Make learning fun with points, badges, and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm md:text-base">
                    Test your knowledge with daily and weekly quizzes on legal
                    rights and earn rewards.
                  </p>
                </CardContent>
                <CardFooter>
                  <button
                    href="#gamification"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1 text-sm md:text-base group"
                    onClick={() => {
                      const section = document.getElementById("gamification");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Start earning{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">
                    Real-Life Case Studies
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Learn from actual court cases and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm md:text-base">
                    Understand how laws are applied in real situations through
                    detailed case studies.
                  </p>
                </CardContent>
                <CardFooter>
                  <div
                    href="#cases"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1 text-sm md:text-base group hover:cursor-pointer"
                    onClick={() => {
                      const section = document.getElementById("cases");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    View cases{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="chatbot" className="py-20 bg-gray-100 rounded-xl p-2 h-screen flex flex-col justify-center">
          <div className="flex justify-center items-center flex-col px-20">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <Badge className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  AI-Powered
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ask Legal Questions in Simple Language
                </h2>
                <p className="text-lg text-gray-600">
                  Our AI chatbot translates complex legal jargon into
                  easy-to-understand explanations, helping you navigate your
                  rights with confidence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Instant Answers</h3>
                      <p className="text-gray-600">
                        Get immediate responses to your legal questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Plain Language</h3>
                      <p className="text-gray-600">
                        Complex laws explained in simple terms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">24/7 Availability</h3>
                      <p className="text-gray-600">
                        Access legal information whenever you need it
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Legal Lens Chatbot</h3>
                  </div>
                  <Badge variant="outline">AI Assistant</Badge>
                </div>

                <div className="space-y-4 mb-4 h-80 overflow-y-auto p-4 bg-gray-50 rounded-md">
                  <div className="flex flex-col max-w-[80%]">
                    <Badge variant="secondary" className="self-start mb-1">
                      You
                    </Badge>
                    <div className="bg-gray-100 rounded-lg p-3">
                      What are my tenant rights?
                    </div>
                  </div>

                  <div className="flex flex-col max-w-[80%] ml-auto">
                    <Badge variant="secondary" className="self-end mb-1">
                      LegalEase
                    </Badge>
                    <div className="bg-blue-100 rounded-lg p-3">
                      As a tenant, you have the right to:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          A habitable home that meets health and safety
                          standards
                        </li>
                        <li>
                          Fair rent and protection from illegal rent increases
                        </li>
                        <li>Privacy and protection from illegal eviction</li>
                        <li>
                          Get your security deposit back when you move out
                          (minus legitimate deductions)
                        </li>
                        <li>Request repairs for essential services</li>
                      </ul>
                      Would you like more specific information about any of
                      these rights?
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a legal question..."
                    className="flex-1 rounded-lg"
                  />
                  <Button
                    className="rounded-full bg-blue-500 px-6 hover:bg-blue-800 hover:cursor-pointer active:scale-75 transition-all ease-in-out duration-500"
                    onClick={() => navigate("/chat")}
                  >
                    Send
                    <Send className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="py-20 rounded-xl h-screen flex flex-col justify-center">
          <div className="flex justify-center items-center flex-col p-4 rounded-xl">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                Learning Modules
              </Badge>
              <div className="text-sm font-bold text-red-800">
                The feature is in implemetation phase. Some features may not
                work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Structured Curriculum for Legal Education
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive learning modules covering various
                aspects of law.
              </p>
            </div>

            <Tabs
              defaultValue="basic"
              className="max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-lg p-4"
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="basic">Basic Rights</TabsTrigger>
                <TabsTrigger value="property">Property Laws</TabsTrigger>
                <TabsTrigger value="consumer">Consumer Rights</TabsTrigger>
                <TabsTrigger value="cyber">Cyber Laws</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Understanding Your Fundamental Rights</CardTitle>
                    <CardDescription>
                      Learn about the constitutional rights every citizen has
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Right to Equality</h4>
                          <p className="text-sm text-gray-600">15 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Freedom of Speech</h4>
                          <p className="text-sm text-gray-600">20 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Lock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Right to Privacy</h4>
                          <p className="text-sm text-gray-600">25 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Right to Information</h4>
                          <p className="text-sm text-gray-600">18 min lesson</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full active:scale-75 transition-all ease-in-out duration-500 bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="property" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property and Real Estate Laws</CardTitle>
                    <CardDescription>
                      Understanding ownership, tenancy, and property disputes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Home className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Tenant Rights</h4>
                          <p className="text-sm text-gray-600">30 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Property Registration</h4>
                          <p className="text-sm text-gray-600">25 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Inheritance Laws</h4>
                          <p className="text-sm text-gray-600">35 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Boundary Disputes</h4>
                          <p className="text-sm text-gray-600">20 min lesson</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full active:scale-75 transition-all ease-in-out duration-500 bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="consumer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Consumer Protection Laws</CardTitle>
                    <CardDescription>
                      Know your rights as a consumer and how to address
                      grievances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Product Liability</h4>
                          <p className="text-sm text-gray-600">22 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Refund Policies</h4>
                          <p className="text-sm text-gray-600">15 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">False Advertising</h4>
                          <p className="text-sm text-gray-600">20 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Filing Complaints</h4>
                          <p className="text-sm text-gray-600">25 min lesson</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full active:scale-75 transition-all ease-in-out duration-500 bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="cyber" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cyber Laws and Digital Rights</CardTitle>
                    <CardDescription>
                      Understanding online privacy, security, and digital crimes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Lock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Online Privacy</h4>
                          <p className="text-sm text-gray-600">30 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cyber Fraud</h4>
                          <p className="text-sm text-gray-600">35 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Digital Contracts</h4>
                          <p className="text-sm text-gray-600">25 min lesson</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Social Media Laws</h4>
                          <p className="text-sm text-gray-600">20 min lesson</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full active:scale-75 transition-all ease-in-out duration-500 bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section
          id="gamification"
          className=" py-24 bg-gray-100 rounded-3xl p-6 shadow-xl"
        >
          <div className="flex justify-center flex-col">
            <div className="text-center mb-20">
              <Badge className="mb-4 px-4 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all">
                🚀 Gamification
              </Badge>
              <div className="text-sm font-bold text-red-800">
                The feature is in implemetation phase. Some features may not
                work
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
                Learn While Having Fun
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Test your legal knowledge, earn rewards, and become a legal
                expert while enjoying the journey.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <Card className="hover:scale-105 transition-transform hover:shadow-2xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-blue-100 p-5 rounded-full mb-5">
                      <Trophy className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      Daily Quizzes
                    </CardTitle>
                    <CardDescription>
                      Boost your knowledge with fresh daily legal challenges.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2 text-blue-800">
                        Today's Challenge:
                      </h3>
                      <p className="text-gray-700 mb-4 italic">
                        "What is the punishment for cyber fraud?"
                      </p>
                      <div className="space-y-2">
                        {[
                          "Only a fine up to $1,000",
                          "Up to 3 years imprisonment and fine",
                          "Community service only",
                          "No specific punishment",
                        ].map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start hover:bg-blue-50 transition-all"
                          >
                            {String.fromCharCode(65 + index)}. {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all">
                      Submit Answer
                    </Button>
                  </CardFooter>
                </Card>

                {/* Card 2 */}
                <Card className="hover:scale-105 transition-transform hover:shadow-2xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-blue-100 p-5 rounded-full mb-5">
                      <Trophy className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      Badges & Achievements
                    </CardTitle>
                    <CardDescription>
                      Unlock badges as you master key legal concepts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          icon: <Shield className="h-6 w-6" />,
                          label: "Rights Expert",
                          active: true,
                        },
                        {
                          icon: <Home className="h-6 w-6" />,
                          label: "Property Pro",
                        },
                        {
                          icon: <Users className="h-6 w-6" />,
                          label: "Family Law",
                        },
                        {
                          icon: <ShoppingCart className="h-6 w-6" />,
                          label: "Consumer Guru",
                        },
                        {
                          icon: <Lock className="h-6 w-6" />,
                          label: "Cyber Expert",
                        },
                        {
                          icon: <FileText className="h-6 w-6" />,
                          label: "Case Master",
                        },
                      ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={`p-3 rounded-full mb-2 ${
                              badge.active
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {badge.icon}
                          </div>
                          <span className="text-xs text-center">
                            {badge.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all">
                      View All Badges
                    </Button>
                  </CardFooter>
                </Card>

                {/* Card 3 */}
                <Card className="hover:scale-105 transition-transform hover:shadow-2xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-blue-100 p-5 rounded-full mb-5">
                      <Trophy className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      Leaderboard
                    </CardTitle>
                    <CardDescription>
                      Compete and rise to the top of the legal ranks!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          rank: 1,
                          name: "John Doe",
                          pts: "2,450",
                          initials: "JD",
                          highlight: true,
                        },
                        {
                          rank: 2,
                          name: "Alice Smith",
                          pts: "2,310",
                          initials: "AS",
                        },
                        {
                          rank: 3,
                          name: "Robert Johnson",
                          pts: "2,145",
                          initials: "RJ",
                        },
                        {
                          rank: 4,
                          name: "Your Name",
                          pts: "1,890",
                          initials: "You",
                          self: true,
                        },
                      ].map((player, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-2 rounded-md ${
                            player.highlight
                              ? "bg-blue-50"
                              : player.self
                              ? "bg-gray-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold">{player.rank}</span>
                            <div
                              className={`h-8 w-8 rounded-full ${
                                player.highlight
                                  ? "bg-blue-200 text-blue-700"
                                  : "bg-gray-200 text-gray-600"
                              } flex items-center justify-center`}
                            >
                              <span className="font-medium">
                                {player.initials}
                              </span>
                            </div>
                            <span className="font-medium">{player.name}</span>
                          </div>
                          <span className="font-medium">{player.pts} pts</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all">
                      View Full Leaderboard
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="py-20">
          <div className="flex justify-center items-center flex-col">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                Real-Life Examples
              </Badge>
              <div className="text-sm font-bold text-red-800">
                The feature is in implemetation phase. Some features may not
                work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn from Actual Court Cases
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understand how laws are applied in real situations through
                detailed case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Consumer vs. E-commerce Company</CardTitle>
                  <CardDescription>
                    How a customer won a case against unfair charges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A customer was charged multiple times for a single purchase
                    on an e-commerce platform. Despite multiple complaints, the
                    company refused to refund the excess charges.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Key Legal Principle</h4>
                        <p className="text-sm text-gray-600">
                          Consumer Protection Act provisions against unfair
                          trade practices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Court Decision</h4>
                        <p className="text-sm text-gray-600">
                          The court ordered a full refund plus compensation for
                          mental agony
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => navigate("/case")}
                    variant="outline"
                    className="w-full bg-blue-700 rounded-full hover:bg-blue-800 hover:cursor-pointer text-white hover:text-white"
                  >
                    Read Full Case Study
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Tenant vs. Landlord</CardTitle>
                  <CardDescription>
                    How a tenant successfully fought an illegal eviction
                  </CardDescription>
                </CardHeader>
                <CardContent className="mb-4">
                  <p className="text-gray-600 mb-4">
                    A tenant was asked to vacate the premises without proper
                    notice and in violation of the rental agreement. The
                    landlord also refused to return the security deposit.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Key Legal Principle</h4>
                        <p className="text-sm text-gray-600">
                          Rent Control Act and provisions for tenant protection
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Court Decision</h4>
                        <p className="text-sm text-gray-600">
                          The court ruled in favor of the tenant, ordering the
                          landlord to pay damages
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => navigate("/case")}
                    variant="outline"
                    className="w-full bg-blue-700 rounded-full hover:bg-blue-800 hover:cursor-pointer text-white hover:text-white"
                  >
                    Read Full Case Study
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white rounded-xl">
          <div className="flex justify-center items-center flex-col text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Know Your Legal Rights?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who are empowering themselves with
              legal knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={() => navigate("/daily-quiz")}
              >
                Daily Quiz <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full text-white bg-blue-500 border-none transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-md"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-gray-50 mb-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center flex-col space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="h-7 w-7 text-blue-600" />
                <span className="text-2xl font-bold text-gray-800">
                  Legal Lens
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Making legal knowledge accessible to everyone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Features
              </h3>
              <ul className="space-y-2">
                {[
                  "AI Chatbot",
                  "Learning Modules",
                  "Gamification",
                  "Case Studies",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() =>
                        document
                          .getElementById(item.toLowerCase().replace(/\s/g, ""))
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Legal Areas
              </h3>
              <ul className="space-y-2">
                {[
                  "Basic Rights",
                  "Property Laws",
                  "Consumer Protection",
                  "Cyber Laws",
                ].map((area) => (
                  <li key={area}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Contact
              </h3>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Support",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t w-full pt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} LegalEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
