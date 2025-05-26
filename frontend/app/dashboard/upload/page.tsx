"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

function MyDropzone() {
  const [preview, setPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    key: "",
    bpm: "",
    price: "",
  });

  const onImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles.find((file) =>
        file.type.startsWith("image/")
      );
      if (imageFile) {
        if (preview) URL.revokeObjectURL(preview);
        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);
      }
    },
    [preview]
  );

  const onAudioDrop = useCallback((acceptedFiles: File[]) => {
    const audio = acceptedFiles.find(
      (file) => file.type === "audio/wav" || file.type === "audio/mpeg"
    );
    if (audio) setAudioFile(audio);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    try {
      if (!audioFile || !preview) {
        toast.error("Please upload both an image and audio file.");
        return;
      }

      // ✅ FORM DATA UPLOAD SECTION START
      const imageInput = document.querySelector(
        'input[type="file"][accept*="image"]'
      ) as HTMLInputElement;
      const imageFile = imageInput?.files?.[0];

      if (!imageFile) {
        toast.error("Image file not found.");
        return;
      }

      toast.loading("Uploading beat...");

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

      toast.dismiss();

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData?.error || "Upload failed");
        throw new Error(errorData?.error || "Upload failed");
      }

      await response.json();
      toast.success("Beat uploaded successfully!");
      // ✅ FORM DATA UPLOAD SECTION END
    } catch (error: unknown) {
      console.error("Upload error:", error);
      toast.dismiss();
      toast.error("Failed to upload beat.");
    }
  };

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onImageDrop,
    accept: { "image/*": [] },
  });

  const {
    getRootProps: getAudioRootProps,
    getInputProps: getAudioInputProps,
    isDragActive: isAudioDragActive,
  } = useDropzone({
    onDrop: onAudioDrop,
    accept: { "audio/wav": [], "audio/mpeg": [] },
  });

  return (
    <div className="my-4 flex flex-col items-center space-y-6">
      {/* Image Dropzone */}
      <div
        {...getImageRootProps()}
        className="border-neutral-800 border p-4 w-64 h-16 rounded-md shadow-md flex items-center justify-center cursor-pointer transition hover:bg-neutral-200"
      >
        <input {...getImageInputProps()} />
        <p className="text-sm text-gray-700">
          {isImageDragActive
            ? "Drop the image here ..."
            : "Drag & drop an image here"}
        </p>
      </div>
      {preview && (
        <div className="w-40 h-40 shadow-lg relative rounded-md overflow-hidden">
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
        </div>
      )}

      {/* Audio Dropzone */}
      <div
        {...getAudioRootProps()}
        className="border-neutral-800 border p-4 w-64 h-16 rounded-md shadow-md flex items-center justify-center cursor-pointer transition hover:bg-neutral-200"
      >
        <input {...getAudioInputProps()} />
        <p className="text-sm text-gray-700">
          {isAudioDragActive
            ? "Drop the audio file here ..."
            : "Drag & drop a .wav file here"}
        </p>
      </div>
      {audioFile && (
        <p className="text-sm text-green-600 font-medium">
          {audioFile.name.toUpperCase()}
        </p>
      )}

      {/* Form Inputs */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload(); // trigger upload logic
        }}
        className="flex flex-col space-y-3 w-64"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title.toUpperCase()}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="text"
          name="key"
          placeholder="Key (e.g., C#m)"
          value={formData.key.toUpperCase()}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="number"
          name="bpm"
          placeholder="BPM"
          value={formData.bpm}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="bg-neutral-700 text-white rounded px-4 py-2 text-sm hover:bg-neutral-800 transition cursor-pointer"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Beat</h1>
      <MyDropzone />
      <Toaster position="top-right" />
    </div>
  );
}
