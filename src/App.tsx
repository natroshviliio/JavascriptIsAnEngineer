import { useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState<{ name: string; type: string }[]>([]);

    const getData = () => {
        window.ipcRenderer.getData().then((data) => {
            setData(data);
            console.log(data);
        });
    };

    const openPath = (path: string) => {
        window.ipcRenderer.openPath(path);
    };

    // const openFolder = () => {
    //     window.ipcRenderer.openFolder();
    // };

    return (
        <div className="p-5">
            <button
                className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 px-7 py-2 rounded-md text-neutral-900 cursor-pointer"
                onClick={getData}>
                Check Directory
            </button>

            <div className="grid grid-cols-4 gap-x-2 gap-y-2 mt-4">
                {data.map((d) => {
                    return (
                        <button
                            className={`${
                                d.type === "Directory"
                                    ? "bg-red-400 hover:bg-red-300 active:bg-red-500"
                                    : "bg-amber-600 hover:bg-amber-500 active:bg-amber-700"
                            } px-3 py-2 rounded-md cursor-pointer`}
                            onClick={() => openPath(d.name)}>
                            {d.name} [{d.type}]
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
