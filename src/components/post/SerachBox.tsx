"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SerachBox() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/?search=${debouncedSearchTerm}`);
    } else {
      router.push("/");
    }
  }, [debouncedSearchTerm, router]);
  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        placeholder="記事を検索..."
        className="w-[200px] lg:w-[300px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
