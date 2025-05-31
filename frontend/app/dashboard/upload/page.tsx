"use client";

import React, { useState, useRef } from "react";
import { Upload, Music, ImageIcon, Check, Loader2 } from "lucide-react";
import Image from "next/image";

function MyDropzone() {
  const [preview, setPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    key: "",
    bpm: "",
    price: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [dragStates, setDragStates] = useState({
    image: false,
    audio: false,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      if (preview) URL.revokeObjectURL(preview);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setImageFile(file);
    }
  };

  const handleAudioChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file && (file.type === "audio/wav" || file.type === "audio/mpeg")) {
      setAudioFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent, type: "image" | "audio") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (e: React.DragEvent, type: "image" | "audio") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));
  };

  const handleDrop = (e: React.DragEvent, type: "image" | "audio") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));

    const files = e.dataTransfer.files;
    if (type === "image") {
      handleImageChange(files);
    } else {
      handleAudioChange(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    try {
      if (!audioFile || !imageFile) {
        console.error("Please upload both an image and audio file.");
        return;
      }

      setIsUploading(true);

      const form = new FormData();
      form.append("title", formData.title);
      form.append("key", formData.key);
      form.append("bpm", formData.bpm);
      form.append("price", formData.price);
      form.append("cover", imageFile);
      form.append("audio", audioFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(errorData?.error || "Upload failed");
        throw new Error(errorData?.error || "Upload failed");
      }

      await response.json();
      console.log("Beat uploaded successfully!");

      // Reset form
      setPreview(null);
      setAudioFile(null);
      setImageFile(null);
      setFormData({
        title: "",
        key: "",
        bpm: "",
        price: "",
      });

      setIsUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
            {/* Upload Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Cover Image
                </label>
                <div
                  onDragOver={(e) => handleDragOver(e, "image")}
                  onDragLeave={(e) => handleDragLeave(e, "image")}
                  onDrop={(e) => handleDrop(e, "image")}
                  onClick={() => imageInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
                    ${
                      dragStates.image
                        ? "border-primary bg-primary/5"
                        : preview
                        ? "border-green-500 bg-green-50"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    }`}
                >
                  <input
                    placeholder="Click to upload image"
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files)}
                    className="hidden"
                  />
                  {preview ? (
                    <div className="space-y-3">
                      <div className="w-20 h-20 mx-auto rounded-md overflow-hidden">
                        <Image
                          src={preview}
                          alt="Preview"
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Image uploaded
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {dragStates.image
                            ? "Drop image here"
                            : "Click to upload image"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, SVG
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Audio Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Audio File
                </label>
                <div
                  onDragOver={(e) => handleDragOver(e, "audio")}
                  onDragLeave={(e) => handleDragLeave(e, "audio")}
                  onDrop={(e) => handleDrop(e, "audio")}
                  onClick={() => audioInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
                    ${
                      dragStates.audio
                        ? "border-primary bg-primary/5"
                        : audioFile
                        ? "border-green-500 bg-green-50"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    }`}
                >
                  <input
                    placeholder="Click to upload audio"
                    ref={audioInputRef}
                    type="file"
                    accept="audio/wav,audio/mpeg"
                    onChange={(e) => handleAudioChange(e.target.files)}
                    className="hidden"
                  />
                  {audioFile ? (
                    <div className="text-center space-y-2">
                      <Music className="w-8 h-8 mx-auto text-green-600" />
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Audio uploaded
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {audioFile.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Music className="w-8 h-8 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {dragStates.audio
                            ? "Drop audio here"
                            : "Click to upload audio"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          WAV, MP3
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Beat title"
                    maxLength={24}
                    value={formData.title}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Key
                  </label>
                  <input
                    type="text"
                    name="key"
                    placeholder="e.g., C#m"
                    value={formData.key}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    BPM
                  </label>
                  <input
                    type="number"
                    name="bpm"
                    placeholder="120"
                    value={formData.bpm}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="29.99"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpload}
                disabled={!audioFile || !imageFile || isUploading}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Beat
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">BEATS UPLOAD</h1>
          <p className="text-muted-foreground mt-2">
            Upload and share your beats
          </p>
        </div>
        <MyDropzone />
      </div>
    </div>
  );
}
