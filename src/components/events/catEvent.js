import React from "react";
import Link from "next/link";
import Image from "next/image";

const CatEvent = ({data, pageName}) => {
  return (
    <div className="cat_events">
      <h1>{`Events in ${pageName}`}</h1>

      <div className="content">
        {data.map((ev) => (
          <Link className="card" key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} height={300} width={300} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatEvent;
