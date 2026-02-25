import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function LLDPage() {
    return (
        <div>
            <ContextHeader
                title="05 - Low Level Design"
                subtext="Specify the LLD and component architecture."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Detail the React components, state management store structure, and utility functions needed.
                </p>
            </div>
        </div>
    );
}
