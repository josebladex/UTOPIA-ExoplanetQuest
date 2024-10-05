import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen p-11 flex items-center justify-center">
  
   <iframe
        id="orbitViewerContainer"
        style={{ width: "900px", height: "600px", border: "0px" }}
        allowFullScreen
        src="/orbits/orbit.html" 
      ></iframe>
    </div>
  );
}
