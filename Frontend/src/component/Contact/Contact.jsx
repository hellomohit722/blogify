import Button from "./Button/Button";
import { MdOutlineMessage } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { useState } from "react";
import "./Contect.css";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8b37d58f-2b49-4015-9150-d06c5fc4fb09");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      setName("");
      setEmail("");
      setMessage("");
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      toast.error(data.message);
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="Content_form">
      <div className="form_container">
        <div className="form_container">
          <div className="form_btns">
            <a
              href="mailto:hllomohit722@gmail.com"
              style={{ textDecoration: "none" }}
            >
              <Button
                text="VAI EMAIL FORM"
                icon={<MdOutlineMessage fontSize="1rem" />}
              />
            </a>
            <a href="tel:7082182699" style={{ textDecoration: "none" }}>
              <Button
                text="VAI CALL"
                icon={<IoCallOutline fontSize="1rem" />}
              />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form_control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form_control">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button text="SUBMIT" />
          </div>
        </form>
      </div>

      <div className="social_icons">
        <img src="image/social.svg" alt="social" />
      </div>
    </div>
  );
};

export default Contact;
