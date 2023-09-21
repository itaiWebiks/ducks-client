import React, { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import BasicTable from "./app/common/BasicTable.tsx";
import { useDispatch } from "react-redux";
import {
  Duck,
  add as addDuck,
  addMulti as addMultiDucks,
} from "./features/ducks/ducksSlice.ts";
import {
  Rabbit,
  add as addRabbit,
  addMulti as addMultiRabbits,
} from "./features/rabbits/rabbitsSlice.ts";
import io from "socket.io-client";
import MapComponent from "./app/common/mapComponent.tsx";
import MapDialog from "./app/common/Dialog.tsx";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "./app/store.ts";
import SnackBar from "./app/common/SnackBar.tsx";
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App: React.FC<{}> = () => {
  const ducks = useAppSelector((state) => state.ducks);
  const rabbits = useAppSelector((state) => state.rabbits);
  // const [color, setColor] = useState("");
  const [isDucks, setIsDucks] = useState(true);
  const dispatch = useDispatch();

  // const openSnack=(setOpen: React.Dispatch<React.SetStateAction<boolean>>)=>{
  //   setOpen(true)
  // }
  const [openSnack, setOpenSnack] = useState(false);
  const [SnackMessage, setSnackMessage] = useState("");
  const handleOpen = () => {
    setOpenSnack(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnack(false);
  };

  const updateSlice = (obj: Duck | Rabbit | {}) => {
    // console.log(obj);
    const socket = io("http://localhost:3001");
    if (isDucks && Object.keys(obj).length == 4) {
      socket.emit("addToTable", {
        obj,
        tableName: "ducks",
      });
      socket.on("addSuccess", (data: any) => {
        console.log(data);
        dispatch(addDuck(data));
      });
    } else if (!isDucks && Object.keys(obj).length == 3) {
      socket.emit("addToTable", {
        obj,
        tableName: "rabbits",
      });
      socket.on("addSuccess", (data: any) => {
        console.log(data);
        dispatch(addRabbit(data));
      });
      socket.on("addError", (message: string) => {
        setSnackMessage(message);
        handleOpen();
      });
    } else {
      setSnackMessage("fill all sections to insert");
      handleOpen();
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.emit("getDucks");
    socket.on("ducks", (data: any) => {
      console.log(data);
      dispatch(addMultiDucks(data));
    });
    socket.emit("getRabbits");
    socket.on("rabbits", (data: any) => {
      console.log(data);
      dispatch(addMultiRabbits(data));
    });
    return () => {
      console.log("disconnected");
      socket.disconnect();
    };
  }, []);

  const locations: { color: string; location: [number, number] }[] = ducks.map(
    ({ color, longitude, latitude }) => ({
      color,
      location: [longitude, latitude],
    })
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setIsDucks(!isDucks)}>
          change to {isDucks ? "rabbits" : "ducks"}
        </button>
        <BasicTable add={updateSlice} data={isDucks ? ducks : rabbits} />
        <MapDialog>
          <MapComponent
            locations={locations}
            initialCoordinates={[34.794793, 32.07567]}
          />
        </MapDialog>
      </div>

      <SnackBar
        open={openSnack}
        onClose={handleSnackbarClose}
        vertical="top"
        horizontal="center"
        message={SnackMessage}
      ></SnackBar>
    </>
  );
};

export default App;
