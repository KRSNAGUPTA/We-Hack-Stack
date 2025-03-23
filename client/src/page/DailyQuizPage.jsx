import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, ChevronRight, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import api from '@/utils/api';
import Header from '@/components/Header';

const LegalQuiz = () => {
  const [quizSize, setQuizSize] = useState(5); 
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizData = async (size) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/daily-quiz/random?size=${size}`);
      setQuizData(response.data.randomQuiz);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData(quizSize);
  }, []);

  const handleSizeChange = (value) => {
    setQuizSize(Number(value));
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    fetchQuizData(Number(value));
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerId
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    fetchQuizData(quizSize);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    Object.keys(selectedAnswers).forEach(questionIndex => {
      const question = quizData[questionIndex];
      const selectedAnswerIndex = selectedAnswers[questionIndex];
      if (question.quizAnswers[selectedAnswerIndex].isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <RefreshCw className="w-12 h-12 text-indigo-700 animate-spin" />
        <span className="text-lg font-medium text-indigo-800">Loading quiz questions...</span>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const totalQuestions = quizData.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <Card className="w-full max-w-4xl mx-auto shadow-xl border border-indigo-100 p-2 sm:p-4">
        <CardHeader className="bg-indigo-50 border-b border-indigo-100 text-center">
          <CardTitle className="text-2xl text-indigo-700">Quiz Results</CardTitle>
          <CardDescription className="text-base mt-1">You scored {score} out of {totalQuestions}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
              <span className="font-medium text-lg">Score: {percentage}%</span>
              <span className="font-medium">{score}/{totalQuestions} correct</span>
            </div>
            <Progress value={percentage} className="h-3 bg-indigo-100" />
          </div>
          <div className="space-y-5">
            {quizData.map((question, index) => {
              const selectedAnswerIndex = selectedAnswers[index];
              const isCorrect = selectedAnswerIndex !== undefined && question.quizAnswers[selectedAnswerIndex].isCorrect;
              return (
                <div key={question._id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} space-y-2`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {isCorrect ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">Question {index + 1}: {question.quizQuestion}</h3>
                      <p className="text-sm text-gray-700"><b>Your answer:</b> {selectedAnswerIndex !== undefined ? question.quizAnswers[selectedAnswerIndex].answer : 'Not answered'}</p>
                      <p className="text-sm text-gray-700"><b>Correct answer:</b> {question.quizAnswers.find(ans => ans.isCorrect).answer}</p>
                      <p className="text-xs italic bg-white p-3 rounded border border-gray-200 mt-1"><b>Explanation:</b> {question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center bg-gray-50">
          <Button onClick={handleRestartQuiz} className="bg-indigo-700 hover:bg-indigo-800 px-6 py-2 w-full sm:w-auto">
            <RefreshCw className="w-5 h-5 mr-2" /> Retry {quizSize} Questions
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex] || {};

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white rounded-lg">
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">Legal Knowledge Quiz</h1>
        <div className="flex items-center bg-indigo-50 p-2 rounded-lg w-full sm:w-auto">
          <span className="mr-3 text-indigo-700 font-medium">Quiz Size:</span>
          <Select value={quizSize.toString()} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-full sm:w-32 border-indigo-300 focus:ring-indigo-500 bg-white shadow-sm">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[2, 5, 10, 15].map(size => (
                  <SelectItem key={size} value={size.toString()} className="hover:bg-indigo-50 cursor-pointer">
                    {size} Questions
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {quizData.length > 0 ? (
        <Card className="shadow-xl border-indigo-100 overflow-hidden w-full">
          <CardHeader className="bg-indigo-50 border-b border-indigo-100 pb-4">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} px-3 py-1 text-sm font-medium shadow-sm`}>
                {currentQuestion.category} • {currentQuestion.difficulty}
              </Badge>
              <span className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-indigo-100 text-indigo-700">
                Question {currentQuestionIndex + 1} of {quizData.length}
              </span>
            </div>
            <CardTitle className="mt-4 text-xl font-bold text-indigo-800">{currentQuestion.quizQuestion}</CardTitle>
          </CardHeader>
          
          <CardContent className="py-6 px-4 sm:px-6">
            <RadioGroup 
              value={selectedAnswers[currentQuestionIndex]?.toString()} 
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              className="space-y-4"
            >
              {currentQuestion.quizAnswers?.map((answer, answerIndex) => (
                <div 
                  key={answerIndex} 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer shadow-sm"
                  onClick={() => handleAnswerSelect(answerIndex)}
                >
                  <RadioGroupItem 
                    value={answerIndex.toString()} 
                    id={`answer-${answerIndex}`} 
                    className="border-indigo-400 text-indigo-700 h-5 w-5"
                  />
                  <Label 
                    htmlFor={`answer-${answerIndex}`} 
                    className="pl-3 cursor-pointer flex-1 font-medium text-gray-700"
                  >
                    {answer.answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4 bg-gray-50">
            <div className="w-full sm:w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1 px-1">
                <span>Progress</span>
                <span>{Math.round((currentQuestionIndex / quizData.length) * 100)}%</span>
              </div>
              <Progress 
                value={(currentQuestionIndex / quizData.length) * 100} 
                className="h-2 bg-indigo-100" 
              />
            </div>
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="bg-indigo-700 hover:bg-indigo-800 transition-all px-4 py-2 shadow-md w-full sm:w-auto disabled:opacity-50"
            >
              {currentQuestionIndex < quizData.length - 1 ? (
                <>Next Question <ChevronRight className="w-4 h-4 ml-1" /></>
              ) : (
                'Show Results'
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center py-16 bg-indigo-50 rounded-lg border border-indigo-100 w-full">
          <p className="text-lg text-indigo-700">No quiz questions available. Try a different selection.</p>
        </div>
      )}
    </div>
  );
};

export default LegalQuiz;
