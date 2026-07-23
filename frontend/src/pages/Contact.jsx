import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ site }) {
  const contact = site.contact || {};
  const email = site.site?.email;
  const endpoint =
    contact.endpoint ||
    (email ? `https://formsubmit.co/ajax/${email}` : null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (honey) return; // spam bot filled the hidden field
    if (!endpoint) {
      setStatus("error");
      setError("No contact endpoint configured.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New message from ${form.name || "the portfolio"}`,
          _template: "table",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setError(
          data.message ||
            "Something went wrong sending your message. Please email me directly."
        );
      }
    } catch {
      setStatus("error");
      setError(
        "Could not reach the mail service. Please email me directly instead."
      );
    }
  };

  return (
    <section className="page contact-page">
      <header className="page__header">
        <p className="page__eyebrow">Contact</p>
        <h1 className="page__title">{contact.title || "Contact"}</h1>
        {contact.subtitle && <p className="page__desc">{contact.subtitle}</p>}
        <Link to="/" className="page__back">
          ← All work
        </Link>
      </header>

      {status === "success" ? (
        <div className="contact-success" role="status">
          <h2>Thank you — your message is on its way.</h2>
          <p>I&rsquo;ll be in touch soon.</p>
          <button
            type="button"
            className="screen__cta"
            onClick={() => setStatus("idle")}
          >
            Send another
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit}>
          <label className="contact-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={update("name")}
              required
              autoComplete="name"
            />
          </label>

          <label className="contact-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update("email")}
              required
              autoComplete="email"
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              rows={6}
              value={form.message}
              onChange={update("message")}
              required
            />
          </label>

          {/* Honeypot: hidden from users, catches bots */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="contact-honey"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            aria-hidden="true"
          />

          {status === "error" && (
            <p className="contact-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="screen__cta"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </section>
  );
}
