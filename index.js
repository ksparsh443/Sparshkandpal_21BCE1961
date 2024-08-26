// Register Vanilla JS Shortcut Functions
function DQS(val) {return document.querySelector(val);}
function DQSA(val) {return document.querySelectorAll(val);}
function DID(val) {return document.getElementById(val);}
function DCN(val) {return document.getElementsByClassName(val);}
function DCE(val) {return document.createElement(val);}
function DCTN(val) {return document.createTextNode(val);}
function DPFS(val) {return new DOMParser().parseFromString(val, 'text/html');}

// Debug Mode
var debug_mode = true;
// JSON Database
var database = [];
// JSON Game Database
var game = [];
// JSON Moves Database
var moves = [];
// Register Pieces
const pieces = {
  black: {
    pawn_1: { pos: "A4", icon: "pawn.jpg"},  // Adjusted positions for 5x5 grid
    pawn_2: { pos: "B4", icon: "pawn.jpg"},
    hero1: { pos: "C4", icon: "hero.jpg"},
    hero2: { pos: "D4", icon: "hero.jpg"},
    hero3: { pos: "E4", icon: "hero.jpg"}
  },
  white: {
    pawn_1: { pos: "A1", icon: "pawn.jpg"},  // Adjusted positions for 5x5 grid
    pawn_2: { pos: "B1", icon: "pawn.jpg"},
    hero1: { pos: "C1", icon: "hero.jpg"},
    hero2: { pos: "D1", icon: "hero.jpg"},
    hero3: { pos: "E1", icon: "hero.jpg"}
  },
};

// Register Column Letters
const cols = ["E", "D", "C", "B", "A"];

// Register Log
var log = {
  raw: [],
  listeners: {
    selectPieces: [],
    selectSquares: [],
  },
  actions: {
    createBoard: [],
    setPieces: [],
    mapPieces: [],
    clearPieceSelectors: [],
    clearSquareSelectors: [],
    clearCapturedSelectors: [],
    selectPiece: [],
    selectSquare: [],
    movePiece: [],
    recordBoard: [],
    recordMove: [],
    resetSelectors: [],
    takePiece: []
  }
}

// Register Event Listener Method Functions to Bind the Actions to the Event Triggering Elements
var listeners = {
  // Listen For When a Chess Piece is Clicked
  selectPieces: function() { actions.consoleLog("[LISTENER] Select Pieces");
    let pieces = document.querySelectorAll('.chess-piece');
    pieces.forEach((piece, index) => {
      if(!piece.classList.contains('init')) {
        piece.classList.add('init');
        piece.addEventListener('click', function(e) {
          actions.selectPiece(e);
          actions.consoleLog("<<<<<<<>>>>>>>", "", false);
        });
      }
    });
  },
  
  // Listen for When an Empty Chess Square is Clicked
  selectSquares: function() { actions.consoleLog("[LISTENER] Select Squares")
    let squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
      if(!square.querySelector('.chess-piece') && !square.classList.contains('selected') && !square.classList.contains('init')) {
        square.classList.add('init');
        square.addEventListener('click', function(e) {
          e.preventDefault();
          actions.selectSquare(e);
          actions.consoleLog("<<<<<<>>>>>>>", "", false);
        });
      } else {
        square.addEventListener('click', function(e) {e.preventDefault();});
      }
    });
  }
};

// Register Action Method Functions
// Existing code...

