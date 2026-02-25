import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function HLDPage() {
    return (
        <div>
            <ContextHeader
                title="04 - High Level Design"
                subtext="Draft the HLD for the application."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Create system sequence diagrams and API definitions.
                </p>
            </div>
        </div>
    );
}
