import React, { Suspense } from "react";
import {
  useLoaderData,
  Await,
  useRouteLoaderData,
  json,
  redirect,
  defer,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  // const params = useParams();

  //useLoaderData only sends data from same level of route
  // const data = useLoaderData();

  //useRouteLoaderData will help us get data available at event detail level route
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      {/*  -----------Without defer-------------------  */}
      {/* <EventItem event={data.event} /> */}

      {/*------------- With defer------------------ */}
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvent) => <EventItem events={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected events" },
      { status: 500 }
    );
  } else {
    return response;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch events.",
      },
      {
        //   status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
//using async loader so that defer can wait until we have loaded the event details of the event that user clicked on completely before going to the event detail page
export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    //---if we want to load the component even when data isn't there,we use this method--
    // events: loadEvents(),
    // event: loadEvent(id),

    //but,if we want to load the component only when data is there,we use this "await"( along with async keyword at before loader function)--
    event: await loadEvents(),
    events: loadEvent(id),
  });
}

export async function action({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    // method:'DELETE'  OR----
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
