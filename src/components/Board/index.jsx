import React, { createRef, useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

import { styles } from "./styles";

const Board = ({ psts }) => {
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const [piecesRefs, setPiecesRefs] = useState([]);
  const [piecesPosXAnim, setPiecesPosXAnim] = useState([]);
  const [piecesPosYAnim, setPiecesPosYAnim] = useState([]);
  const [housesRefs, setHousesRefs] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);
  // const [showPieces, setShowPieces] = useState(false);

  var change = useRef(false);
  var changeWhitePiecePosition = useRef([0, 268]);
  var changeBlackPiecePosition = useRef([0, -33.5]);
  var containerRef = useRef(null);
  var backgroundColor = useRef("chocolate");
  var lettersArr = useRef(["a", "b", "c", "d", "e", "f", "g", "h"]);
  var numbersArr = useRef([8, 7, 6, 5, 4, 3, 2, 1]);
  const actualLineL = useRef("");
  const actualLine = useRef(0);

  var piecesIcons = useRef([
    require("../../assets/pieces/bB.png"),
    require("../../assets/pieces/bK.png"),
    require("../../assets/pieces/bN.png"),
    require("../../assets/pieces/bP.png"),
    require("../../assets/pieces/bQ.png"),
    require("../../assets/pieces/bR.png"),
    require("../../assets/pieces/wB.png"),
    require("../../assets/pieces/wK.png"),
    require("../../assets/pieces/wN.png"),
    require("../../assets/pieces/wP.png"),
    require("../../assets/pieces/wQ.png"),
    require("../../assets/pieces/wR.png"),
  ]);

  useEffect(() => {
    const piecesRefsL = Array(32)
      .fill()
      .map((_, i) => {
        return piecesRefs[i] || createRef();
      });

    const piecesPosXAnimL = Array(32)
      .fill()
      .map((_, i) => {
        return (
          piecesPosXAnim[i] ||
          new Animated.Value(
            (() => {
              changeWhitePiecePosition.current[0] =
                i % 8 === 0 || i === 0
                  ? 0
                  : changeWhitePiecePosition.current[0] + 33.5;

              return changeWhitePiecePosition.current[0];
            })()
          )
        );
      });

    const piecesPosYAnimL = Array(32)
      .fill()
      .map((_, i) => {
        return (
          piecesPosYAnim[i] ||
          new Animated.Value(
            (() => {
              if (i >= 16) {
                changeBlackPiecePosition.current[1] =
                  i % 8 === 0 || i === 0
                    ? changeBlackPiecePosition.current[1] + 33.5
                    : changeBlackPiecePosition.current[1];

                if (i === 31) {
                  let aux = changeBlackPiecePosition.current[1];
                  changeBlackPiecePosition.current = [0, -33.5];
                  return aux;
                }
                return changeBlackPiecePosition.current[1];
              }

              // [0, 250.5]
              changeWhitePiecePosition.current[1] =
                i % 8 === 0 || i === 0
                  ? changeWhitePiecePosition.current[1] - 33.5
                  : changeWhitePiecePosition.current[1];

              if (i === 15) {
                let aux = changeWhitePiecePosition.current[1];
                changeWhitePiecePosition.current = [0, 268];
                return aux;
              }

              return changeWhitePiecePosition.current[1];
            })()
          )
        );
      });

    const housesRefsL = Array(64)
      .fill()
      .map((_, i) => {
        return piecesRefs[i] || createRef();
      });

    setHousesRefs(housesRefsL);
    setPiecesPosXAnim(piecesPosXAnimL);
    setPiecesPosYAnim(piecesPosYAnimL);
    setPiecesRefs(piecesRefsL);

    // loadPsts();
  }, []);

  const selectPiece = (i) => {
    setCurrentPiece(i);
  };

  function moveToHouse(i) {
    housesRefs[i].current.measureLayout(
      containerRef.current,
      (left, top, width, height) => {
        piecesRefs[currentPiece]?.current.setNativeProps({
          left: left - 16,
          top: top - 16,
        });
        setCurrentPiece(null);
      }
    );
  }

  function generateCoord(i) {
    if (i % 8 === 0 || i === 0) {
      actualLine.current = actualLine.current + 1;
    }

    switch (actualLineL.current) {
      case "":
        actualLineL.current = "A";
        break;
      case "A":
        actualLineL.current = "B";
        break;
      case "B":
        actualLineL.current = "C";
        break;
      case "C":
        actualLineL.current = "D";
        break;
      case "D":
        actualLineL.current = "E";
        break;
      case "E":
        actualLineL.current = "F";
        break;
      case "F":
        actualLineL.current = "G";
        break;
      case "G":
        actualLineL.current = "H";
        break;
      case "H":
        actualLineL.current = "A";
        break;
    }

    if (i === 63) {
      actualLine.current = 0;
    }

    const coord = actualLineL.current + actualLine.current;
    return coord;
  }

  function renderBoard() {
    return Array(64)
      .fill()
      .map((_, index) => {
        // change.current = index % 8 === 0 || index === 0;
        change.current = index % 8 === 0;
        backgroundColor.current = change.current
          ? backgroundColor.current
          : backgroundColor.current === "white"
          ? "chocolate"
          : "white";
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              moveToHouse(index);
            }}
          >
            <View
              ref={housesRefs[index]}
              style={{
                ...styles.house,
                backgroundColor: backgroundColor.current,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color:
                    backgroundColor.current === "white" ? "chocolate" : "white",
                }}
              >
                {generateCoord(index)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      });
  }

  const changePiece = async (before, after) => {
    let letterPosBefore = before[0].toLowerCase();
    let numberPosBefore = parseInt(before[1]);
    let letterPosAfter = after[0].toLowerCase();
    let numberPosAfter = parseInt(after[1]);

    // console.log(letterPosBefore, letterPosAfter);
    // console.log(numberPosBefore, numberPosAfter);

    function measureLayoutPiece(piece, container) {
      return new Promise(function (resolve, reject) {
        piece.current.measureLayout(
          container.current,
          (left, top, width, height) => {
            resolve([left, top]);
          }
        );
      });
    }

    piecesRefs.map(async (pieceK, index) => {
      const [left, top] = await measureLayoutPiece(pieceK, containerRef);

      const leftA = lettersArr.current.indexOf(letterPosBefore) * 33.5 + 16;
      const topA = numbersArr.current.indexOf(numberPosBefore) * 33.5 + 16;

      // console.log(lettersArr.current.indexOf(y));
      // console.log(numbersArr.current.indexOf(x));

      // console.log(
      //   `leftA: ${leftA}\ntopA: ${topA}\nnumberArr: ${
      //     leftA / 33.5
      //   }\nlettersArr: ${topA / 33.5}\n-----------------------`
      // );

      const isTopped = (topA - top < 1 && topA - top > -1) || top === topA;
      const isLefted =
        (leftA - left < 1 && leftA - left > -1) || left === leftA;

      // console.log(
      //   `Index: ${index}°\n\nTop diference: ${topA - top}\nLeft diference: ${
      //     leftA - left
      //   }\n`
      // );
      // console.log(`${isTopped}, ${isLefted}\n---------------`);

      // console.log(index + `° - top: ${top} | left: ${left}`);
      // console.log(`\nTOP: ${topA}`);
      // console.log(`LEFT: ${leftA} \n-------------`);

      // console.log(`${isTopped} - ${top - topA}, ${isLefted} - ${left - leftA}`);

      // console.log(isTopped, isLefted);

      if (isTopped && isLefted) {
        const newX = lettersArr.current.indexOf(letterPosAfter) * 33.5;
        const newY = numbersArr.current.indexOf(numberPosAfter) * 33.5;

        // posAnim.current = new Animated.ValueXY({ x: left, y: top });

        // console.log(posAnim.current);

        // pieceK.current.setNativeProps({
        //   left: posAnim.current.y,
        //   top: posAnim.current.x,
        // });

        Animated.timing(piecesPosYAnim[index], {
          toValue: newY,
          duration: 250,
          useNativeDriver: false,
        }).start();
        Animated.timing(piecesPosXAnim[index], {
          toValue: newX,
          duration: 250,
          useNativeDriver: false,
        }).start();
        //COBOL Lang > Kotlin < Jython || JythonScript
        //.i.
      }
    });
  };

  function renderWhitePieces() {
    return Array(16)
      .fill(0)
      .map((p, i) => {
        const source = (() => {
          switch (i) {
            case 0:
              return piecesIcons.current[11];
            case 1:
              return piecesIcons.current[8];
            case 2:
              return piecesIcons.current[6];
            case 3:
              return piecesIcons.current[10];
            case 4:
              return piecesIcons.current[7];
            case 5:
              return piecesIcons.current[6];
            case 6:
              return piecesIcons.current[8];
            case 7:
              return piecesIcons.current[11];
            default:
              return piecesIcons.current[9];
          }
        })();

        return (
          <TouchableWithoutFeedback
            key={i}
            style={styles.piecesContainer}
            // onPress={() => {
            //   selectPiece(i);
            // }}
          >
            <AnimatedImage
              ref={piecesRefs[i]}
              style={{
                ...styles.piece,
                left: piecesPosXAnim[i],
                top: piecesPosYAnim[i],
              }}
              source={source}
            />
          </TouchableWithoutFeedback>
        );
      });
  }

  function renderBlackPieces() {
    return Array(16)
      .fill(0)
      .map((p, i) => {
        i = i + 16;
        const source = (() => {
          switch (i) {
            case 16:
              return piecesIcons.current[5];
            case 17:
              return piecesIcons.current[2];
            case 18:
              return piecesIcons.current[0];
            case 19:
              return piecesIcons.current[4];
            case 20:
              return piecesIcons.current[1];
            case 21:
              return piecesIcons.current[0];
            case 22:
              return piecesIcons.current[2];
            case 23:
              return piecesIcons.current[5];
            default:
              return piecesIcons.current[3];
          }
        })();

        return (
          <TouchableWithoutFeedback
            key={i}
            style={styles.piecesContainer}
            // onPress={() => {
            //   selectPiece(i);
            // }}
          >
            <AnimatedImage
              ref={piecesRefs[i]}
              style={{
                ...styles.piece,
                left: piecesPosXAnim[i],
                top: piecesPosYAnim[i],
              }}
              source={source}
            />
          </TouchableWithoutFeedback>
        );
      });
  }

  function loadPsts() {
    psts.map((pos) => {
      // console.log("eae");
      changePiece(pos.before, pos.after);
    });
  }

  return (
    <View style={styles.container} ref={containerRef}>
      {renderBoard()}
      {renderWhitePieces()}
      {renderBlackPieces()}
      {loadPsts()}
    </View>
  );
};

export default Board;