// Register Action Method Functions
// Register Action Method Functions
var actions = {
    consoleLog: function(arg1 = "", arg2 = "", lines = false) {
      if(debug_mode === true) {
        var d = new Date(); 
        let t = {
          year: d.getFullYear(), 
          month: d.getMonth(), 
          day: d.getDate(), 
          hours: d.getHours(),
          seconds: d.getSeconds(),
          milliseconds: d.getMilliseconds()
        };
        log.raw.push({stamp: d.toString().split(' ')[4], arg1: arg1, arg2: arg2, time: t});;
        console.log(log);
      }
    },
  
    // Create And/Or Clear the Chess Board
    createBoard: function() { actions.consoleLog("[ACTION] Create Board");
      let board = document.querySelector('#chess-board');
      for(i = 1; i <= 25; i++) {
        let row = Math.floor((25 - i) / 5) + 1;
        let col = (5 * (6 - row)) - i + 1;
        let color = "";
        if(row % 2 === 0) {
          color = i % 2 === 0 ? "black" : "white";
        } else {
          color = i % 2 === 0 ? "white" : "black";
        }
        board.insertAdjacentHTML('beforeend', templates.square(color, i, row, col));
      }
    },
    
    // Set the Pieces on the Chess Board
    setPieces: function(pieces) { actions.consoleLog("[ACTION] Set Pieces");
      let b = pieces.black;
      let w = pieces.white;
      actions.mapPieces(b, "black");
      actions.mapPieces(w, "white");
    },
    
    // Map the Pieces on the Chess Board for a Single Player
    mapPieces: function(p, color) {
      for(key in p) {
        let pos = p.hasOwnProperty(key) ? p[key].pos : false;
        let square = document.querySelector('.square[data-cell="'+pos+'"]');
        if(square) {
          square.insertAdjacentHTML('beforeend', templates.piece(key, p[key], color));
        }
      }
      actions.consoleLog("[ACTION] Map Pieces", {color: color, pieces: p});
    },
    
    // Deselect All Chess Pieces
    clearPieceSelectors: function() { actions.consoleLog("[ACTION] Clear Piece Selectors");
      document.querySelectorAll('.square').forEach((p, j) => {
        p.classList.remove('piece-selected');
      });
    },
    
    // Deselect All Chess Squares
    clearSquareSelectors: function() { actions.consoleLog("[ACTION] Clear Square Selectors");
      document.querySelectorAll('.square').forEach((x, j) => {
        x.classList.remove('square-selected');
      });
    },
    
    clearCapturedSelectors: function() { actions.consoleLog("[ACTION] Clear Captured Selectors");
      document.querySelectorAll('.square').forEach((x, j) => {
        x.classList.remove('capturable-selected');
      });
    },
    
    // Select a Chess Piece
    selectPiece: function(e) {
        let piece = e.target.classList.contains('fa') ? e.target.parentNode : e.target;
        let origin = !piece.parentNode.classList.contains('piece-selected') ? document.querySelector('.piece-selected') : false;
        if(!origin) {
          actions.clearPieceSelectors();
          piece.parentNode.classList.toggle('piece-selected');
        } else {
          let pieceColor = piece.getAttribute('data-color');
          let originColor = origin.querySelector('.chess-piece').getAttribute('data-color');
          if(pieceColor != originColor) {
            if(!piece.classList.contains('capturable-selected')) {
              piece.parentNode.classList.add('capturable-selected');
            } else {
              actions.movePiece(origin.querySelector('.chess-piece'));
            }
          }
        }
        actions.clearSquareSelectors();
        listeners.selectSquares();
        actions.consoleLog("[ACTION] Select Piece", {piece: piece, origin: origin});
    },
    
    // Select a Chess Square
    selectSquare: function(e) {
      let square = e.target;
      let spIsSelected = square.classList.contains('square-selected');
      let spIsCapturable = square.classList.contains('capturable-selected');
      let selectedPiece = document.querySelector('.piece-selected').querySelector('.chess-piece');
      if(spIsSelected) {
        if(selectedPiece.getAttribute('data-position') !== square.getAttribute('data-cell')) {
          actions.movePiece(e);
          actions.clearSquareSelectors();
        }
      } else {
        actions.clearSquareSelectors();
        square.classList.toggle('square-selected');
      }
      actions.consoleLog("[ACTION] Select Square", {e: e, square: square, piece: selectedPiece});
    },
    
    // Move a Piece from One Square to Another
    movePiece: function(e) {
      e.preventDefault();
      let newSquare = document.querySelector('.square-selected') !== null ? document.querySelector('.square-selected') : (document.querySelector('.capturable-selected') !== null ? document.querySelector('.capturable-selected') : false);
      let oldSquare = document.querySelector('.piece-selected');
      let piece = oldSquare.querySelector('.chess-piece');
      let pieceType = piece.getAttribute('data-type');
      let pieceColor = piece.getAttribute('data-color');
      let oldPos = oldSquare.getAttribute('data-cell');
      let newPos = newSquare ? newSquare.getAttribute('data-cell') : null;
  
      // Define movement rules based on piece type
      switch (pieceType) {
        case 'pawn':
          if (pieceColor === 'black') {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 1 && oldPos[0] === newPos[0]) {
              // Move one step forward for black pawn
              break;
            }
          } else {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 1 && oldPos[0] === newPos[0]) {
              // Move one step forward for white pawn
              break;
            }
          }
          break;
  
        case 'hero1':
          if (pieceColor === 'black') {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 2 && oldPos[0] === newPos[0]) {
              // Move two steps forward for black hero1
              break;
            } else if (Math.abs(parseInt(newPos[0].charCodeAt(0)) - parseInt(oldPos[0].charCodeAt(0))) === 2 && oldPos[1] === newPos[1]) {
              // Move two steps sideways for black hero1
              break;
            }
          } else {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 2 && oldPos[0] === newPos[0]) {
              // Move two steps forward for white hero1
              break;
            } else if (Math.abs(parseInt(newPos[0].charCodeAt(0)) - parseInt(oldPos[0].charCodeAt(0))) === 2 && oldPos[1] === newPos[1]) {
              // Move two steps sideways for white hero1
              break;
            }
          }
          break;
  
        case 'hero2':
          if (pieceColor === 'black') {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 2 && Math.abs(newPos.charCodeAt(0) - oldPos.charCodeAt(0)) === 2) {
              // Move two blocks diagonally for black hero2
              break;
            }
          } else {
            if (Math.abs(parseInt(newPos[1]) - parseInt(oldPos[1])) === 2 && Math.abs(newPos.charCodeAt(0) - oldPos.charCodeAt(0)) === 2) {
              // Move two blocks diagonally for white hero2
              break;
            }
          }
          break;
  
        // Add cases for other pieces as needed
      }
  
      if (newSquare) {
        newSquare.appendChild(piece);
        oldSquare.classList.remove('piece-selected');
        actions.clearSquareSelectors();
        actions.clearPieceSelectors();
        actions.consoleLog("[ACTION] Move Piece", {piece: piece, from: oldSquare, to: newSquare});
        actions.recordMove({piece: piece, from: oldSquare, to: newSquare});
      }
    },
    
    // Record the Board State
    recordBoard: function() { actions.consoleLog("[ACTION] Record Board");
      let board = [];
      document.querySelectorAll('.square').forEach((s, i) => {
        let cell = s.getAttribute('data-cell');
        let piece = s.querySelector('.chess-piece') ? s.querySelector('.chess-piece').getAttribute('data-type') : null;
        board.push({cell: cell, piece: piece});
      });
      database.push(board);
    },
    
    // Record a Move
    recordMove: function(data) { actions.consoleLog("[ACTION] Record Move", data);
      let moves = JSON.parse(localStorage.getItem('moves')) || [];
      moves.push(data);
      localStorage.setItem('moves', JSON.stringify(moves));
    }
  };
  
  // Register Listeners
  var listeners = {
    selectSquares: function() {
      document.querySelectorAll('.square').forEach((x, i) => {
        x.removeEventListener('click', actions.selectSquare);
        x.addEventListener('click', actions.selectSquare);
      });
    }
  };
  
  // Initial Setup
  actions.createBoard();
  actions.setPieces({black: {pawn1: {pos: 'a2'}, hero1: {pos: 'a4'}, hero2: {pos: 'a6'}}, white: {pawn1: {pos: 'b7'}, hero1: {pos: 'b5'}, hero2: {pos: 'b3'}}});
  document.addEventListener('DOMContentLoaded', (event) => {
    setupDragAndDrop();
});

