import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins, deleteCabin } from "../services/apicabins";
import supabase from "../services/supabase";

// ---------------- STYLES ----------------
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background: var(--color-grey-200);
  font-weight: 600;
  font-size: 14px;
  color: #374151;
`;

const Td = styled.td`
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-grey-800);
  border-right: 1px solid darkgrey;

  &:first-child {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const Price = styled.span`
  font-weight: 600;
  color: #111827;
`;

const Discount = styled.span`
  color: var(--color-green-700);
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

// ---------------- COMPONENT ----------------
function Cabins() {
  const [cabins, setCabins] = useState([]);

  // Load cabins initially
  useEffect(() => {
    getCabins().then((data) => {
      if (data) setCabins(data);
    });
  }, []);

  // Listen to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel("cabins-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cabins" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCabins((prev) => [...prev, payload.new]);
          }
          if (payload.eventType === "UPDATE") {
            setCabins((prev) =>
              prev.map((cabin) =>
                cabin.id === payload.new.id ? payload.new : cabin
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setCabins((prev) =>
              prev.filter((cabin) => cabin.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔥 Delete handler
  async function handleDelete(id) {
    try {
      await deleteCabin(id); // calls API
      // No need to manually update state — realtime subscription will remove it
    } catch (error) {
      console.error("Error deleting cabin:", error);
    }
  }

  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p style={{ cursor: "pointer", color: "#6b7280" }}>Filter / Sort</p>
      </Row>

      <Table>
        <thead>
          <tr>
            <Th>Cabin</Th>
            <Th>Capacity</Th>
            <Th>Price</Th>
            <Th>Discount</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {cabins && cabins.length > 0 ? (
            cabins.map((cabin) => (
              <tr key={cabin.id}>
                <Td>
                  <Img
                    src={cabin.image || "/placeholder.jpg"}
                    alt={cabin.name || "No name"}
                  />
                  <span>{cabin.name || "Unnamed cabin"}</span>
                </Td>
                <Td>
                  Fits up to {cabin.maxCapacity || "?"} guests
                </Td>
                <Td>
                  <Price>${cabin.regularPrice || 0}.00</Price>
                </Td>
                <Td>
                  <Discount>${cabin.discount || 0}.00</Discount>
                </Td>
                <Td>
                  <DeleteBtn onClick={() => handleDelete(cabin.id)}>
                    Delete
                  </DeleteBtn>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5">No cabins found</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Cabins;
