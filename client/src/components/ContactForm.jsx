import React, { useState } from "react";

export default function ContactForm({ propertyId, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ propertyId, name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
        rows={4}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  );
}
