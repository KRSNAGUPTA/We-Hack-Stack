import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import Button from "../components/Button";
import Input from "../components/Input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Github, Mail, Eye, EyeOff, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // References for file inputs
  const avatarRef = useRef(null);
  const coverImageRef = useRef(null);
  
  // File state
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (type === 'avatar') {
      setAvatar(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverImage(file);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setAlertMessage('Passwords do not match!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    // Create form data for file upload
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    
    if (formData.phone) submitData.append('phone', formData.phone);
    if (formData.role) submitData.append('role', formData.role);
    
    // Append files if they exist
    if (avatar) submitData.append('avatar', avatar);
    if (coverImage) submitData.append('coverImage', coverImage);
    
    // Log the data being sent (for debugging)
    console.log("Registration data:");
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}: ${key === 'password' ? '********' : value}`);
    }
    
    setLoading(true);
    try {
      // Check if we're using the correct endpoint URL

      const response = await axios.post('http://localhost:3000/api/v1/users/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // Include this to handle cookies properly
      });
      
      console.log("Registration response:", response.data);
      
      setAlertMessage('Registration successful! Please verify your email.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setError(true);
      setAlertMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setAlertMessage(`Registering with ${provider}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return colors[passwordStrength - 1] || 'bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
              Create Your Account
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" onValueChange={(value) => handleInputChange({ target: { name: 'role', value }})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="h-1 mt-2 grid grid-cols-4 gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-full rounded ${
                        level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must contain at least 8 characters, including uppercase, numbers, and special characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Add file upload for avatar */}
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  {avatarPreview && (
                    <div className="h-20 w-20 rounded-full overflow-hidden">
                      <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => avatarRef.current.click()}
                    className="flex gap-2 items-center"
                  >
                    <Upload size={16} />
                    Upload Avatar
                  </Button>
                  <input
                    ref={avatarRef}
                    type="file"
                    id="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'avatar')}
                  />
                </div>
              </div>
              
              {/* Add file upload for cover image */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => coverImageRef.current.click()}
                    className="flex gap-2 items-center"
                  >
                    <Upload size={16} />
                    Upload Cover Image
                  </Button>
                  <input
                    ref={coverImageRef}
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                  />
                  {coverImage && <span className="text-sm text-gray-500">{coverImage.name}</span>}
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or register with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialRegister('Google')}
                className="w-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialRegister('GitHub')}
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => window.location.href = '/login'}
              className="text-sm"
            >
              Already have an account? Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;