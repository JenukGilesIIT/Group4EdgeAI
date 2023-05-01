import moment from "moment";
import { Card } from "react-bootstrap";
import { dateTimeFormat } from "../../../utilts/dateUtils";

function AccidentCard(props) {
  const { DetailsHandler, accident } = props;

  return (
    <Card
      className="Home-side-card"
      onClick={() => DetailsHandler(accident.id)}
    >
      <Card.Header>
        <Card.Title>
          {accident.status}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {moment(accident.date).local().format(dateTimeFormat)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AccidentCard;
