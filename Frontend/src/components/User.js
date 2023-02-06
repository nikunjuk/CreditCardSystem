import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { luhn } from "luhn";

export default function User() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardLimit, setCardLimit] = useState(0);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = () => {
    axios.get(`http://localhost:9000/api/v1/user/getAll`).then((response) => {
      console.log(response.data);
      setAPIData(response.data.data);
    });
  };

  const postData = () => {
    if (name != "" && cardNumber != "" && cardLimit != "") {
      if (cardNumber.length < 16 || cardNumber.length > 19) {
        toast({
          type: "error",
          title: "Card should be more than 16 and less than 19 in length",
          time: 3000,
        });
        return;
      }
      if (cardLimit != 0) {
        toast({
          type: "error",
          title: "Initial card balance should be 0",
        });
        setCardLimit(0);
        return;
      }
      axios
        .post(`http://localhost:9000/api/v1/user/addUser`, {
          name,
          cardNumber,
          cardLimit,
        })
        .then((response) => {
          if (response.data.code == 400) {
            toast({
              type: "error",
              title: response.data.message,
            });
          } else if (response.data.code == 200) {
            setName("");
            setCardNumber("");
            setCardLimit("");
          }
          getAPIData();
        });
    }
  };

  const onDelete = (id) => {
    axios
      .post(`http://localhost:9000/api/v1/user/delete`, { id })
      .then((response) => {
        console.log("response", response.data);
        if (response.data.code == 400) {
          toast({
            type: "error",
            title: response.data.message,
          });
        }
        getAPIData();
      });
  };

  //   const setData = (data) => {
  //     let { id, firstName, lastName, checkbox } = data;
  //     localStorage.setItem("ID", id);
  //     localStorage.setItem("First Name", firstName);
  //     localStorage.setItem("Last Name", lastName);
  //     localStorage.setItem("Checkbox Value", checkbox);
  //   };

  return (
    <div>
      <SemanticToastContainer />
      <Form className="create-form">
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Card Number</label>
          <input
            placeholder="Card Number"
            onChange={(e) => setCardNumber(e.target.value)}
            required
            minLength="16"
            maxLength="19"
            type="number"
          />
        </Form.Field>
        <Form.Field>
          <label>Card Limit</label>
          <input
            placeholder="Card Limit"
            onChange={(e) => setCardLimit(e.target.value)}
            required
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Card Number</Table.HeaderCell>
            <Table.HeaderCell>Card Limit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData &&
            APIData?.map((data) => {
              return (
                <Table.Row key={data._id}>
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>{data.cardNumber}</Table.Cell>
                  <Table.Cell>{data.cardLimit}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data._id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}
