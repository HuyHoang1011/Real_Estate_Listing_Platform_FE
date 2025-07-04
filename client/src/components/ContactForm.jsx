import React, { useState } from "react";

export default function ContactForm({ propertyId, onSubmit }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ propertyId, message });
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Tin nhắn *
        </label>
        <textarea
          id="message"
          placeholder="Nhập nội dung tin nhắn của bạn..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          rows={4}
        />
      </div>
      
      <button
        type="submit"
        className="w-full px-6 py-3 bg-cta text-white font-semibold rounded-md hover:bg-cta-hover transition duration-200 focus:ring-2 focus:ring-cta focus:ring-offset-2"
      >
        Gửi tin nhắn
      </button>
    </form>
  );
}
