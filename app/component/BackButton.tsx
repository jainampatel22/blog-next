// "use client"
// import { useRouter } from "next/router";

// interface BackButtonProps {
//   onBack?: () => void;
// }

// const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
//   const router = useRouter();

//   const handleBack = () => {
//     if (onBack) {
//       onBack(); // Execute the custom back handler passed as a prop
//     } else {
//       router.back(); // Default to router's back function
//     }
//   };

//   return (
//     <button
//       className="mb-4 group"
//       onClick={handleBack}
//     >
//       Go Back
//     </button>
//   );
// };

// export default BackButton;
