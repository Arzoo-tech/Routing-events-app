import { useEffect, useState } from "react";
import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function EventsPage() {
  
  //technically this loader function will return a promise but useLoaderData will always return the final data only
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

//loader component here is used to provide data to the route element before it renders so that it takes less time in fetching

export async function loader() {
  //we can't use react hooks in loader functions but we can use browser apis here

  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Can't fetch events" };  OR----
    // throw { message: "Can't fetch events" };  OR----

    // throw new Response(JSON.stringify({ message: "Can't fetch events" }), {
    //   status: 500,
    // }); OR -------

    return json({ message: "Can't fetch events" }, { status: 500 });
  } else {
    //instead of extracting data manually we can directly rely on the variable where we are storing fetch promise to extract data for us
    // const resData = await response.json();
    return response;
  }
}
//Downside to using loader can be inactivity of page while the data is getting fetched since the data isn't yet loaded
//for which we can use useNavigation.state and see if the loader is still fetching the data and show a loading indicator on the page user is currently at
