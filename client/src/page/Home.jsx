import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import Header from "@/components/Header"
// #F8FAFC
// #D9EAFD
// #BCCCDC
// #9AA6B2
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen p-1">
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>
      

      <main className="flex-1 p-1 ">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="container flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <Badge className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Know Your Rights</Badge>
              <h1 className="text-3xl md:text-3xl font-bold leading-tight">
                Making Legal Knowledge <br/><span className="text-blue-600">Accessible to Everyone</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Simplifying complex laws through AI chatbots, interactive content, gamification, and real-life case
                studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" onClick={() => window.location.href = "/daily-quiz"}>
                Daily Quiz <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Legal education platform illustration"
                className="rounded-lg shadow-lg bg-slate-400 "
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Our Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Citizens Through Legal Education</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers multiple ways to learn about your legal rights and responsibilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="hover:shadow-xl transition-shadow bg-slate-300">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>AI-Powered Legal Chatbot</CardTitle>
                  <CardDescription>Get simple answers to your legal questions in plain language</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ask questions about your rights and get easy-to-understand explanations instantly.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#chatbot" className="text-blue-600 hover:underline flex items-center gap-1">
                    Try it now <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-shadow bg-slate-300">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Interactive Learning Modules</CardTitle>
                  <CardDescription>Structured curriculum covering various legal topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Learn at your own pace with bite-sized lessons in text, audio, and video formats.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#modules" className="text-blue-600 hover:underline flex items-center gap-1">
                    Explore modules <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-shadow bg-slate-300">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Gamified Quizzes & Rewards</CardTitle>
                  <CardDescription>Make learning fun with points, badges, and rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Test your knowledge with daily and weekly quizzes on legal rights and earn rewards.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#gamification" className="text-blue-600 hover:underline flex items-center gap-1">
                    Start earning <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-xl transition-shadow bg-slate-300">
                <CardHeader>
                  <FileText className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Real-Life Case Studies</CardTitle>
                  <CardDescription>Learn from actual court cases and their outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Understand how laws are applied in real situations through detailed case studies.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#cases" className="text-blue-600 hover:underline flex items-center gap-1">
                    View cases <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Chatbot Demo */}
        <section id="chatbot" className="py-20 bg-gray-100 rounded-xl p-2">
          <div className="container m-2 p-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <Badge className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">AI-Powered</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Ask Legal Questions in Simple Language</h2>
                <p className="text-lg text-gray-600">
                  Our AI chatbot translates complex legal jargon into easy-to-understand explanations, helping you
                  navigate your rights with confidence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Instant Answers</h3>
                      <p className="text-gray-600">Get immediate responses to your legal questions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Plain Language</h3>
                      <p className="text-gray-600">Complex laws explained in simple terms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">24/7 Availability</h3>
                      <p className="text-gray-600">Access legal information whenever you need it</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">LegalEase Chatbot</h3>
                  </div>
                  <Badge variant="outline">AI Assistant</Badge>
                </div>

                <div className="space-y-4 mb-4 h-80 overflow-y-auto p-4 bg-gray-50 rounded-md">
                  <div className="flex flex-col max-w-[80%]">
                    <Badge variant="secondary" className="self-start mb-1">
                      You
                    </Badge>
                    <div className="bg-gray-100 rounded-lg p-3">What are my tenant rights?</div>
                  </div>

                  <div className="flex flex-col max-w-[80%] ml-auto">
                    <Badge variant="secondary" className="self-end mb-1">
                      LegalEase
                    </Badge>
                    <div className="bg-blue-100 rounded-lg p-3">
                      As a tenant, you have the right to:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>A habitable home that meets health and safety standards</li>
                        <li>Fair rent and protection from illegal rent increases</li>
                        <li>Privacy and protection from illegal eviction</li>
                        <li>Get your security deposit back when you move out (minus legitimate deductions)</li>
                        <li>Request repairs for essential services</li>
                      </ul>
                      Would you like more specific information about any of these rights?
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Ask a legal question..." className="flex-1" />
                  <Button>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Learning Modules */}
        <section id="modules" className="py-20">
          <div className="container p-4 bg-gray-100 rounded-xl">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Learning Modules</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Structured Curriculum for Legal Education</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive learning modules covering various aspects of law.
              </p>
            </div>

            <Tabs defaultValue="basic" className="max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-lg p-4">
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
                    <CardDescription>Learn about the constitutional rights every citizen has</CardDescription>
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
                    <Button className="w-full">Start Learning</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="property" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property and Real Estate Laws</CardTitle>
                    <CardDescription>Understanding ownership, tenancy, and property disputes</CardDescription>
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
                    <Button className="w-full">Start Learning</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="consumer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Consumer Protection Laws</CardTitle>
                    <CardDescription>Know your rights as a consumer and how to address grievances</CardDescription>
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
                    <Button className="w-full">Start Learning</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="cyber" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cyber Laws and Digital Rights</CardTitle>
                    <CardDescription>Understanding online privacy, security, and digital crimes</CardDescription>
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
                    <Button className="w-full">Start Learning</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Gamification */}
        <section id="gamification" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Gamification</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn While Having Fun</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Test your knowledge, earn points, and collect badges as you master legal concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
                    <Trophy className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle>Daily Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with daily legal questions</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Today's Question:</h3>
                    <p className="text-gray-700 mb-4">"What is the punishment for cyber fraud?"</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        A. Only a fine up to $1,000
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        B. Up to 3 years imprisonment and fine
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        C. Community service only
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        D. No specific punishment
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black text-white">Submit Answer</Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
                    <Trophy className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle>Badges & Achievements</CardTitle>
                  <CardDescription>Collect badges as you master different legal areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-2">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-xs text-center">Rights Expert</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <Home className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-center">Property Pro</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-center">Family Law</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-center">Consumer Guru</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <Lock className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-center">Cyber Expert</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-center">Case Master</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="">
                  <Button className="w-full bg-black text-white">
                    View All Badges
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
                    <Trophy className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>Compete with others and climb the ranks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">1</span>
                        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">JD</span>
                        </div>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <span className="font-medium">2,450 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">2</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">AS</span>
                        </div>
                        <span className="font-medium">Alice Smith</span>
                      </div>
                      <span className="font-medium">2,310 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">3</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">RJ</span>
                        </div>
                        <span className="font-medium">Robert Johnson</span>
                      </div>
                      <span className="font-medium">2,145 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">4</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">You</span>
                        </div>
                        <span className="font-medium">Your Name</span>
                      </div>
                      <span className="font-medium">1,890 pts</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button  className="w-full bg-black text-white">
                    View Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="cases" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Real-Life Examples</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn from Actual Court Cases</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understand how laws are applied in real situations through detailed case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Consumer vs. E-commerce Company</CardTitle>
                  <CardDescription>How a customer won a case against unfair charges</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A customer was charged multiple times for a single purchase on an e-commerce platform. Despite
                    multiple complaints, the company refused to refund the excess charges.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Key Legal Principle</h4>
                        <p className="text-sm text-gray-600">
                          Consumer Protection Act provisions against unfair trade practices
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
                          The court ordered a full refund plus compensation for mental agony
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-black text-white">
                    Read Full Case Study
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Tenant vs. Landlord</CardTitle>
                  <CardDescription>How a tenant successfully fought an illegal eviction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A tenant was asked to vacate the premises without proper notice and in violation of the rental
                    agreement. The landlord also refused to return the security deposit.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Key Legal Principle</h4>
                        <p className="text-sm text-gray-600">Rent Control Act and provisions for tenant protection</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Court Decision</h4>
                        <p className="text-sm text-gray-600">
                          The court ruled in favor of the tenant, 
                          ordering the landlord to pay damages
                        
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-black text-white">
                    Read Full Case Study
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white rounded-xl">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Know Your Legal Rights?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who are empowering themselves with legal knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" onClick={()=>Navigate("/daily-quiz")}>
                Daily Quiz <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">LegalEase</span>
              </div>
              <p className="text-gray-600">Making legal knowledge accessible to everyone.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#chatbot" className="text-gray-600 hover:text-blue-600">
                    AI Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="#modules" className="text-gray-600 hover:text-blue-600">
                    Learning Modules
                  </Link>
                </li>
                <li>
                  <Link href="#gamification" className="text-gray-600 hover:text-blue-600">
                    Gamification
                  </Link>
                </li>
                <li>
                  <Link href="#cases" className="text-gray-600 hover:text-blue-600">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal Areas</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Basic Rights
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Property Laws
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Consumer Protection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Cyber Laws
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} LegalEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

