// hooks/useAuthForm.js
import { useState, useEffect } from "react";

export function useAuthForm(initialFields) {
  const [form, setForm] = useState(initialFields);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(form);
    setForm(initialFields);
    setSuccess(true);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return { form, setForm, handleChange, handleSubmit, success, show, setShow };
}


// In LoginPage.jsx (replace form state)
// import { useAuthForm } from "@/hooks/useAuthForm";
// ...
// const { form, handleChange, handleSubmit, show, setShow } = useAuthForm({ username: "", email: "", password: "" });
// ...
// <form onSubmit={handleSubmit((formData) => console.log("Login attempt:", formData))}>
// ...

// In SignupPage.jsx
// import { useAuthForm } from "@/hooks/useAuthForm";
// ...
// const { form, handleChange, handleSubmit, success, show, setShow } = useAuthForm({ name: "", email: "", password: "" });
// ...
// <form onSubmit={handleSubmit((formData) => console.log("Submitted Data:", formData))}>
// {success && <p>Signup successful</p>}
