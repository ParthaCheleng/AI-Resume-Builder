import React from "react";

export default function BuilderPage() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", minHeight: "calc(100vh - 70px)" }}>
            {/* Left Column (Forms) */}
            <div style={{ flex: "1 1 400px", padding: "var(--spacing-4)", borderRight: "1px solid #E5E5E5", overflowY: "auto", maxHeight: "calc(100vh - 70px)" }} className="space-y-4">
                <div className="flex-between">
                    <h2 style={{ fontSize: "24px" }}>Resume Details</h2>
                    <button className="btn-secondary" style={{ fontSize: "14px" }}>Load Sample Data</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Personal Info</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>(name, email, phone, location)</p>
                    <input type="text" placeholder="Full Name" style={{ width: "100%", boxSizing: "border-box" }} />
                    <input type="email" placeholder="Email Address" style={{ width: "100%", boxSizing: "border-box" }} />
                    <input type="tel" placeholder="Phone Number" style={{ width: "100%", boxSizing: "border-box" }} />
                    <input type="text" placeholder="Location" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Summary</h3>
                    <textarea rows={4} placeholder="Professional summary..." style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }} />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Education</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>(add multiple entries)</p>
                    <button className="btn-secondary" style={{ width: "100%" }}>+ Add Education</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Experience</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>(add multiple entries)</p>
                    <button className="btn-secondary" style={{ width: "100%" }}>+ Add Experience</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Projects</h3>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>(add multiple entries)</p>
                    <button className="btn-secondary" style={{ width: "100%" }}>+ Add Project</button>
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Skills</h3>
                    <input type="text" placeholder="Comma-separated skills..." style={{ width: "100%", boxSizing: "border-box" }} />
                </div>

                <div className="card space-y-2">
                    <h3 style={{ fontSize: "18px", fontFamily: "var(--font-inter)", fontWeight: 600 }}>Links</h3>
                    <input type="text" placeholder="GitHub URL" style={{ width: "100%", boxSizing: "border-box" }} />
                    <input type="text" placeholder="LinkedIn URL" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
            </div>

            {/* Right Column (Live Preview) */}
            <div style={{ flex: "1 1 500px", padding: "var(--spacing-4)", backgroundColor: "#EEE", display: "flex", justifyContent: "center", alignItems: "flex-start", overflowY: "auto", maxHeight: "calc(100vh - 70px)" }}>
                <div style={{
                    width: "100%",
                    maxWidth: "800px",
                    minHeight: "800px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    padding: "var(--spacing-4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    border: "1px solid #DDD"
                }}>
                    Live preview placeholder shell.
                </div>
            </div>
        </div>
    );
}
