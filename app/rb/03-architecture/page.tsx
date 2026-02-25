import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function ArchitecturePage() {
    return (
        <div>
            <ContextHeader
                title="03 - Architecture"
                subtext="Design the foundational technical architecture."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Map out the backend services, LLM integration points, and database schemas.
                </p>
            </div>
        </div>
    );
}
