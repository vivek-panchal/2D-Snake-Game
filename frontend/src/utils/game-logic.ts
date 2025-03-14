interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

export const DIRECTIONS: Record<'UP' | 'DOWN' | 'LEFT' | 'RIGHT', Direction> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const CELL_SIZE = 20;
export const GAME_SPEED = 100; 

// Check if two positions are equal
export const arePositionsEqual = ({ pos1, pos2 }: { pos1: Position; pos2: Position }): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

// Check if a position is in an array of positions
export const isPositionInArray = (position: Position, array: Position[]): boolean => {
  return array.some((item) => arePositionsEqual({ pos1: item, pos2: position }));
};

// Generate random position within bounds, avoiding obstacles
export const generateRandomPosition = (
  width: number,
  height: number,
  avoid: Position[] = []
): Position => {
  const gridWidth = Math.floor(width / CELL_SIZE);
  const gridHeight = Math.floor(height / CELL_SIZE);
  
  let position;
  let isValidPosition = false;
  
  while (!isValidPosition) {
    position = {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight),
    };
    
    isValidPosition = !isPositionInArray(position, avoid);
  }
  
  return position || { x: 0, y: 0 };
};

export const generateWalls = (
  width: number,
  height: number,
  count: number,
  avoid: Position[] = []
): Position[] => {
  const walls = [];
  
  for (let i = 0; i < count; i++) {
    const wallPosition = generateRandomPosition(width, height, [...avoid, ...walls]);
    walls.push(wallPosition);
  }
  
  return walls;
};

// Check for collisions with walls or self
export const checkCollision = (
  head: Position,
  snake: Position[],
  walls: Position[],
  width: number,
  height: number
): boolean => {
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= Math.floor(width / CELL_SIZE) ||
    head.y >= Math.floor(height / CELL_SIZE)
  ) {
    return true;
  }
  
  if (isPositionInArray(head, snake.slice(1))) {
    return true;
  }
  
  if (isPositionInArray(head, walls)) {
    return true;
  }
  
  return false;
};

// Move the snake
export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };
  
  head.x += direction.x;
  head.y += direction.y;
  
  newSnake.unshift(head);
  
  newSnake.pop();
  
  return newSnake;
};

// Check if snake eats food
export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return arePositionsEqual({ pos1: head, pos2: food });
};

// Grow snake by adding a segment
export const growSnake = (snake: Position[]): Position[] => {
  const newSnake = [...snake];
  
  const lastSegment = newSnake[newSnake.length - 1];
  newSnake.push({ ...lastSegment });
  
  return newSnake;
};