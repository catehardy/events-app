import Image from "next/image";
import Link from "next/link";

const EventsCatPage = ({ data, pageName }) => {
  return (
    <div>
      <h1>{`Events in ${pageName}`}</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} height={300} width={300} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

// The getStaticProps() function can accept a context object, which can be used to generate dynamic pages
export async function getStaticProps(context) {
  // here we save the cat(egory) property of context.param(eters) as 'id'
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  // here we create an array of events where id (in this case, the city searched by the user) matches the city property in our allEvents database, which we accessed and stored above
  const data = allEvents.filter((ev) => ev.city === id);
  // here we return that array as props for the EventsCatsPage component to use when rendering its content
  return {
    props: { data, pageName: id },
  };
}
