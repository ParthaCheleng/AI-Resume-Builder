import React from "react";
import ContextHeader from "../components/ContextHeader";

export default function MarketPage() {
    return (
        <div>
            <ContextHeader
                title="02 - Market Analysis"
                subtext="Examine target audience and competitors for AI Resume Builder."
            />

            <div className="card space-y-3">
                <h2 style={{ fontSize: "24px" }}>Requirements</h2>
                <p>
                    Analyze the current tools available on the market and chart a competitive advantage for our solution.
                </p>
            </div>
        </div>
    );
}
