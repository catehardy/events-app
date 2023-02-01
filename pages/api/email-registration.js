import path from "path";
import fs from "fs";

// Locate and access our data (data.json)
function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

// Extract required data by reading db (AllEvents)
function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  // 404 if there are no AllEvents
  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: "Events data not found",
    });
  }

  if (method === "POST") {
    // extract user email and event id from the request body
    const { email, eventId } = req.body;

    if (!email | !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    // loop through allEvents and identify the EventId
    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        // check whether that email already exists in the db for this event
        if (ev.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: "This email has already been registered" });
          return ev;
        }
        // add the new email into emails_registered
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    });

    // update our database (data.json)
    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have been registered successfully with email: ${email}`,
    });
  }
}
