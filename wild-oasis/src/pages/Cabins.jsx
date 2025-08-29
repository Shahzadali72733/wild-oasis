import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCabins, deleteCabin } from "../services/apicabins";
import toast from "react-hot-toast";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Row from '../ui/Row';

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ---------------- SPINNER ----------------
const SpinnerWrapper = styled.div`
  font-size: 20px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

const Blade = styled.div`
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.0555em;
  background-color: transparent;
  transform-origin: center -0.2222em;
  animation: spinner-fade9234 1s infinite linear;

  @keyframes spinner-fade9234 {
    0% {
      background-color: #69717d;
    }
    100% {
      background-color: transparent;
    }
  }
`;

function Spinner() {
  return (
    <SpinnerWrapper>
      {Array.from({ length: 12 }).map((_, i) => (
        <Blade
          key={i}
          style={{
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${i * 0.083}s`,
          }}
        />
      ))}
    </SpinnerWrapper>
  );
}

// ---------------- COMPONENT ----------------
function Cabins() {
  const [cabins, setCabins] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
const [showForm , setShowForm] = useState(false);

  useEffect(() => {
    async function loadCabins() {
      try {
        const data = await getCabins();
        setCabins(data);
      } catch (err) {
        console.error("Error loading cabins:", err);
        toast.error("Failed to load cabins");
      }
    }
    loadCabins();
  }, []);

  // Delete cabin
  async function handleDelete(id) {
    try {
      setLoadingId(id);
      await deleteCabin(id);
      setCabins((prev) => prev.filter((cabin) => cabin.id !== id));
      toast.success("Cabin deleted successfully!");
    } catch (error) {
      console.error("Error deleting cabin:", error);
      toast.error("Failed to delete cabin. Please try again.");
    } finally {
      setLoadingId(null);
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
                <Td>Fits up to {cabin.maxCapacity || "?"} guests</Td>
                <Td>
                  <Price>${cabin.regularPrice || 0}.00</Price>
                </Td>
                <Td>
                  <Discount>${cabin.discount || 0}.00</Discount>
                </Td>
                <Td>
                  <DeleteBtn
                    onClick={() => handleDelete(cabin.id)}
                    disabled={loadingId === cabin.id}
                  >
                    {loadingId === cabin.id ? <Spinner /> : "Delete"}
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
      </Table >
     <Button onClick={()=> setShowForm((show)=>
      !show)}>
          Add Cabin
        </Button>
        {showForm && <CreateCabinForm />}
    </div>
  );
}

export default Cabins;



