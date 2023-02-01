import React, {useRef, useState} from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const SingleEvent = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = router?.query.id;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        // check for invalid email entry
        if(!emailValue.match(validRegex)) {
            setMessage("Please enter a valid email address")
        }

        try {
            // POST fetch request to our API endpoint
            // This sends data to the server - in this case:
                // - the value of the email entered by user
                // - the eventId of the page which the email was entered on
            const response = await fetch("/api/email-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: emailValue, eventId: eventId})
            });

            if(!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            // let user know their email has been successfully registered
            setMessage(data.message);
            // reset input field
            inputEmail.current.value = "";

        } catch (e) {
            console.log("ERROR: ", e)
        }
    };
  return (
    <div className="event_single_page">
      <h1>{data.title}</h1>
      <Image alt={data.title} src={data.image} width={950} height={700}></Image>
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Get registered for this event!</label>
        <input ref={inputEmail} type="email" id="email" placeholder="Please add your email here" />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
