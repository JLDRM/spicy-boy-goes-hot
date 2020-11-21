import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useForm } from "react-hook-form";

const ADD_CHARACTER = gql``;

export default function addCharacterForm() {
  const { loading, err, data } = useQuery(GET_CHARACTERS);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => { console.log(data) }

  return (
     <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue="test" ref={register} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input name="job" ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}
