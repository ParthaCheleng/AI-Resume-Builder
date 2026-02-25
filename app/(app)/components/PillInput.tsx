"use client";

import React, { useState, KeyboardEvent } from "react";

interface Props {
    placeholder: string;
    items: string[];
    onChange: (newItems: string[]) => void;
}

export default function PillInput({ placeholder, items, onChange }: Props) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            const value = inputValue.trim();

            if (value) {
                // Prevent duplicates (case-insensitive check)
                const isDuplicate = items.some(item => item.toLowerCase() === value.toLowerCase());

                if (!isDuplicate) {
                    onChange([...items, value]);
                }
                setInputValue(""); // Clear input regardless if duplicate or successful
            }
        }
    };

    const removePill = (indexToRemove: number) => {
        onChange(items.filter((_, idx) => idx !== indexToRemove));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ width: "100%", boxSizing: "border-box" }}
            />

            {items.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                backgroundColor: "var(--bg-color)",
                                border: "1px solid #CCC",
                                padding: "4px 8px",
                                borderRadius: "16px",
                                fontSize: "12px",
                                color: "var(--text-primary)"
                            }}
                        >
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => removePill(idx)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#999",
                                    padding: 0,
                                    fontSize: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
                                onMouseOut={(e) => (e.currentTarget.style.color = "#999")}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
