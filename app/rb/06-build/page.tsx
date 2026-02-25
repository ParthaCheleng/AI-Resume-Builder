import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function BuildPage() {
    return (
        <div>
            <ContextHeader
                title="06 - Build"
                subtext="Develop the MVP features defined in previous steps."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Write the application code based on the generated LLD. Make sure all components adhere strictly to the design system.
                </p>
            </div>
        </div>
    );
}
