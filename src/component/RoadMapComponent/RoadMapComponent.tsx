import { useState } from "react";
import Tree from "react-d3-tree";
import classes from "./RoadMapComponent.module.scss";
import { data } from "./data";
import { useCenteredTree } from "./helpers";
import SubNode from "../Node/SubNode";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const RoadMapComponent = () => {
  const [translate, containerRef] = useCenteredTree();
  const [treeData, setTreeData] = useState(data);
  const [newNodeName, setNewNodeName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentNodeData, setCurrentNodeData] = useState<any>(null);

  const [nodeId, setNodeElement] = useState();
  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x * 2,
    height: nodeSize.y * 2,
    x: -30,
  };
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    classes,
  }: any) => {
    const onClickEdit = (nodeDatum: any, value: any) => {
      const updatedData = JSON.parse(JSON.stringify(treeData));
      const clickedNode = findNodeById(updatedData, nodeDatum?.id);
      if (clickedNode) {
        clickedNode.name = value;
        setTreeData(updatedData);
      }
    };
    return (
      <>
        <foreignObject {...foreignObjectProps}>
          <SubNode
            openModal={openModal}
            closeModal={closeModal}
            nodeDatum={nodeDatum}
            onClickEdit={(value: any) => onClickEdit(nodeDatum, value)}
            nodeId={nodeId}
            handleOnChange={(event: any) => handleOnChange(event.target.value)}
            enterfun={enterfun}
            modalIsOpen={modalIsOpen}
          />
        </foreignObject>
      </>
    );
  };

  const findAndAddNode = (parentNode: any, targetName: any, newNode: any) => {
    if (parentNode.name === targetName) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push(newNode);
    } else if (parentNode.children) {
      for (let child of parentNode.children) {
        findAndAddNode(child, targetName, newNode);
      }
    }
  };

  const findNodeById: any = (parentNode: any, targetId: any) => {
    if (parentNode.id == targetId) {
      return parentNode;
    } else if (parentNode.children) {
      for (let child of parentNode.children) {
        const foundNode = findNodeById(child, targetId);
        if (foundNode) return foundNode;
      }
    }
    return null;
  };

  const handleAddIconClick = (nodeData: any) => {
    const newNode = {
      id: uuidv4(),
      name: newNodeName,
    };

    const updatedData = JSON.parse(JSON.stringify(treeData));
    console.log(updatedData);

    const clickedNode = findNodeById(updatedData, nodeData?.id);

    if (clickedNode) {
      clickedNode.children = clickedNode.children || [];
      clickedNode.children.push(newNode);
      setTreeData(updatedData);
    }
  };

  const openModal = (nodeData: any) => {
    setNodeElement(nodeData.id);
    setModalIsOpen(true);
    setCurrentNodeData(nodeData);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleOnChange = (value: string) => {
    setNewNodeName(value);
  };
  const enterfun = () => {
    closeModal();
    handleAddIconClick(currentNodeData);
  };
  return (
    <div className={classes.tree} ref={containerRef} draggable={false}>
      <Tree
        data={treeData}
        draggable={true}
        translate={translate}
        nodeSize={nodeSize}
        orientation="vertical"
        // orientation="horizontal"
        pathFunc="step"
        collapsible={false}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            classes,
          })
        }
        separation={{ siblings: 2, nonSiblings: 1.5 }}
        shouldCollapseNeighborNodes={true}
      />
    </div>
  );
};

export default RoadMapComponent;
