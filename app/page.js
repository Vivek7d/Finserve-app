"use client"

import { useState, useRef, useEffect } from "react"
import Link from 'next/link' // Import Link for navigation
import { Camera, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-models/blazeface'
import { toast, Toaster } from 'react-hot-toast' // Import toast and Toaster for notifications

export default function FacialAuthentication() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [model, setModel] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Load the BlazeFace model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await blazeface.load()
      setModel(loadedModel)
      console.log("Face detection model loaded")
    }
    loadModel()
  }, [])

  // Function to detect faces and draw boxes
  const detectFaces = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Match canvas size to video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Detect faces
    const predictions = await model.estimateFaces(video, false)
    
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw rectangles around faces
    predictions.forEach(prediction => {
      const start = prediction.topLeft
      const end = prediction.bottomRight
      const size = [end[0] - start[0], end[1] - start[1]]

      ctx.strokeStyle = '#00ff00'
      ctx.lineWidth = 2
      ctx.strokeRect(start[0], start[1], size[0], size[1])
    })

    // Continue detection if camera is active
    if (isCameraActive) {
      requestAnimationFrame(detectFaces)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        },
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          setIsCameraActive(true)
          detectFaces()

          // Show toast after 5 seconds
          setTimeout(() => {
            toast.success("Facial Authentication is successfully done.", {
              duration: Infinity, // This makes the toast stay until the next page load
              position: 'top-right', // Changed position to top-left
            })
          }, 2000) // 5 seconds delay
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Failed to access camera. Please ensure camera permissions are granted.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsCameraActive(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const handleFaceLogin = () => {
    // Show success toast notification after 1 second
    setTimeout(() => {
      toast.success("Identity confirmed! Welcome back.", {
        duration: Infinity, // This makes the toast stay until the next page load
        position: 'top-right', // Changed position to top-left
      })
    }, 2000); // 1 second delay

    // Delay navigation for 5 seconds
    setTimeout(() => {
      window.location.href = "/dashboard"; // Redirect to dashboard after 5 seconds
    }, 3000);
  }

  const handleAdminLogin = () => {
    // Show success toast notification
    toast.success("Admin authentication successful!", {
      duration: Infinity,
      position: 'top-right',
    });
    
    // Delay navigation for 3 seconds
    setTimeout(() => {
      window.location.href = "/admin"; // Redirect to admin page after 3 seconds
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">FinServe Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user" className="flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                User Login
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="space-y-2">
              <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              
              {!isCameraActive ? (
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={startCamera}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Activate Camera
                </Button>
              ) : (
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  onClick={stopCamera}
                >
                  Deactivate Camera
                </Button>
              )}
              <div className="my-2" /> {/* Small gap between buttons */}
              <Button 
                className="w-full bg-green-500 hover:bg-green-600" 
                onClick={handleFaceLogin}
              >
                Confirm Identity
              </Button>
            </TabsContent>
            
            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter admin username"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="admin-password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter admin password"
                />
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700" 
                onClick={handleAdminLogin}
              >
                Login to Admin Panel
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Toaster component for displaying toasts */}
      <Toaster />
    </div>
  )
}
