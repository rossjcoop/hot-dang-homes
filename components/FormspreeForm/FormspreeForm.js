"use client"

import { ValidationError, useForm } from "@formspree/react";
import { Input } from "components/Input";


export const FormspreeForm = ( { formId }) => {
    console.log("FORM ID: ", formId);
    const [state, handleSubmit] = useForm("mzbnpqre");
  if (state.succeeded) {
      return <p className="max-w-5xl mx-auto my-5">Thanks for joining!</p>;
  }
  return (
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto my-5">
      <label htmlFor="email">
        Email Address
      </label>
      <Input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
        className="border-slate-400 p-1 hover:border-slate-500"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <div>
        <button className="btn" type="submit" disabled={state.submitting}>
            Submit
        </button>
      </div>
    </form>
  );
};