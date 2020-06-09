import React from "react";
import { List, Header, Rating } from "semantic-ui-react";

export const Names = ({ names }) => {
  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);   
  console.log("In here");
  console.log(names);
  // var i = 1
  return (
    <List>
      {names.map((name) => {
          // i+=1;
          // console.log(i);
          
        return (
          <List.Item key={name+rand}>
            <Header>{name}</Header>
          </List.Item>
        );
      })}
    </List>
  );
};
