var React = require('react')
var ReactDOM = require('react-dom')

class Cell extends React.Component{
    render(){
        let style;
        if(this.props.image == 0){
            style = {
                top: getPos(this.props.pos_x),
                left: getPos(this.props.pos_y),
            }
        }else{
            style = {
                top: getPos(this.props.pos_x),
                left: getPos(this.props.pos_y),
                backgroundImage: getBackgroundImage(this.props.image),
                backgroundSize: '100px 100px',
            }
        }
        return (
            <div className="grid-cell" style={style}></div>
        )
    }
}
function initCells(){
    var cells = new Array()
    for(let i = 0; i < 4; i ++){
        cells[i] = new Array()
        for(let j = 0; j < 4; j ++){
            cells[i][j] = 0
        }
    }
    return cells
}
class Board extends React.Component{
    constructor(props){
        super(props)
        //为组件自定义方法绑定this到组件实例，很重要
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            score: 0,
            cells: initCells(),
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown)
    }
    gameover(){
        var score = this.state.score
        score ++
        this.setState({
            score: score 
        })
        this.props.updateScore(this.state.score)
    }
    moveLeft(){
        var cells = this.state.cells.slice()
        if(!canMoveLeft(cells))
            return false
        for(let i = 0; i < 4; i ++){
            for(let j = 1; j < 4; j ++){
                if(cells[i][j] != 0){
                    for(let k = 0; k < j; k ++){
                        if(cells[i][k] == 0 && noBlockHorizontal(i,k,j,cells)){
                            //showMoveAnimation(i,j,i,k)
                            cells[i][k] = cells[i][j]
                            cells[i][j] = 0
                            continue
                        }else if(cells[i][k] == cells[i][j] && noBlockHorizontal(i,k,j,cells)){
                            //showMoveAnimation(i,j,i,k)
                            cells[i][k] += cells[i][j]
                            cells[i][j] = 0
                            continue
                        }
                    }
                }
            }
        }
        this.setState({
            cells: cells
        })
        return true
    }

    handleKeyDown(e){
        var keyCode = e.which || e.keyCode
        switch(keyCode){
            case 37:
                //这里的this指向组件实例，因为在构造函数中，将handleKeyDown绑定this到组件实例中了
                //如果没有绑定，这里的this不确定，所以是undefined，所以会提示moveLeft不是function
                this.moveLeft()
                break
            case 38:
                this.gameover()
                break
            case 39:
                alert(3)
                break
            case 40:
                alert(5)
                break
            default:break
        }
    }
    generateOneNumber(){
        var cells = this.state.cells.slice()
        var randx = parseInt(Math.floor(Math.random()*4))
        var randy = parseInt(Math.floor(Math.random()*4))

        var times = 0
        while(times < 50){
            if(this.state.cells[randx][randy] == 0)
                break
            randx = parseInt(Math.floor(Math.random()*4))
            randy = parseInt(Math.floor(Math.random()*4))
        }
        if(times == 50){
            for(let i = 0; i < 4; i ++){
                for(let j = 0; j < 4; j ++){
                    if(cells[i][j] == 0)
                        randx = i
                        randy = j
                }
            }
        }
        var randNumber = Math.random() < 0.5 ? 2 : 4
        cells[randx][randy] = randNumber
        this.setState({
            cells: cells
        })
    }
    newGame(){
        //这里的this指向组件实例
        this.generateOneNumber()
        //两次更新只会生成一个数字，大概与state的更新合并有关
        //this.generateOneNumber()
    }
    render(){
        var board = []
        for(let i = 0; i < 4; i ++){
            for(let j = 0; j < 4; j ++){
                board.push(<Cell key={i*4+j} pos_x={i} pos_y={j} image={0}/>)
                //numberCell
                board.push(<Cell key={i*4+j+16} pos_x={i} pos_y={j} image={this.state.cells[i][j]}/>)
            }
        }
        return (
            <div>
                <button className="initbtn" onClick={() => this.newGame()}>new game</button>
                <div id="grid-container">
                    {board}                             
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            highest_score: 0
        }
    }
    updateScore(score){
        this.setState({
            highest_score: score
        })
    }
    render(){     
        return (
            <div>
                <header>
                    <p>{this.state.highest_score}</p>
                </header>
                <Board updateScore={this.updateScore.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('example')
)
