import React from 'react';

const Create =({ add, placeholder}) => {
  let input;

  return(
    <form
      onSubmit={e => {
        e.preventDefault();
        add(input.value)
        input.value =null;
      }}
    >
      <input
        placeholder={placeholder}
        ref={ n => input = n }
        required
      />
    </from>
  )
}

export default Create;