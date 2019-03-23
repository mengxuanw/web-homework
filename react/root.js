//井字棋
var React = require('react')
var ReactDOM = require('react-dom')

function Square(props){
    const style1 = {backgroundColor: '#fff'}
    const style2 = {backgroundColor: '#f00'}
    return(
        <button style={props.haveColor == -1 ? style1 : style2} 
                       className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component{
    renderSquare(i){
        //传递一个名为value的prop到square中
        return <Square key={i} 
                       haveColor={this.props.lines.indexOf(i)}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>
    }
    
    render(){
        var board = []
        for(var i = 0; i < 3; i ++){
            var board_row = []
            for(var j = i*3; j < i*3 + 3; j++){
                board_row.push(this.renderSquare(j))
            }
            board.push(<div key={i} className="board-row">{board_row}</div>)
        }
        return(
            <div>
                {board}
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                x: 0,
                y: 0,
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    } 

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length -1]
        const squares = current.squares.slice()
        if(calculateWinner(squares) || squares[i]){
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
                x: Math.floor(i/3),
                y: i%3,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        })
    }

    handleSort(){
        let stepNumber = this.state.stepNumber;
        let xisnext = this.state.xIsNext;
        if(stepNumber == this.state.history.length-1){
            stepNumber = 1
            xisnext = false
        }
        else{
            stepNumber = stepNumber +1
            xisnext = !xisnext
        }
        this.setState({
            stepNumber: stepNumber,
            xIsNext: xisnext,
        })
    }

    render(){
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        const btnStyle1 = {backgroundColor: '#ff0'}
        const btnStyle2 = {backgroundColor: '#fff'}
        const moves = history.map((step, move) =>{
            const desc = move ?
                'Go to move #' + move + '(' + history[move].x + ',' + history[move].y + ')':
                'Go to game start'
            return(
                <li key={move}>
                    <button style={move == this.state.stepNumber ? btnStyle1 : btnStyle2} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let lines = [-1,-1,-1]
        let status
        if(winner){
            status = 'Winner: ' + winner.winner
            //高亮显示连成一线的3颗棋子 winner.lines
            lines = winner.lines
        }else{
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board  squares={current.squares}
                            lines={lines}
                            onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <button onClick={() => this.handleSort()}>升序</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('example')
)

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i = 0; i < lines.length; i ++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
        {
            var obj = {
                winner: squares[a],
                lines: lines[i],
            }
            return obj
        }
    }
    return null
}

function isDraw(squares){
    for(let i = 0; i < squares.length; i ++){
        if(squares[i] == null)
            return false
    }
    return true
}
