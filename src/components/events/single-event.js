import React from "react";
import Image from "next/image";

const SingleEvent = ({ data }) => {
  return (
    <div>
      <Image alt={data.title} src={data.image} width={950} height={700}></Image>
      <h1>{data.title}</h1>
      <p>{data.description}</p>

      <input type="email" />
      <button>Submit</button>
    </div>
  );
};

export default SingleEvent;
