import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import html2canvas from "html2canvas";
import "react-resizable/css/styles.css"; // Ensure ResizableBox styles are imported
import "./DragDrop.css";
const DragDrop = () => {
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const tShirtRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  // Capture final image
  const handleCapture = () => {
    if (tShirtRef.current) {
      html2canvas(tShirtRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "tshirt-design.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className="tshirt-designer flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">T-Shirt Designer</h1>
      <div className="flex  gap-10">
        <div
          ref={tShirtRef}
          className="relative w-[400px] h-[500px]  border-[1px] border-gray-400 t-shirt"
        >
          {logo && (
            <Draggable>
              <div className="absolute">
                <ResizableBox
                  width={logoSize.width}
                  height={logoSize.height}
                  lockAspectRatio
                  resizeHandles={["se"]}
                  onResizeStop={(_, data) =>
                    setLogoSize({
                      width: data.size.width,
                      height: data.size.height,
                    })
                  }
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </ResizableBox>
              </div>
            </Draggable>
          )}
        </div>
        <div className="flex justify-between flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="mb-4"
          />

          <button
            onClick={handleCapture}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
