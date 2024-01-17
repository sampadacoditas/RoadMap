import React, { useState } from "react";
import Tree from "react-d3-tree";
import classes from "./RoadMapComponent.module.scss";
import { data } from "./data";
import { useCenteredTree } from "./helpers";
// @ts-ignore
import Modal from "react-modal";
const RoadMapComponent = () => {
  const [translate, containerRef] = useCenteredTree();
  const [treeData, setTreeData] = useState(data);
  const [newNodeName, setNewNodeName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentNodeData, setCurrentNodeData] = useState<any>(null);

  const nodeSize = { x: 100, y: 100 };
  const nodeSvgShape = {
    shape: "circle",
    shapeProps: {
      r: 10,
      fill: "green",
    },
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
    console.log(
      "Checking IDs:",
      parentNode.id,
      targetId,
      parentNode.id === targetId
    );
    if (parentNode.id == targetId) {
      console.log("hel");
      return parentNode;
    } else if (parentNode.children) {
      for (let child of parentNode.children) {
        const foundNode = findNodeById(child, targetId);
        console.log(foundNode);
        if (foundNode) return foundNode;
      }
    }
    return null;
  };

  const handleNodeDoubleClick = (nodeData: any) => {
    const newNode = {
      name: newNodeName,
      children: [{ name: "hello" }],
    };
    const updatedData = JSON.parse(JSON.stringify(treeData));
    console.log(updatedData, nodeData);

    const clickedNode = findNodeById(updatedData, nodeData.data.id);
    console.log(clickedNode);

    if (clickedNode) {
      clickedNode.children = clickedNode.children || [];
      clickedNode.children.push(newNode);
      setTreeData(updatedData);
    }
  };

  const openModal = (nodeData: any) => {
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
    console.log("New Node Name:", newNodeName);
    closeModal();
    handleNodeDoubleClick(currentNodeData);
  };
  return (
    <>
      {modalIsOpen && (
        <div className={classes.textInput}>
          <label htmlFor="">
            New Node
            <input
              type="text"
              className={classes.input}
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </label>
          <button className={classes.enter} onClick={enterfun}>
            enter
          </button>
          <div onClick={closeModal}>X</div>
        </div>
      )}
      <div className={classes.tree} ref={containerRef}>
        <Tree
          data={treeData}
          translate={translate}
          nodeSize={nodeSize}
          onNodeClick={(nodeData) => openModal(nodeData)}
          orientation="vertical"
          pathFunc="step"
          collapsible={false}
        />
      </div>
    </>
  );
};

export default RoadMapComponent;
