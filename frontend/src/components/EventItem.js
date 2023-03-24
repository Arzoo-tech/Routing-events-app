import classes from "./EventItem.module.css";
import { Link, useSubmit } from "react-router-dom";

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (proceed) {
      console.log("deleted");
      //usesubmit hook has following syntax--
      //first argument has data wrapped in form data object {} that we wanna submit
      //second argument object allows us to set the values that can be set on form in action
      //this includes "method property" and action url if url is not base url
      //---eg---- submit({},{method:'delete',action:'a/different=-path'})

      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
