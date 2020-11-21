import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_CHARACTERS = gql`
  query {
    characters {
      name
      job
      planet {
        name
      }
    }
  }
`;

export default function CharactersList() {
  const { loading, err, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error : {err}(</p>;

  console.log(data);

  return (
    <div>
      <ul id="character-list">
        {data.characters.map(({ name, job, planet }) => (
          <li key={name}>Name: {name} Job: {job} Planet: {planet.name}</li>
        ))}
      </ul>
    </div>
  );
}