import { useEffect, useMemo, useState } from "react";
import { useLucideIcons } from "../hooks/useLucideIcons.js";
import { buildInvitationPathForGuest, cleanGuestName } from "../utils/guestName.js";
import "./AttendanceConfirmation.css";

const STORAGE_KEY = "wedding_final_confirmation";

function readLastConfirmation() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AttendanceConfirmation({ initialGuestName, onSubmitConfirmation }) {
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [editingName, setEditingName] = useState(!initialGuestName);
  const [attendance, setAttendance] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(null);
  const [lastConfirmation, setLastConfirmation] = useState(readLastConfirmation);

  const cleanName = cleanGuestName(guestName);
  const invitationPath = useMemo(
    () => buildInvitationPathForGuest(cleanName || initialGuestName),
    [cleanName, initialGuestName]
  );

  useLucideIcons([attendance, submitting, feedback, success, editingName, lastConfirmation]);

  useEffect(() => {
    setGuestName(initialGuestName || "");
    setEditingName(!initialGuestName);
  }, [initialGuestName]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    if (!cleanName) {
      setFeedback("Please enter your name before confirming.");
      setEditingName(true);
      return;
    }

    if (!attendance) {
      setFeedback("Please choose whether you will attend.");
      return;
    }

    setSubmitting(true);
    setFeedback("Submitting your confirmation...");

    try {
      await onSubmitConfirmation({ name: cleanName, attendance });

      const savedResponse = {
        name: cleanName,
        attendance,
        submittedAt: new Date().toISOString(),
      };

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResponse));
      } catch {
        // Local storage only improves the page experience; Sheets remains the source of truth.
      }

      setLastConfirmation(savedResponse);
      setSuccess(savedResponse);
      setEditingName(false);
      setFeedback("");
    } catch (error) {
      console.error("Final confirmation submission failed", error);
      setFeedback("We could not submit your confirmation. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChangeResponse() {
    setSuccess(null);
    setFeedback("");
  }

  return (
    <section className="confirmation-page" aria-labelledby="confirmationTitle">
      <div className="confirmation-petal confirmation-petal--one" aria-hidden="true"></div>
      <div className="confirmation-petal confirmation-petal--two" aria-hidden="true"></div>
      <div className="confirmation-petal confirmation-petal--three" aria-hidden="true"></div>

      <div className="confirmation-card">
        <div className="confirmation-monogram" aria-hidden="true">D&amp;N</div>

        <p className="confirmation-kicker">Dinuka &amp; Nimasha</p>
        <h1 id="confirmationTitle">Final Attendance Confirmation</h1>

        {success ? (
          <div className="confirmation-success" aria-live="polite">
            <div className="confirmation-success-icon" aria-hidden="true">
              <i data-lucide={success.attendance === "Yes" ? "heart" : "check"}></i>
            </div>

            <h2>
              {success.attendance === "Yes"
                ? `Thank you, ${success.name}!`
                : `Thank you for letting us know, ${success.name}.`}
            </h2>

            <p>
              {success.attendance === "Yes"
                ? "We're delighted that you'll be joining us. We can't wait to celebrate with you."
                : "We'll miss you on the day and truly appreciate your confirmation."}
            </p>

            <div className="confirmation-success-actions">
              <button type="button" className="premium-button" onClick={handleChangeResponse}>
                <i data-lucide="refresh-cw" aria-hidden="true"></i>
                Change Response
              </button>
              <a className="premium-button premium-button-light" href={invitationPath}>
                <i data-lucide="mail-open" aria-hidden="true"></i>
                View Full Invitation
              </a>
            </div>
          </div>
        ) : (
          <form className="confirmation-form" onSubmit={handleSubmit} noValidate>
            {cleanName && !editingName ? (
              <div className="confirmation-greeting">
                <p>Dear <strong>{cleanName}</strong>,</p>
                <button type="button" onClick={() => setEditingName(true)}>
                  Not you? Edit name
                </button>
              </div>
            ) : (
              <label className="confirmation-name-field">
                <span>Your name</span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <p className="confirmation-message">
              We're finalizing the arrangements for our wedding celebration and would love to know
              whether you'll be joining us. Please confirm your attendance below.
            </p>

            <div className="confirmation-details" aria-label="Wedding details">
              <div>
                <i data-lucide="calendar" aria-hidden="true"></i>
                <span>26 August 2026</span>
              </div>
              <div>
                <i data-lucide="clock" aria-hidden="true"></i>
                <span>9:10 AM</span>
              </div>
              <div>
                <i data-lucide="map-pin" aria-hidden="true"></i>
                <span>Capital City Hotel, Badulla</span>
              </div>
            </div>

            <fieldset className="confirmation-response">
              <legend>Please select one response</legend>
              <div className="confirmation-options" role="radiogroup" aria-label="Attendance response">
                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "Yes"}
                  className={`confirmation-option ${attendance === "Yes" ? "is-selected" : ""}`}
                  onClick={() => {
                    setAttendance("Yes");
                    setFeedback("");
                  }}
                  disabled={submitting}
                >
                  <i data-lucide="heart" aria-hidden="true"></i>
                  <span>Yes, I'll be there</span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "No"}
                  className={`confirmation-option ${attendance === "No" ? "is-selected" : ""}`}
                  onClick={() => {
                    setAttendance("No");
                    setFeedback("");
                  }}
                  disabled={submitting}
                >
                  <i data-lucide="x" aria-hidden="true"></i>
                  <span>Sorry, I can't attend</span>
                </button>
              </div>
            </fieldset>

            {lastConfirmation && (
              <p className="confirmation-previous">
                Previous response from this device: <strong>{lastConfirmation.attendance}</strong>
              </p>
            )}

            <div
              className={`confirmation-feedback ${feedback ? "is-visible" : ""}`}
              role={feedback.includes("could not") || feedback.includes("Please") ? "alert" : "status"}
              aria-live="polite"
            >
              {feedback}
            </div>

            <button className="submit-button confirmation-submit" type="submit" disabled={submitting}>
              <i data-lucide={submitting ? "loader-circle" : "send"} aria-hidden="true"></i>
              {submitting ? "Submitting..." : "Confirm Attendance"}
            </button>

            <a className="confirmation-full-link" href={invitationPath}>
              View the complete invitation
            </a>
          </form>
        )}
      </div>
    </section>
  );
}
