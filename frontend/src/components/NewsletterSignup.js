import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    //Here,we can use router form but this is visible on all routes because this is part of main navigation,
    //so action will be targeted and clashing with all router
    //therefore, we can utilize useFetcher's form object and can be used without navigating to the action's page

    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
