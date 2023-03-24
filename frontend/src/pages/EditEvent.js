import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {
  //useLoaderData only sends data from same level of route
  // const data = useLoaderData();

  //useRouteLoaderData will help us get data available at event detail level route
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventForm event={data.event} method="PATCH" />
    </>
  );
}
