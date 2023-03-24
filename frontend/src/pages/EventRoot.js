import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export default function EventRootLayout() {
  return (
    <>
      {/* <div>EventRootLayout</div> */}
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
