import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

function renderFatalError(message: string) {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui,sans-serif;background:#fff;color:#111;">
      <div style="max-width:640px;">
        <h1 style="font-size:20px;font-weight:700;margin:0 0 12px;">Something failed to load</h1>
        <pre style="white-space:pre-wrap;word-break:break-word;font-size:13px;background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:12px;color:#b00020;">${message}</pre>
      </div>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  renderFatalError(`${event.message}\n${event.filename ?? ""}:${event.lineno ?? ""}:${event.colno ?? ""}\n${event.error?.stack ?? ""}`);
});
window.addEventListener("unhandledrejection", (event) => {
  renderFatalError(`Unhandled promise rejection: ${String(event.reason?.stack ?? event.reason)}`);
});

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <div style={{ maxWidth: 640 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Something failed to load</h1>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13, background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 8, padding: 12, color: "#b00020" }}>
              {String(this.state.error.stack ?? this.state.error.message)}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  );
} catch (error) {
  renderFatalError(error instanceof Error ? (error.stack ?? error.message) : String(error));
}
