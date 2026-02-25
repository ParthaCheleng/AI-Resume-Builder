import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function ShipPage() {
    return (
        <div>
            <ContextHeader
                title="08 - Ship"
                subtext="Deploy the application to production."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Deploy the frontend to Vercel and ensure the backend services are running in production mode. Prepare the release notes.
                </p>
            </div>
        </div>
    );
}
