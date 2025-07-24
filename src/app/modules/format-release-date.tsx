"use client";

const formatReleaseDate = (date: string): string | null => {
  if (!date || typeof date !== "string") {
    return null;
  }

  const parts = date.split("-");
  return parts.length > 0 ? parts[0] : null;
};

export default formatReleaseDate;
