import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Inter font hospedada localmente (evita dependência de fonts.googleapis.com,
// reduz erros do Googlebot e melhora o LCP).
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
