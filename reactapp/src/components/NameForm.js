import React, { useState } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export const NameForm = ({ onNewName }) => {
  const [name, setName] = useState("");
  const [temprature, setTemprature] = useState(1);

  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="Name starts with..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
                <Rating icon='star' rating={temprature} maxRating={5} onRate={(_, data)=>{
                    setTemprature(data.rating);
                }}/>
            </Form.Field>

      <Form.Field>
        <Button
          onClick={async () => {
            console.log(name, temprature);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ name: name, temprature: temprature });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            const response = await fetch("/get_name", requestOptions)
              .then((response) => response.text())
              .then(function (result) {
                result = JSON.parse(result);
                console.log("response Worked");
                // console.log(name);
                onNewName(result.predicted_name);
                //   onNewMovie(movie);
                setName("");
                setTemprature(1);
                console.log(result);
                // console.log(typeof result);
                // console.log(JSON.parse(result));
                
                
              })
              .catch((error) => console.log("error", error));

            // const movie = { title, rating };
            // const response = await fetch("/get_name", {
            //   method: "GET",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   headers: JSON.stringify({ name: name, temprature: temprature }),
            //   //   body: JSON.stringify(movie),
            // });
            // if (response.ok) {
            //   console.log("response Worked");
            //   console.log(name);
            //   onNewName(name);
            //   //   onNewMovie(movie);
            //   setName("");
            //   setTemprature(1);
            // }
          }}
        >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};
