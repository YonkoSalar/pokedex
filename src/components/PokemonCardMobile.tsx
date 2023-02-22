import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

function PokemonCardMobile(props: any) {

    // State to track if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Define the modal transition animation
  const modalTransition = useTransition(isModalOpen, {
    from: { opacity: 0, transform: "translateY(0%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(100%)" },
  });

  return (
    <div className="fixed right-0 left-0 bottom-0">
      <button onClick={handleModalOpen}>Open Modal</button>
      {modalTransition( ({ item, key, props }) =>
          isModalOpen && (
            <animated.div key={key} style={props}>
              <div className="modal bg-white shadow-lg rounded-t-lg overflow-hidden">
                <div className="modal-content p-4">
                  <h2 className="font-bold text-lg mb-2">Modal Title</h2>
                  <p>Modal content goes here.</p>
                  <button onClick={handleModalClose}>Close Modal</button>
                </div>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
}

export default PokemonCardMobile;
