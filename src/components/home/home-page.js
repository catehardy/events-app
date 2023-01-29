import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export const HomePage = ({ data }) => {
  return (
    <main className={styles.main}>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`}>
          <Image src={ev.image} alt={ev.title} width={300} height={300} />
          <h2>{ev.title}</h2>
          <p>{ev.description}</p>
        </Link>
      ))}
    </main>
  );
};
