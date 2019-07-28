import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styled from "styled-components";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  hidden: {
    opacity: 0
  }
};

const items = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 }
};

const Events = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Event = styled(motion.div)`
  max-width: 960px;
`;

const EventTitle = styled.h2`
  font-weight: 300;
  text-transform: capitalize;
  flex: 0.3;
`;

const EventDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const EventList = ({ events }) => {
  return (
    <>
      {events.length > 0 ? (
        <Events animate="visible" initial="hidden" variants={list}>
          {events.map((event, i) => (
            <Event
              variants={items}
              key={event.id}
              animate="visible"
              initial="hidden"
            >
              <EventDetails>
                <EventTitle>
                  <Link to={`/teams/${event.team}/events/${event.id}`}>
                    {event.name}
                  </Link>
                </EventTitle>
                <EventTitle>{format(new Date(event.date), "P p")}</EventTitle>
                <button color="secondary">Delete</button>
              </EventDetails>
            </Event>
          ))}
        </Events>
      ) : (
        <div>No Upcoming Events</div>
      )}
    </>
  );
};

EventList.propTypes = {
  events: PropTypes.array
};

EventList.defaultProps = {
  events: []
};

export default EventList;
