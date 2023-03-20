import * as React from "react";
import { PageChangeEvent, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin, RenderCurrentPageLabelProps, RenderGoToPageProps } from "@react-pdf-viewer/page-navigation";
import { RenderCurrentScaleProps, zoomPlugin } from "@react-pdf-viewer/zoom";
import customZoomPlugin from "../customPdfPlugins/CustomZoomPlugin";
import {
  highlightPlugin,
  HighlightArea,
  MessageIcon,
  RenderHighlightContentProps,
  RenderHighlightsProps,
  RenderHighlightTargetProps,
} from "@react-pdf-viewer/highlight";
import { Button, Position, PrimaryButton, Tooltip } from "@react-pdf-viewer/core";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";

interface CustomizeNavigationButtonsExampleProps {
  fileUrl: string;
}

interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
  color: string;
}

const CustomizedExample: React.FC<CustomizeNavigationButtonsExampleProps> = ({ fileUrl }) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const customZoomPluginInstance = customZoomPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();

  const { GoToFirstPage, GoToLastPage, GoToNextPage, GoToPreviousPage, CurrentPageLabel, jumpToPage } = pageNavigationPluginInstance;
  const { CurrentScale } = zoomPluginInstance;
  const { zoomTo } = customZoomPluginInstance;

  //#region States
  const [currentZoomLevel, setCurrentZoomLevel] = React.useState<number>(1);
  const [message, setMessage] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentHighlightColor, setCurrentHighlightColor] = React.useState<string>("red");
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [gotoPage, setGotoPage] = React.useState<number>(1);
  let noteId = notes.length;
  const lastPageRead = localStorage.getItem("current-page") ?? 0;
  const initialPage = localStorage.getItem("current-page") ? parseInt(lastPageRead as string, 10) : 0;
  //#endregion

  //#region Effects
  React.useEffect(() => {
    zoomTo(currentZoomLevel);
  }, [currentZoomLevel]);

  //#endregion

  const noteEles: Map<number, HTMLElement> = new Map();

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
    return (
      <div
        style={{
          background: "#eee",
          display: "flex",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          transform: "translate(0, 8px)",
          zIndex: 1,
          WebkitTouchCallout: "none",
        }}
      >
        <Tooltip
          position={Position.TopCenter}
          target={
            // <Button onClick={props.toggle}>
            //   <MessageIcon />
            // </Button>
            <button onClick={props.toggle}>
              <MessageIcon />
            </button>
          }
          content={() => <div style={{ width: "100px" }}>Add a note</div>}
          offset={{ left: 0, top: -8 }}
        />
      </div>
    );
  };

  const renderHighlightContent = (props: RenderHighlightContentProps) => {
    const addNote = () => {
      const note: Note = {
        id: ++noteId,
        content: message,
        highlightAreas: props.highlightAreas,
        quote: props.selectedText,
        color: currentHighlightColor,
      };
      setNotes(notes.concat([note]));
      props.cancel();
    };

    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 1,
        }}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  };

  const jumpToNote = (note: Note) => {
    if (noteEles.has(note.id)) {
      noteEles.get(note.id)?.scrollIntoView();
    }
  };

  const filteredNotes = selectedColor === "all" || selectedColor === "" ? notes : notes.filter((note) => note.color === selectedColor);

  const renderHighlights = (props: RenderHighlightsProps) => {
    return (
      <div>
        {filteredNotes.map((note) => (
          <React.Fragment key={note.id}>
            {note.highlightAreas
              .filter((area) => area.pageIndex === props.pageIndex)
              .map((area, idx) => (
                <div
                  key={idx}
                  style={Object.assign(
                    {},
                    {
                      background: note.color,
                      opacity: 0.4,
                    },
                    props.getCssProperties(area, props.rotation)
                  )}
                  onClick={() => {
                    jumpToNote(note);
                  }}
                  ref={(ref): void => {
                    noteEles.set(note.id, ref as HTMLElement);
                  }}
                />
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  const handlePageChange = (e: PageChangeEvent) => {
    localStorage.setItem("current-page", `${e.currentPage}`);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#eeeeee",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "flex-start",
          padding: "4px",
        }}
      >
        {/* Page Info */}
        <div style={{ minWidth: 90 }}>
          <CurrentPageLabel>
            {(props: RenderCurrentPageLabelProps) => {
              return <span>{`${props.currentPage}/${props.numberOfPages}`}</span>;
            }}
          </CurrentPageLabel>
        </div>
        {/* GoToFirstPage */}
        <div style={{ padding: "0 2px" }}>
          <GoToFirstPage>
            {(props: RenderGoToPageProps) => (
              <button
                style={{
                  backgroundColor: "#357edd",
                  border: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                  cursor: "pointer",
                  padding: "8px",
                }}
                onClick={props.onClick}
              >
                {">>"}
              </button>
            )}
          </GoToFirstPage>
        </div>
        {/* GoToPreviousPage */}
        <div style={{ padding: "0 2px" }}>
          <GoToPreviousPage>
            {(props: RenderGoToPageProps) => (
              <button
                style={{
                  backgroundColor: props.isDisabled ? "#96ccff" : "#357edd",
                  border: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                  cursor: props.isDisabled ? "not-allowed" : "pointer",
                  padding: "8px",
                }}
                disabled={props.isDisabled}
                onClick={props.onClick}
              >
                {"<"}
              </button>
            )}
          </GoToPreviousPage>
        </div>
        {/* GoToNextPage */}
        <div style={{ padding: "0 2px" }}>
          <GoToNextPage>
            {(props: RenderGoToPageProps) => (
              <button
                style={{
                  backgroundColor: props.isDisabled ? "#96ccff" : "#357edd",
                  border: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                  cursor: props.isDisabled ? "not-allowed" : "pointer",
                  padding: "8px",
                }}
                disabled={props.isDisabled}
                onClick={props.onClick}
              >
                {">"}
              </button>
            )}
          </GoToNextPage>
        </div>
        {/* GoToLastPage */}
        <div style={{ padding: "0 2px" }}>
          <GoToLastPage>
            {(props: RenderGoToPageProps) => (
              <button
                style={{
                  backgroundColor: "#357edd",
                  border: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                  cursor: "pointer",
                  padding: "8px",
                }}
                onClick={props.onClick}
              >
                {"<<"}
              </button>
            )}
          </GoToLastPage>
        </div>
        <span>||</span>
        {/* Zoom In */}
        <div style={{ padding: "0 2px" }}>
          <button
            style={{
              backgroundColor: "#357edd",
              border: "none",
              borderRadius: "4px",
              color: "#ffffff",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => setCurrentZoomLevel((prev) => prev + 0.05)}
          >
            {"+"}
          </button>
        </div>
        {/* Zoom Label */}
        <div style={{ padding: "0px 2px" }}>
          <CurrentScale>{(props: RenderCurrentScaleProps) => <>{`${Math.round(props.scale * 100)}%`}</>}</CurrentScale>
        </div>
        {/* Zoom Out */}
        <div style={{ padding: "0 2px" }}>
          <button
            style={{
              backgroundColor: "#357edd",
              border: "none",
              borderRadius: "4px",
              color: "#ffffff",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => setCurrentZoomLevel((prev) => prev - 0.05)}
          >
            {"-"}
          </button>
        </div>

        <span>||</span>
        <div style={{ padding: "0 2px" }}>
          <select value={currentHighlightColor} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentHighlightColor(e.target.value)}>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        <span>||</span>
        {/* Page Navigation */}
        <div style={{ padding: "0 2px" }}>
          <button
            style={{
              backgroundColor: "#357edd",
              border: "none",
              borderRadius: "4px",
              color: "#ffffff",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => jumpToPage(gotoPage)}
          >
            {"Go to"}
          </button>
          <input
            type="number"
            style={{ width: 50, marginLeft: 10 }}
            value={gotoPage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGotoPage(parseInt(e.target.value))}
          />
        </div>
        <span>||</span>
        <div style={{ padding: "0 2px" }}>
          <select value={selectedColor} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedColor(e.target.value)}>
            <option value="">Select Color</option>
            <option value="all">All</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
      </div>
      {/* Viewer */}
      {/* <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Viewer
          fileUrl={fileUrl}
          defaultScale={currentZoomLevel}
          plugins={[pageNavigationPluginInstance, zoomPluginInstance, customZoomPluginInstance]}
        />
      </div> */}
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.3)",
            width: "25%",
            overflow: "auto",
          }}
        >
          {filteredNotes.length === 0 && <div style={{ textAlign: "center" }}>There is no note</div>}
          {filteredNotes.map((note) => {
            return (
              <div
                key={note.id}
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, .3)",
                  cursor: "pointer",
                  padding: "8px",
                  background: note.color,
                  opacity: 0.7,
                }}
                // Jump to the associated highlight area
                onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
              >
                <blockquote
                  style={{
                    borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
                    fontSize: ".75rem",
                    lineHeight: 1.5,
                    margin: "0 0 8px 0",
                    paddingLeft: "8px",
                    textAlign: "justify",
                  }}
                >
                  {note.quote}
                </blockquote>
                {note.content}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: "1 1 0",
            overflow: "auto",
          }}
        >
          <Viewer
            fileUrl={fileUrl}
            defaultScale={currentZoomLevel}
            initialPage={initialPage}
            plugins={[pageNavigationPluginInstance, zoomPluginInstance, customZoomPluginInstance, highlightPluginInstance, bookmarkPluginInstance]}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizedExample;
