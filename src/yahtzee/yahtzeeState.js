
const DICES_LENGTH = 5
const ROLLS_LENGTH = 3
const getScoreHistory = () => {
  const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory'))
  return (scoreHistory && scoreHistory.length)
    ? scoreHistory.sort((a,b) => new Date(b.date) - new Date(a.date))
    : []
}

//#region evaluate score ...
// get the number of frequency in dices arr
function _frequency(arr) {
  const map = new Map()
  arr.forEach( item => map.set(item, (map.get(item) || 0)+1))
  return Array.from(map.values())
}
// sum all numbers in dices arr
function _sum(arr) {
  return arr.reduce( (total, item) => total+item )
}
// count the frequency of a given value in dices arr
function _count(arr, value) {
  return arr.filter(item => item === value).length
}
// sum all same numbers in dices arr
const _totalOneNumber = ({ value }) => (arr) => value * _count(arr, value)
// function to sum all same numbers per each value
const _ones = _totalOneNumber({ value: 1 })
const _twos = _totalOneNumber({ value: 2 })
const _threes = _totalOneNumber({ value: 3 })
const _fours = _totalOneNumber({ value: 4 })
const _fives = _totalOneNumber({ value: 5 })
const _sixes = _totalOneNumber({ value: 6 })
// sum distribution of a given count
const _sumDistribution = ({ count }) => (arr) => _frequency(arr).some(n => n >= count) ? _sum(arr) : 0
// sum distribution of a given count for each [3 OfKind, 4 OfKind]
const _threeOfKind = _sumDistribution({ count: 3 })
const _fourOfKind = _sumDistribution({ count: 4 })
// fullHouse
const _fullHouse = (arr) => {
  const freq = _frequency(arr)
  return freq.includes(2) && freq.includes(3) ? 30 : 0
}
// smallStraight
const _smallStraight = (arr) => {
  const uniqueDices = new Set(arr)
  if(uniqueDices.size < 4)
    return 0
  if(
      (uniqueDices.has(1) && uniqueDices.has(2) && uniqueDices.has(3) && uniqueDices.has(4)) ||
      (uniqueDices.has(2) && uniqueDices.has(3) && uniqueDices.has(4) && uniqueDices.has(5)) ||
      (uniqueDices.has(3) && uniqueDices.has(4) && uniqueDices.has(5) && uniqueDices.has(6))
    )
    return 40
}
// largeStraight
const _largeStraight = (arr) => {
  const uniqueDices = new Set(arr)
  return (uniqueDices.size === 5 && (!uniqueDices.has(1) || !uniqueDices.has(6))) ? 50 : 0
}
// yahtzee
const _yahtzee = (arr) => _frequency(arr)[0] === 5 ? 60 : 0

const evalRules = {
  'Ones': _ones,
  'Twos': _twos,
  'Threes': _threes,
  'Fours': _fours,
  'Fives': _fives,
  'Sixes': _sixes,
  'Chance': _sum,
  'Three_Of_Kind': _threeOfKind,
  'Four_Of_Kind': _fourOfKind,
  'Full_House': _fullHouse,
  'Small_Straight': _smallStraight,
  'Large_Straight': _largeStraight,
  'Yahtzee': _yahtzee
}
//#endregion

//#region game actions ...
export const rollDice = (dispatch) => {
  dispatch({ type: 'Toggle_IsRolling' })
  setTimeout(()=> {
    dispatch({ type: 'Roll_Dice' })
    dispatch({ type: 'Disable_Roll' })
    dispatch({ type: 'Toggle_IsRolling' })
  }, 1000)
}
export const evalScore = (ruleName, dispatch, scores) => {
  dispatch({ type: 'Eval_Score', payload: { ruleName } })
  dispatch({ type: 'Total_Score' })
  dispatch({ type: 'Is_Game_Over' })
  if(scores.some(score => score.value === -1))
    rollDice(dispatch)
}
export const newGame = (dispatch) => {
  dispatch({ type: 'New_Game' })
  rollDice(dispatch)
}
//#endregion

//#region game state ...
export const initialState = {
  scoreHistory: getScoreHistory(),
  isGameOver: false,
  score: 0,
  remainingRolls: ROLLS_LENGTH,
  isRolling: false,
  dices: Array.from({ length: DICES_LENGTH }).fill({
    value: 1,
    locked: false
  }),
  scores: [
    {
      name: 'Ones',
      description: '1 point per each 1',
      value: -1
    },
    {
      name: 'Twos',
      description: '2 points per each 2',
      value: -1
    },
    {
      name: 'Threes',
      description: '3 points per each 3',
      value: -1
    },
    {
      name: 'Fours',
      description: '4 points per each 4',
      value: -1
    },
    {
      name: 'Fives',
      description: '5 points per each 5',
      value: -1
    },
    {
      name: 'Sixes',
      description: '6 points per each 6',
      value: -1
    },
    {
      name: 'Chance',
      description: 'Sum of All dice',
      value: -1
    },
    {
      name: 'Three_Of_Kind',
      description: 'Sum all if found 3 same dice',
      value: -1
    },
    {
      name: 'Four_Of_Kind',
      description: 'Sum all if found 4 same dice',
      value: -1
    },
    {
      name: 'Full_House',
      description: '30 points if get same 2 and same 3 dice',
      value: -1
    },
    {
      name: 'Small_Straight',
      description: '40 points if 4 dice are in sequence',
      value: -1
    },
    {
      name: 'Large_Straight',
      description: '50 points if 5 dice are in sequence',
      value: -1
    },
    {
      name: 'Yahtzee',
      description: '60 points if All dice are the same',
      value: -1
    }
  ]
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'New_Game':
      return {
        ...initialState,
        scoreHistory: getScoreHistory()
      };
    case 'Is_Game_Over':
      if(state.scores.every(score => score.value > -1)) {
        let _scoreHistory = state.scores.every(score => score.value > -1)
          ? [...state.scoreHistory, { date: Date.now(), value: state.score }]
          : state.scoreHistory
        localStorage.setItem('scoreHistory', JSON.stringify(_scoreHistory))
      }
      return {
        ...state,
        isGameOver: state.scores.every(score => score.value > -1)
      };
    case 'Total_Score':
      return {
        ...state,
        score: state.scores
                .filter(score => score.value > 0)
                .map(score => score.value)
                .reduce((total,score) => total+score, 0)
      };
    case 'Toggle_IsRolling':
      return {
        ...state,
        isRolling: !state.isRolling
      };
    case 'Disable_Roll':
      return {
        ...state,
        dices: (!state.remainingRolls)
          ? state.dices.map(dice => ({
              ...dice,
              locked:true
            }))
          : state.dices
      };
    case 'Roll_Dice':
      return {
        ...state,
        remainingRolls: state.remainingRolls-1,
        dices: state.dices.map( dice => {
          if(!dice.locked)
            return {
              ...dice,
              value: Number.between(1,6)
            }
          return dice
        })
      };
    case 'Toggle_Locked':
      return {
        ...state,
        dices: state.dices.map( (dice, i) => {
          if(i === payload.index)
            return {
              ...dice,
              locked: !dice.locked
            }
          return dice
        })
      };
      case 'Eval_Score':
        return {
          ...state,
          remainingRolls: ROLLS_LENGTH,
          dices: state.dices.map(dice => {
            return {
              ...dice,
              locked: false
            }
          }),
          scores: state.scores.map( (score) => {
            if(score.name === payload.ruleName)
              return {
                ...score,
                value: evalRules[payload.ruleName](state.dices.map(dice => dice.value))
              }
            return score
          })
        };
    default:
      return state;
  }
}
//#endregion
