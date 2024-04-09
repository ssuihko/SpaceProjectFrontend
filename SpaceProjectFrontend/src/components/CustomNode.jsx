import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { Image, Text, Pill, CloseButton, Container } from "@mantine/core";
import classes from "./CustomNode.module.css";
import { Link } from "react-router-dom";

function CustomNode({ data, isConnectable }) {
  return (
    <Container>
      <div className={classes.textupdaternode}>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div>
          <CloseButton
            size={10}
            iconSize={10}
            onClick={() => data.onNodeRemove(data)}
          ></CloseButton>
        </div>
        <div>
          <Image
            className={classes.image}
            radius="md"
            h={50}
            w="auto"
            fit="contain"
            src={data.image}
          />
        </div>
        <div>
          <Text className={classes.text} size="xs">
            {data.label}
          </Text>
        </div>
        <div>
          <Pill
            component={Link}
            to={`/${data.linktype}/${data.id}`}
            className={classes.pill}
          >
            View
          </Pill>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </Container>
  );
}

CustomNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};

export default CustomNode;
