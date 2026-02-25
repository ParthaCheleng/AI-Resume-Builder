import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function TestPage() {
    return (
        <div>
            <ContextHeader
                title="07 - Test"
                subtext="Verify all criteria and functionality."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Run automated tests and perform manual UI/UX verification. Ensure all edge cases in resume generation are handled.
                </p>
            </div>
        </div>
    );
}
