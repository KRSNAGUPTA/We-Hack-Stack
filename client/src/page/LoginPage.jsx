import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Mail, Eye, EyeOff } from "lucide-react";
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (!isLogin && password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      setError(true);
      setLoading(false);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      let response;
      
      if (isLogin) {
        response = await api.post("/users/login", { email, password }, { withCredentials: true });
        
        if (response.data.success) {
          setAlertMessage("Successfully logged in!");
          setShowAlert(true);
          
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('accessToken', response.data.accessToken);
          
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } else {
        // For simple registration (redirect to full registration page)
        setAlertMessage("Redirecting to registration page...");
        setShowAlert(true);
        setTimeout(() => {
          navigate('/register');
        }, 1500);
        return;
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} error:`, error);
      setError(true);
      setAlertMessage(
        error.response?.data?.message || 
        (isLogin ? "Failed to login, please try again." : "Failed to register, please try again.")
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setAlertMessage(`${isLogin ? "Logging in" : "Signing up"} with ${provider}...`);
      setShowAlert(true);
      
      // Call social login endpoint
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/social/login',
        { provider: provider.toLowerCase() },
        { withCredentials: true }
      );
      
      if (response.data.redirectUrl) {
        // Redirect to OAuth provider
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error('No redirect URL provided');
      }
    } catch (error) {
      console.error(`Social ${isLogin ? "login" : "signup"} error:`, error);
      setError(true);
      setAlertMessage(`Failed to ${isLogin ? "login" : "register"} with ${provider}`);
      setShowAlert(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showAlert && (
          <div className="mb-4">
            <Alert variant={error ? "destructive" : "default"}>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    type="button"
                    className="px-0 font-normal text-sm text-blue-600"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? (isLogin ? "Signing In..." : "Creating Account...") 
                  : (isLogin ? "Sign In" : "Sign Up")}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="w-full"
                disabled={loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("GitHub")}
                className="w-full"
                disabled={loading}
              >
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => {
                if (!isLogin) {
                  navigate('/register');
                } else {
                  setIsLogin(!isLogin);
                }
              }}
              className="text-sm"
              disabled={loading}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
