"use client"

import { useState, useRef } from "react"
import { Video, Mic, Type, Send, Upload, CheckCircle, Paperclip, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "react-hot-toast"

export default function QuerySubmission() {
  const [step, setStep] = useState(1)
  const [queryType, setQueryType] = useState("text")
  const [query, setQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [mediaBlobUrl, setMediaBlobUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("medium")
  const [contactPreference, setContactPreference] = useState("email")
  const [attachments, setAttachments] = useState([])
  const fileInputRef = useRef(null)

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    setIsRecording(false)
    setSubmitted(true)
    setTicketId(`#TIC${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`)
    toast.success("Query submitted successfully!")
    setQuery("")
    setQueryType("text")
    setCategory("")
    setPriority("medium")
    setContactPreference("email")
    setAttachments([])
    setStep(1)
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    if (value.length > 3) {
      setAiSuggestions(["Check account balance", "Update contact information", "Report a lost card"])
    } else {
      setAiSuggestions([])
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    // Add logic to start recording video or audio
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Add logic to stop recording and set mediaBlobUrl
    setMediaBlobUrl("https://example.com/sample-recording.mp4") // Placeholder
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(URL.createObjectURL(file))
    }
  }

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }))
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory)
    
    // Set priority automatically based on category
    switch(selectedCategory) {
      case "fraud":
        setPriority("high")
        break
      case "account-locked":
        setPriority("high")
        break
      case "loan-application":
        setPriority("medium")
        break
      case "transaction-issue":
        setPriority("medium")
        break
      default:
        setPriority("low")
    }
  }

  const priorityLabels = {
    "high": "High - Urgent attention required",
    "medium": "Medium - Resolve within 24 hours",
    "low": "Low - General inquiry"
  }

  const priorityIcons = {
    "high": <AlertTriangle className="h-5 w-5 text-red-500" />,
    "medium": <Clock className="h-5 w-5 text-amber-500" />,
    "low": <CheckCircle className="h-5 w-5 text-green-500" />
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="mt-8"></div>
      <div className="max-w-3xl mx-auto mt-8 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Submit a Query</h1>
        {!submitted ? (
          <Card className="p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Step {step}: {step === 1 ? "Query Details" : "Review & Submit"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={step.toString()} onValueChange={(value) => setStep(parseInt(value))}>
                <TabsList className="flex justify-center mb-6">
                  <TabsTrigger value="1" className="px-4 py-2 flex items-center">
                    Step 1: Details {step > 1 && <CheckCircle className="w-5 h-5 ml-2 text-green-500" />}
                  </TabsTrigger>
                  <TabsTrigger value="2" className="px-4 py-2 flex items-center">
                    Step 2: Review {submitted && <CheckCircle className="w-5 h-5 ml-2 text-green-500" />}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="1">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium mb-2 block">Query Category</Label>
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={category}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          aria-label="Query Category"
                        >
                          <option value="">Select a category</option>
                          <option value="account-issues">Account Issues</option>
                          <option value="transaction-issue">Transaction Issues</option>
                          <option value="loan-application">Loan Application</option>
                          <option value="credit-card">Credit Card</option>
                          <option value="account-locked">Account Locked</option>
                          <option value="fraud">Fraud or Suspicious Activity</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-2 block">Query Type</Label>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <Button
                            type="button"
                            variant={queryType === "video" ? "default" : "outline"}
                            onClick={() => setQueryType("video")}
                            className="flex items-center px-4 py-2"
                          >
                            <Video className="w-5 h-5 mr-2" />
                            Video
                          </Button>
                          <Button
                            type="button"
                            variant={queryType === "audio" ? "default" : "outline"}
                            onClick={() => setQueryType("audio")}
                            className="flex items-center px-4 py-2"
                          >
                            <Mic className="w-5 h-5 mr-2" />
                            Audio
                          </Button>
                          <Button
                            type="button"
                            variant={queryType === "text" ? "default" : "outline"}
                            onClick={() => setQueryType("text")}
                            className="flex items-center px-4 py-2"
                          >
                            <Type className="w-5 h-5 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>

                      {queryType === "video" && (
                        <div className="bg-muted p-6 rounded-md">
                          <Button
                            type="button"
                            variant={isRecording ? "destructive" : "default"}
                            onClick={isRecording ? stopRecording : startRecording}
                            className="mb-4 w-full"
                          >
                            {isRecording ? "Stop Recording" : "Start Video Recording"}
                          </Button>
                          {mediaBlobUrl && (
                            <video controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                          )}
                          <div className="mt-4">
                            <Button onClick={() => fileInputRef.current.click()} className="w-full">
                              <Upload className="w-5 h-5 mr-2" />
                              Upload Video
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="video/*"
                              onChange={handleFileUpload}
                              style={{ display: 'none' }}
                            />
                            {uploadedFile && (
                              <video controls src={uploadedFile} className="mt-4 w-full rounded-md" />
                            )}
                          </div>
                          
                          <div className="mt-6 border-t pt-4">
                            <Label className="text-base font-medium mb-2 block">Add Text Description (Optional)</Label>
                            <textarea
                              value={query}
                              onChange={(e) => handleQueryChange(e.target.value)}
                              placeholder="Add additional details about your video query..."
                              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              rows={4}
                              aria-label="Additional text details"
                            />
                          </div>
                        </div>
                      )}

                      {queryType === "audio" && (
                        <div className="bg-muted p-6 rounded-md">
                          <Button
                            type="button"
                            variant={isRecording ? "destructive" : "default"}
                            onClick={isRecording ? stopRecording : startRecording}
                            className="mb-4 w-full"
                          >
                            {isRecording ? "Stop Recording" : "Start Audio Recording"}
                          </Button>
                          {mediaBlobUrl && (
                            <audio controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                          )}
                        </div>
                      )}

                      {queryType === "text" && (
                        <div>
                          <Label className="text-base font-medium mb-2 block">Your Query</Label>
                          <textarea
                            value={query}
                            onChange={(e) => handleQueryChange(e.target.value)}
                            placeholder="Please describe your issue in detail..."
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            aria-label="Query details"
                          />
                        </div>
                      )}

                      {aiSuggestions.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-md border border-blue-200">
                          <h3 className="text-lg font-semibold mb-2">Suggested Solutions:</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {aiSuggestions.map((suggestion, index) => (
                              <li key={index} className="text-blue-700 hover:text-blue-900 cursor-pointer">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <Label className="text-base font-medium mb-2 block">Attachments</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Drag and drop files, or
                          </p>
                          <Button 
                            onClick={() => document.getElementById('attachments').click()} 
                            variant="outline" 
                            className="mt-2"
                          >
                            Browse Files
                          </Button>
                          <input
                            id="attachments"
                            type="file"
                            multiple
                            onChange={handleAttachmentUpload}
                            className="hidden"
                          />
                        </div>
                        {attachments.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="font-medium">Uploaded files:</p>
                            <ul className="divide-y divide-gray-200">
                              {attachments.map((file, index) => (
                                <li key={index} className="py-2 flex justify-between">
                                  <span className="truncate max-w-xs">{file.name}</span>
                                  <span className="text-sm text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-2 block">Contact Preference</Label>
                        <RadioGroup 
                          value={contactPreference} 
                          onValueChange={setContactPreference}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-email" />
                            <Label htmlFor="contact-email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sms" id="contact-sms" />
                            <Label htmlFor="contact-sms">SMS</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button onClick={handleNextStep} className="w-full py-2">
                        Review Query
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="2">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className="space-y-6">
                      <div className="bg-muted p-6 rounded-md">
                        <h3 className="font-semibold text-lg mb-4">Review Your Query</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="font-medium">Category:</span>
                            <span className="capitalize">{category.replace('-', ' ')}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Priority:</span>
                            <span className="flex items-center">
                              {priorityIcons[priority]}
                              <span className="ml-2">{priorityLabels[priority]}</span>
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-medium">Query Type:</span>
                            <span className="capitalize">{queryType}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-medium">Contact Via:</span>
                            <span className="capitalize">{contactPreference}</span>
                          </div>
                          
                          {(queryType === "text" || query) && (
                            <div>
                              <span className="font-medium block mb-2">Your Query:</span>
                              <div className="bg-white p-4 rounded border">{query}</div>
                            </div>
                          )}
                          
                          {(mediaBlobUrl || uploadedFile) && queryType === "video" && (
                            <div>
                              <span className="font-medium block mb-2">Your Video:</span>
                              <video 
                                controls 
                                src={uploadedFile || mediaBlobUrl} 
                                className="w-full rounded-md border" 
                              />
                            </div>
                          )}
                          
                          {mediaBlobUrl && queryType === "audio" && (
                            <div>
                              <span className="font-medium block mb-2">Your Audio:</span>
                              <audio 
                                controls 
                                src={mediaBlobUrl} 
                                className="w-full rounded-md" 
                              />
                            </div>
                          )}
                          
                          {attachments.length > 0 && (
                            <div>
                              <span className="font-medium block mb-2">Attachments:</span>
                              <ul className="list-disc pl-5">
                                {attachments.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-4">
                        <Button onClick={handlePreviousStep} variant="outline" className="w-full py-2">
                          Edit Query
                        </Button>
                        <Button onClick={handleQuerySubmit} className="w-full py-2 flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Submit Query
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Query Submitted Successfully</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <p className="text-green-700">Your query has been received and is being processed.</p>
              </div>
              
              <p className="text-xl font-semibold text-center mb-4">Ticket ID: {ticketId}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-center text-blue-700">
                  <strong>Estimated response time:</strong> {priority === "high" ? "2-4 hours" : priority === "medium" ? "24 hours" : "48 hours"}
                </p>
                <p className="text-center text-blue-700 text-sm mt-1">
                  We'll contact you via {contactPreference} with updates.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={() => setSubmitted(false)} className="py-2 px-4">
                  Submit Another Query
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