function setupDragAndDrop() {
    const squares = document.querySelectorAll('.square');
    const pieces = document.querySelectorAll('.chess-piece');

    pieces.forEach(piece => {
        piece.setAttribute('draggable', true);
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
    });

    squares.forEach(square => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', drop);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.pieceId);
    event.target.classList.add('dragging');
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData('text/plain');
    const targetSquare = event.target.closest('.square');

    if (targetSquare) {
        const piece = document.querySelector(`.chess-piece[data-piece-id="${pieceId}"]`);
        const currentSquare = piece.closest('.square');

        if (validateMove(piece, currentSquare, targetSquare)) {
            targetSquare.appendChild(piece);
            actions.recordMove({ piece: piece, from: currentSquare, to: targetSquare });
        } else {
            console.log('Invalid move');
        }
    }
}



function validateMove(piece, currentSquare, targetSquare) {
    const pieceType = piece.innerText.split('-')[1]; // Example: 'B-p2' gives 'p2'
    switch (pieceType) {
        case 'p1': case 'p2': case 'p3': case 'p4': case 'p5': case 'p6': case 'p7': case 'p8':
            return validatePawnMove(currentSquare, targetSquare);
        case 'h1':
            return validateHero1Move(currentSquare, targetSquare);
        case 'h2':
            return validateHero2Move(currentSquare, targetSquare);
        default:
            return false;
    }
}

function validatePawnMove(currentSquare, targetSquare) {
    const [curFile, curRank] = [currentSquare[2], parseInt(currentSquare[3])];
    const [tarFile, tarRank] = [targetSquare[2], parseInt(targetSquare[3])];

    const fileDiff = Math.abs(curFile.charCodeAt(0) - tarFile.charCodeAt(0));
    const rankDiff = Math.abs(curRank - tarRank);

    return (fileDiff <= 1 && rankDiff <= 1) && (fileDiff + rankDiff > 0);
}

function validateHero1Move(currentSquare, targetSquare) {
    const [curFile, curRank] = [currentSquare[2], parseInt(currentSquare[3])];
    const [tarFile, tarRank] = [targetSquare[2], parseInt(targetSquare[3])];

    const fileDiff = Math.abs(curFile.charCodeAt(0) - tarFile.charCodeAt(0));
    const rankDiff = Math.abs(curRank - tarRank);

    return (fileDiff === 2 && rankDiff === 0) || (fileDiff === 0 && rankDiff === 2);
}

function validateHero2Move(currentSquare, targetSquare) {
    const [curFile, curRank] = [currentSquare[2], parseInt(currentSquare[3])];
    const [tarFile, tarRank] = [targetSquare[2], parseInt(targetSquare[3])];

    const fileDiff = Math.abs(curFile.charCodeAt(0) - tarFile.charCodeAt(0));
    const rankDiff = Math.abs(curRank - tarRank);

    return (fileDiff === 2 && rankDiff === 2);
}

piece.addEventListener('dragstart', (e) => {
    console.log('Drag started:', e.target);
});

piece.addEventListener('dragend', () => {
    console.log('Drag ended');
});


  
// Initialize the Board and Pieces
actions.createBoard();
actions.setPieces(pieces);
listeners.selectPieces();
