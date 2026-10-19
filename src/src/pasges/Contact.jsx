import { useState, useContext } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { SlEnvolopeLetter } from "react-icons/sl";
import { AiFillPhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    if (!user) {
      return (toast.warn("please login first!"), navigate("/login"));
    }
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1500);
  };

  return (
    <div className="bg-light">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-2">
          <h1 className="fw-bold text-dark">Contact Our Team</h1>
        </div>

        {/* Contact Information Details */}
        <Row className="g-4 align-items-stretch">
          <Col lg={5}>
            <Card
              className="h-100 border-0 shadow-sm text-white p-4"
              style={{
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              }}
            >
              <Card.Body className="d-flex flex-column h-100 justify-content-between">
                <div>
                  <h3 className="fw-bold mb-4">Info Structure</h3>
                  <p className="text-white-50 mb-2">
                    Visit our main hub or connect instantly via phone or
                    standard corporate email.
                  </p>

                  {/* Address Grid */}
                  <div className="d-flex align-items-start mb-5">
                    <FaLocationDot className="fs-3 me-3" />
                    <div>
                      <h6 className="fw-bold mb-1">Our Head Office</h6>
                      <p className="small text-white-50 m-0">
                        123 Learning Lane, Tech Hub Block, Pakistan
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-start mb-5">
                    <AiFillPhone className="fs-3 me-3" />
                    <div>
                      <h6 className="fw-bold mb-1">Phone Number</h6>
                      <p className="small text-white-50 m-0">
                        +92 (300) 1234567
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="d-flex align-items-start mb-4">
                    <SlEnvolopeLetter className="fs-3 me-3" />
                    <div>
                      <h6 className="fw-bold mb-1">Support Email</h6>
                      <p className="small text-white-50 m-0">
                        support@learnhub.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-top border-secondary small text-white-50">
                  Operating Hours: Mon - Fri (9:00 AM - 6:00 PM PKT)
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Input Form */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm rounded-3 h-100">
              <Card.Body>
                <h3 className="fw-bold text-dark mb-4">Send a Message</h3>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* Full Name */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="contactName">
                        <Form.Label className="fw-semibold small text-secondary">
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="py-2 focus-none"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="contactEmail">
                        <Form.Label className="fw-semibold small text-secondary">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="py-2 focus-none"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Subject */}
                  <Form.Group className="mb-3" controlId="contactSubject">
                    <Form.Label className="fw-semibold small text-secondary">
                      Subject
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="py-2 focus-none"
                    />
                  </Form.Group>

                  {/* Message */}
                  <Form.Group className="mb-4" controlId="contactMessage">
                    <Form.Label className="fw-semibold small text-secondary">
                      Your Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Type your message details here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="py-2 focus-none"
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={sending}
                    className="px-4 py-2 fw-bold text-white shadow-sm border-0 rounded-3"
                    style={{ backgroundColor: "#1e3c72" }}
                  >
                    {sending ? "Sending Message..." : "Send Message"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
