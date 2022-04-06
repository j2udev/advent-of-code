import numpy

class Bingo:
  def __init__(self, bingoInput, bingoBoards):
    self.bingoInput = bingoInput
    self.bingoBoards = bingoBoards

class BingoCell:
  def __init__(self, val, hit):
    self.val = val
    self.hit = hit

def readFile(fileName):
  with open(fileName, 'r', encoding='UTF-8') as file:
    bingoInput = file.readline().strip(",\n").split(",")
    bingoBoard = []
    bingoBoards = []
    while (line := file.readline()):
      bingoRow = line.strip("\n").split()
      if len(bingoRow) != 0:
        # bingoBoard.append(map(bingoCell, bingoRow))
        bingoBoard.append(list(map(lambda x: BingoCell(x, False), bingoRow)))
      else:
        if len(bingoBoard) > 0:
          bingoBoards.append(bingoBoard)
        bingoBoard = []
    # Need to append the boards collection here to account for an edge case
    # at the end of the file
    bingoBoards.append(bingoBoard)
  bingo = Bingo(bingoInput, bingoBoards)
  return bingo

def setBingo(bingoInput, bingoBoards):
  for num in bingoInput:
    for board in bingoBoards:
      for row in board:
        for cell in row:
          if num == cell.val: cell.hit = True

def checkBingo(bingoInput, bingoBoards):
  for board in bingoBoards:
    for row in board:
      row = list(map(lambda x: x.hit, row))
      if all(elem in [True, True, True, True, True] for elem in row):
        return board

def checkTransposedBingo(bingoInput, bingoBoards):
  for board in bingoBoards:
    for row in numpy.transpose(board):
      row = list(map(lambda x: x.hit, row))
      if all(elem in [True, True, True, True, True] for elem in row):
        return board

def calcBoard(num, board):
  sum = 0
  for row in board:
    for cell in row:
      if not cell.hit: sum += int(cell.val)
  return sum * int(num)

def findWinningBoard():
  # bingo = readFile("test-input.txt")
  bingo = readFile("input.txt")
  winningBoard = None
  winningNum = 0
  counter = 5
  while(not winningBoard):
    pool = bingo.bingoInput[0:counter]
    setBingo(pool, bingo.bingoBoards)
    rowwin = checkBingo(bingo.bingoInput, bingo.bingoBoards)
    colwin = checkTransposedBingo(bingo.bingoInput, bingo.bingoBoards)
    if rowwin:
      winningBoard = rowwin
      winningNum = pool[counter - 1]
    if colwin:
      winningBoard = colwin
      winningNum = pool[counter - 1]
    counter += 1
  print("Part 1: ", calcBoard(winningNum, winningBoard))

def findLosingBoard():
  # bingo = readFile("test-input.txt")
  bingo = readFile("input.txt")
  lastWinningBoard = None
  lastWinningNum = 0
  counter = 5
  while(len(bingo.bingoBoards) > 0):
    pool = bingo.bingoInput[0:counter]
    setBingo(pool, bingo.bingoBoards)
    rowwin = checkBingo(bingo.bingoInput, bingo.bingoBoards)
    colwin = checkTransposedBingo(bingo.bingoInput, bingo.bingoBoards)
    if rowwin:
      lastWinningBoard = rowwin
      lastWinningNum = pool[counter - 1]
      bingo.bingoBoards.remove(rowwin)
    if colwin and colwin != rowwin:
      lastWinningBoard = colwin
      lastWinningNum = pool[counter - 1]
      bingo.bingoBoards.remove(colwin)
    else:
      counter += 1
    rowwin = None
    colwin = None
  print("Part 2: ", calcBoard(lastWinningNum, lastWinningBoard))

findWinningBoard()
findLosingBoard()