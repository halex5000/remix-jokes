import { Link, useLoaderData } from '@remix-run/react';
import { json } from 'react-router';
import {db} from '~/utils/db.server'

export const loader = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  console.log('random row number:', randomRowNumber);
  
  const [joke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber
  })

  console.log('random joke', joke);

  return json({
    joke
  })
}

export default function JokesIndexRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}