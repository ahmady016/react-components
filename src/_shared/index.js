export const faces = [ 'one', 'two', 'three', 'four', 'five', 'six' ]

export const getFace = value => {
  switch (value) {
    case 1:
      return faces[0]
    case 2:
      return faces[1]
    case 3:
      return faces[2]
    case 4:
      return faces[3]
    case 5:
      return faces[4]
    case 6:
      return faces[5]
    default:
      return faces[0]
  }
}
