import React from "react";

const TicketButtons = ({ startTicket, endTicket, soldTickets, isTimeExpired, selectedTickets, handleTicketSelection }) => {
  return (
    <div className="grid grid-cols-10 gap-1 mb-4">
      {Array.from({ length: endTicket - startTicket + 1 }, (_, i) => {
        const ticketNumber = startTicket + i;
        return (
          <button
            key={ticketNumber}
            className={`p-1 text-xs rounded ${
              soldTickets.includes(ticketNumber)
                ? "bg-red-300 cursor-not-allowed"
                : isTimeExpired
                ? "bg-green-100 cursor-not-allowed"
                : selectedTickets.includes(ticketNumber)
                ? "bg-blue-600 text-white"
                : "bg-green-100 hover:bg-blue-100"
            }`}
            onClick={() => !isTimeExpired && !soldTickets.includes(ticketNumber) && handleTicketSelection(ticketNumber)}
            disabled={isTimeExpired || soldTickets.includes(ticketNumber)}
          >
            {ticketNumber}
          </button>
        );
      })}
    </div>
  );
};

export default TicketButtons;