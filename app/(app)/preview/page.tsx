import React from "react";

export default function PreviewPage() {
    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "var(--spacing-5)", color: "black", fontFamily: "var(--font-inter)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #CCC", minHeight: "1000px", padding: "var(--spacing-5)", backgroundColor: "white" }}>

                <div style={{ textAlign: "center", marginBottom: "var(--spacing-4)" }}>
                    <h1 style={{ fontSize: "32px", margin: 0, fontFamily: "var(--font-playfair)", fontWeight: 700 }}>YOUR NAME</h1>
                    <div style={{ fontSize: "14px", color: "#333", marginTop: "8px" }}>
                        youremail@email.com • (555) 123-4567 • City, State • linkedin.com/in/yourprofile
                    </div>
                </div>

                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Professional Summary</h2>
                    <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                        Software Engineer with extensive experience in developing highly scalable and efficient applications. Proven ability to architect complex systems, lead cross-functional teams, and deploy enterprise-level solutions leveraging modern frameworks and cloud technologies. Focus on clean code and robust design patterns.
                    </p>
                </div>

                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Experience</h2>

                    <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
                            <span>Senior Software Engineer</span>
                            <span>Jan 2020 - Present</span>
                        </div>
                        <div style={{ fontStyle: "italic", fontSize: "14px", marginBottom: "4px" }}>Tech Innovators Inc.</div>
                        <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                            <li>Led modularization of legacy monolithic application into microservices architecture.</li>
                            <li>Engineered zero-downtime deployment pipelines reducing deployment issues by 40%.</li>
                            <li>Mentored 4 junior engineers on React and Node.js best practices and code reviews.</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
                            <span>Software Engineer</span>
                            <span>Jun 2017 - Dec 2019</span>
                        </div>
                        <div style={{ fontStyle: "italic", fontSize: "14px", marginBottom: "4px" }}>Global Software Solutions</div>
                        <ul style={{ fontSize: "14px", margin: "4px 0 0 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                            <li>Implemented key tracking features improving data resolution for client dashboards.</li>
                            <li>Optimized SQL queries cutting report generation time by 30 seconds on average.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Education</h2>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
                            <span>University of Technology</span>
                            <span>May 2017</span>
                        </div>
                        <div style={{ fontSize: "14px", fontStyle: "italic", marginTop: "2px" }}>B.S. in Computer Science</div>
                    </div>
                </div>

                <div style={{ marginBottom: "var(--spacing-3)" }}>
                    <h2 style={{ fontSize: "16px", textTransform: "uppercase", borderBottom: "1px solid black", paddingBottom: "4px", marginBottom: "8px", fontWeight: 700 }}>Skills</h2>
                    <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6 }}>TypeScript, JavaScript, Python, React, Next.js, Node.js, Express, PostgreSQL, MongoDB, AWS, Docker, Git</p>
                </div>
            </div>
        </div>
    );
}
