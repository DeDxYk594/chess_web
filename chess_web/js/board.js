export class Board{
    constructor(controller);
    placeFigure(type,isWhite,pos);
    delegateMoveTo(isWhite);
    undoMove();
    sayGameOver(isTie,isWhiteWinner);
}