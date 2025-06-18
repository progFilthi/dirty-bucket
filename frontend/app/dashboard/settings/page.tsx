"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Beat {
  _id: string;
  title: string;
  key: string;
  bpm: number;
  price: number;
}

export default function SettingsPage() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/beats")
      .then((res) => setBeats(res.data))
      .catch(() => toast.error("Failed to fetch beats"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    id: string,
    field: keyof Beat,
    value: string | number
  ) => {
    setBeats((prev) =>
      prev.map((beat) => (beat._id === id ? { ...beat, [field]: value } : beat))
    );
  };

  const handleSave = async (beat: Beat) => {
    try {
      await axios.put(`http://localhost:8080/api/beats/${beat._id}`, beat);
      toast.success("Beat updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/beats/${id}`);
      setBeats((prev) => prev.filter((b) => b._id !== id));
      toast.success("Beat deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading beats...</p>;

  return (
    <div className="p-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings: Manage Beats</h1>
      <div className="space-y-6">
        {beats.map((beat) => (
          <div
            key={beat._id}
            className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                value={beat.title}
                onChange={(e) =>
                  handleChange(beat._id, "title", e.target.value)
                }
                placeholder="Title"
              />
              <Input
                value={beat.key}
                onChange={(e) => handleChange(beat._id, "key", e.target.value)}
                placeholder="Key"
              />
              <Input
                type="number"
                value={beat.bpm}
                onChange={(e) =>
                  handleChange(beat._id, "bpm", Number(e.target.value))
                }
                placeholder="BPM"
              />
              <Input
                type="number"
                value={beat.price}
                onChange={(e) =>
                  handleChange(beat._id, "price", Number(e.target.value))
                }
                placeholder="Price"
              />
            </div>
            <div className="flex gap-4 justify-end">
              <Button onClick={() => handleSave(beat)}>Save</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(beat._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
