import { useEffect, useState } from "react";
import classes from "./Node.module.scss";
import { Popover } from "react-tiny-popover";
const SubNode = (props: any) => {
  const {
    onClickEdit,
    openModal,
    nodeDatum,
    closeModal,
    handleOnChange,
    enterfun,
    nodeId,
    modalIsOpen,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [saveEditValue, setEditValue] = useState<any>(nodeDatum.name);
  console.log(nodeDatum?.attributes);
  const handkeyDown = (event: any) => {
    var code = event.keyCode ? event.keyCode : event.which;
    if (code == 13) {
      setIsEditing(false);
      onClickEdit(saveEditValue);
    }
  };

  const handleClick = (event: any) => {
    if (event.detail === 2) {
      console.log("double click");
      setIsEditing(true);
    }
  };
  useEffect(() => {
    setEditValue(nodeDatum.name);
  }, [nodeDatum.name]);
  console.log(nodeDatum?.direction);
  return (
    <Popover
      isOpen={nodeId === nodeDatum.id && modalIsOpen}
      positions={["right", "top"]}
      content={
        <div className={classes.textInput}>
          <input
            type="text"
            placeholder="New Node"
            className={classes.input}
            onChange={handleOnChange}
          />

          <button className={classes.enterbutton} onClick={enterfun}>
            +
          </button>
          <button onClick={closeModal} className={classes.cross}>
            X
          </button>
        </div>
      }
    >
      <div className={classes.subNodeContainer}>
        <button
          className={
            isEditing
              ? `${classes.button} ${classes.editableField}`
              : classes.button
          }
          onClick={handleClick}
        >
          {isEditing ? (
            <>
              <input
                onChange={(event) => {
                  setEditValue(event.target.value);
                }}
                onKeyDown={handkeyDown}
                value={saveEditValue}
                className={classes.edit}
              />
            </>
          ) : (
            <div className={classes.name}>{nodeDatum.name}</div>
          )}

          <div className={classes.attributes}></div>
        </button>
        <div className={classes.editAddButton}>
          <img
            src="https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-add-icon-png-image_998225.jpg"
            alt=""
            height={15}
            width={15}
            onClick={() => openModal(nodeDatum)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{nodeDatum?.attributes?.department}</div>
          <div>{nodeDatum?.attributes?.department1}</div>
          <div>{nodeDatum?.attributes?.department2}</div>
          <div>{nodeDatum?.attributes?.department3}</div>
        </div>
      </div>
    </Popover>
  );
};

export default SubNode;
