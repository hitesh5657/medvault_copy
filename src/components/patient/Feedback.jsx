import React, { useState } from "react";
import Swal from "sweetalert2";

function Feedback({ appointment, onClose, apiBase, token, onSubmitted }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(null);

  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      return Swal.fire({
        title: "Feedback Required",
        text: "Feedback cannot be empty.",
        icon: "warning",
        confirmButtonText: "OK"
      });
    }


    try {
      const res = await fetch(
        `${apiBase}/api/patient/appointments/${appointment.appointmentId}/feedback?feedback=${encodeURIComponent(
          feedbackText
        )}&rating=${feedbackRating}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to submit feedback");
      Swal.fire({
        title: "Submitted!",
        text: "Feedback submitted successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });


      setFeedbackText("");
      setFeedbackRating(5);
      onSubmitted();
      onClose();
    } catch (err) {
    Swal.fire({
      title: "Error",
      text: "Error submitting feedback: " + err.message,
      icon: "error",
      confirmButtonText: "OK"
    });
    }
  };

  const StarRating = ({ rating, setRating }) => (
    <div style={{ fontSize: "24px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            color: star <= rating ? "gold" : "lightgray",
            marginRight: "5px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Feedback for Dr. {appointment.doctorName}</h3>
        <textarea
          placeholder="Write your feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        <br />
        <label>Rating: </label>
        <StarRating rating={feedbackRating} setRating={setFeedbackRating} />
        <br />
        <div className="modal-actions">
        <button onClick={submitFeedback} disabled={!feedbackText.trim() || feedbackRating === 0}>Submit</button>{"   "}
        <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
