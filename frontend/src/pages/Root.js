import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  //Downside to using loader can be inactivity of page while the data is getting fetched since the data isn't yet loaded
  //for which we can use useNavigation.state and see if the loader is still fetching the data and show a loading indicator
  //on the page user is currently at which will look like line-10 and 15

  // const navigate = useNavigate();
  return (
    <>
      <MainNavigation />
      <main>
        {/* {NavigationPreloadManager.state === "loading" && <p>loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
