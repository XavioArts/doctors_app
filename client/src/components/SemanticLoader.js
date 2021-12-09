import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";

const SemanticLoader = ({ text }) => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted content={text ? text : "Loading"} />
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
};

export default SemanticLoader;
