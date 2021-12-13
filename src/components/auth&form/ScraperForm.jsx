import React, { Fragment, useState } from "react";
import Button from "../Buttons&checks/Button";
import { useForm } from "react-hook-form";
import { setScraperCredentials } from "../../actions/auth";

function ScraperForm() {
  const [showScraperCredentials, setShowScraperCredentials] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await setScraperCredentials(data);

    reset();
  };

  return (
    <Fragment>
      <Button
        onClick={() => setShowScraperCredentials((prev) => !prev)}
        type="rounded-outline"
        style={{
          fontSize: "1em",
          position: "absolute",
          right: "15rem",
        }}
      >
        Scraper Credentials
      </Button>
      {showScraperCredentials ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            position: "absolute",
            right: "14rem",
            top: "5rem",
          }}
          className="form"
        >
          <div
          // style={{
          //   position: "relative",
          //   right: "-20rem",
          //   display: "flex",
          //   flexDirection: "column",
          // }}
          >
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <input
              type="text"
              placeholder="Enter password"
              {...register("password")}
            />
            <input type="submit" />
          </div>
        </form>
      ) : null}
    </Fragment>
  );
}

export default ScraperForm;
