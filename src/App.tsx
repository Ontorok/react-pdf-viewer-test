import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
// Import the main component
// Core viewer
import { Worker, Viewer } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin, RenderGoToPageProps } from "@react-pdf-viewer/page-navigation";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

// Import file
import demofile from "./assets/demo.pdf";
import CustomizeExample from "./components/CustomizeExample";
import TestSelectComponent from "./components/TestSelectComponent";

function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "95vh",
          width: "70%",
          margin: "0 auto",
        }}
      >
        {/* <Viewer
          defaultScale={1.3}
          fileUrl={demofile}
          plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
        /> */}
        <CustomizeExample fileUrl={demofile} />
        {/* <TestSelectComponent /> */}
      </div>
    </Worker>
  );
}

export default App;
