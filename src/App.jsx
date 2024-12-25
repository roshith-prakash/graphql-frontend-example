import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

// ----------------------------------------

// GQL queries

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const getUserById = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

// ----------------------------------------

// GQL Mutations

const createUserMutation = gql`
  mutation ($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      email
      id
      name
    }
  }
`;

const deleteUserMutation = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      email
      id
      name
    }
  }
`;

// ----------------------------------------

function App() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  // Get Multiple Users
  const { data } = useQuery(getUsers);

  // Get Single user
  const { data: idUser } = useQuery(getUserById, {
    variables: { id: "676418e69b6bcfe5268ec0c7" },
  });

  // Create New User
  const [createUser, { data: createdUser }] = useMutation(createUserMutation);

  // Delete User
  const [deleteUser, { data: deletedUser }] = useMutation(deleteUserMutation);

  // Function to create a user
  const handleCreateUser = async () => {
    createUser({ variables: { name: name, email: email } });
  };

  // Function to delete a user
  const handleDeleteUser = async () => {
    deleteUser({ variables: { id: id } });
  };

  return (
    <>
      <h1>Users</h1>

      {/* All Users */}
      <div>
        {data &&
          data?.users?.map((item) => {
            return (
              <div
                key={item?.email}
                style={{ border: "1px solid", paddingLeft: "1rem" }}
              >
                <p> ID : {item?.id}</p>
                <p> Name : {item?.name} </p>
                <p> Email : {item?.email} </p>
              </div>
            );
          })}
      </div>

      {/* Single User */}
      <div style={{ marginTop: "5rem ", border: "1px solid", padding: "1rem" }}>
        {idUser && (
          <>
            <h3>Selected User :</h3>
            <p>ID: {idUser?.user?.id}</p>
            <p>Name: {idUser?.user?.name}</p>
            <p>Email: {idUser?.user?.email}</p>
          </>
        )}
      </div>

      {/* Create User */}
      <div style={{ marginTop: "5rem ", border: "1px solid", padding: "1rem" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <button onClick={handleCreateUser}>Create User</button>

        {createdUser && (
          <>
            <h3>Created User :</h3>
            <p>ID: {createdUser?.createUser?.id}</p>
            <p>Name: {createdUser?.createUser?.name}</p>
            <p>Email: {createdUser?.createUser?.email}</p>
          </>
        )}
      </div>

      {/* Delete User */}
      <div style={{ marginTop: "5rem ", border: "1px solid", padding: "1rem" }}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>

        <button onClick={handleDeleteUser}>Delete User</button>

        {deletedUser && (
          <>
            <h3>Deleted User :</h3>
            <p>ID: {deletedUser?.deleteUser?.id}</p>
            <p>Name: {deletedUser?.deleteUser?.name}</p>
            <p>Email: {deletedUser?.deleteUser?.email}</p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
