// import styled from "styled-components";
// import { useQuery } from "@tanstack/react-query";
// import { getCabins } from "../services/apiCabins";
// import Spinner from "../ui/Spinner";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


// function CabinTable() {
//   const {
//     data: cabins, 
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["cabins"], 
//     queryFn: getCabins,  
//   });

//   if (isLoading) return <Spinner />;
//   if (error) return <p className="text-red-500">Error: {error.message}</p>;

//   return (
//     <div role="table" className="grid gap-2">
//       <div role="row" className="grid grid-cols-6 font-bold border-b pb-2">
//         <div>Image</div>
//         <div>Name</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div>Actions</div>
//       </div>

//       {cabins.map((cabin) => (
//         <div
//           key={cabin.id}
//           role="row"
//           className="grid grid-cols-6 items-center border-b py-2"
//         >
//           <img src={cabin.image} alt={cabin.name} className="w-16 h-16 object-cover" />
//           <div>{cabin.name}</div>
//           <div>{cabin.maxCapacity}</div>
//           <div>${cabin.regularPrice}</div>
//           <div>{cabin.discount ? `-${cabin.discount}` : "0"}</div>
//           <button className="text-red-500">Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CabinTable;
