import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CardConfirmation {
  baseURL?: string;
  message?: string;
  title?: string;
  subtitle?: string;
  addButton?: boolean;
}

export const ConfirmationCardButton: React.FC<CardConfirmation> = ({
  title,
  subtitle,
  message,
  baseURL,
  addButton = false,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <Col sm={12} md={12} lg={4} xl={4}>
          <Card className="bg-primary text-center text-light">
            <Card.Body>
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2  ">{subtitle}</h6>
              <p className="card-text">{message}</p>
              {addButton && (
                <Link
                  to={baseURL || "#"}
                  className="card-link  font-weight-bold btn btn-outline-light text-light"
                >
                  Card link
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};
