import { useState, useEffect, useRef, useCallback } from 'react';
import { addScore } from '../utils/api';
import useAuthStore from '../hooks/useAuth';
import {
    DIRECTIONS,
    CELL_SIZE,
    GAME_SPEED,
    moveSnake,
    generateRandomPosition,
    generateWalls,
    checkCollision,
    checkFoodCollision,
    growSnake,
} from '../utils/game-logic';
import toast from 'react-hot-toast';

interface Position {
    x: number;
    y: number;
}

interface Direction {
    x: -1 | 0 | 1;
    y: -1 | 0 | 1;
}

const GameBoard = () => {
    // Board dimensions
    const boardWidth = 600;
    const boardHeight = 400;

    // Game state
    const [snake, setSnake] = useState<Position[]>([
        { x: 5, y: 5 }, // Head
        { x: 4, y: 5 }, // Body
        { x: 3, y: 5 }, // Tail
    ]);
    const [direction, setDirection] = useState<Direction>(DIRECTIONS.RIGHT);
    const [nextDirection, setNextDirection] = useState<Direction>(DIRECTIONS.RIGHT);
    const [food, setFood] = useState<Position | null>(null);
    const [walls, setWalls] = useState<Position[]>([]);
    const [score, setScore] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const gameInterval = useRef<ReturnType<typeof setTimeout> | null>(null);
    const boardRef = useRef<HTMLElement | null>(null);

    const { user } = useAuthStore();

    // Initialize game
    const initializeGame = useCallback(() => {
        // Reset snake
        const initialSnake = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 },
        ];
        setSnake(initialSnake);

        // Reset direction
        setDirection(DIRECTIONS.RIGHT);
        setNextDirection(DIRECTIONS.RIGHT);

        const newWalls = generateWalls(boardWidth, boardHeight, 10, initialSnake);
        setWalls(newWalls);

        const newFood = generateRandomPosition(
            boardWidth,
            boardHeight,
            [...initialSnake, ...newWalls]
        );
        setFood(newFood);

        setScore(0);

        setIsGameOver(false);
        setIsPaused(false);
        setIsGameStarted(true);
    }, [boardWidth, boardHeight]);

    const gameLoop = useCallback(() => {
        if (isPaused || isGameOver || !isGameStarted) return;

        setDirection(nextDirection);

        const newSnake = moveSnake([...snake], direction);
        const newHead = newSnake[0];

        if (checkCollision(newHead, snake, walls, boardWidth, boardHeight)) {
            setIsGameOver(true);
            return;
        }

        if (food && checkFoodCollision(newHead, food)) {
            const grownSnake = growSnake(newSnake);
            setSnake(grownSnake);

            setScore(prevScore => prevScore + 10);

            const newFood = generateRandomPosition(
                boardWidth,
                boardHeight,
                [...grownSnake, ...walls]
            );
            setFood(newFood);
        } else {
            setSnake(newSnake);
        }
    }, [
        snake,
        direction,
        nextDirection,
        food,
        walls,
        boardWidth,
        boardHeight,
        isPaused,
        isGameOver,
        isGameStarted
    ]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isGameStarted || isGameOver) return;

        switch (e.key) {
            case 'ArrowUp':
                if (direction !== DIRECTIONS.DOWN) {
                    setNextDirection(DIRECTIONS.UP);
                }
                break;
            case 'ArrowDown':
                if (direction !== DIRECTIONS.UP) {
                    setNextDirection(DIRECTIONS.DOWN);
                }
                break;
            case 'ArrowLeft':
                if (direction !== DIRECTIONS.RIGHT) {
                    setNextDirection(DIRECTIONS.LEFT);
                }
                break;
            case 'ArrowRight':
                if (direction !== DIRECTIONS.LEFT) {
                    setNextDirection(DIRECTIONS.RIGHT);
                }
                break;
            case ' ':
                setIsPaused(prev => !prev);
                break;
            default:
                break;
        }
    }, [direction, isGameStarted, isGameOver]);

    const submitScore = async () => {
        if (!user) {
            toast.error(
                'Not logged in, You need to be logged in to save your score',
                { duration: 3000 }
            );
            return;
        }

        try {
            await addScore(score);
            toast.success(`Your score of ${score} has been saved!`, { duration: 3000 });

        } catch (error) {
            toast.error('Failed to save your score', { duration: 3000 });
            console.error('Error saving score:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (isGameStarted && !isGameOver && !isPaused) {
            gameInterval.current = setInterval(gameLoop, GAME_SPEED);
        }

        return () => {
            if (gameInterval.current) {
                clearInterval(gameInterval.current);
            }
        };
    }, [isGameStarted, isGameOver, isPaused, gameLoop]);

    useEffect(() => {
        boardRef.current = document.getElementById('game-board');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-4">
            <h2 className="text-3xl font-bold mb-4 text-green-500">
                Snake Game
            </h2>

            <div className="flex justify-between w-full max-w-[600px] mb-4">
                <p className="text-xl font-bold">
                    Score: {score}
                </p>

                {isGameStarted && !isGameOver && (
                    <button
                        className={`px-4 py-1 rounded-md ${isPaused
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => setIsPaused(!isPaused)}
                    >
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                )}
            </div>

            <div
                id="game-board"
                className="relative w-[600px] h-[400px] bg-gray-100 border-2 border-gray-300 rounded-md overflow-hidden"
            >
                {!isGameStarted && !isGameOver && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 text-white z-10">
                        <div className="flex flex-col space-y-4 items-center">
                            <h3 className="text-2xl font-bold">Ready to Play?</h3>
                            <p>Use arrow keys to move the snake</p>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                                onClick={initializeGame}
                            >
                                Start Game
                            </button>
                        </div>
                    </div>
                )}

                {/* Render snake */}
                {snake.map((segment, index) => (
                    <div
                        key={`snake-${index}`}
                        style={{
                            position: 'absolute',
                            top: `${segment.y * CELL_SIZE}px`,
                            left: `${segment.x * CELL_SIZE}px`,
                            width: `${CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                        }}
                        className={`${index === 0 ? "bg-green-500" : "bg-green-400"} rounded-sm`}
                    ></div>
                ))}

                {/* Render food */}
                {food && (
                    <div
                        style={{
                            position: 'absolute',
                            top: `${food.y * CELL_SIZE}px`,
                            left: `${food.x * CELL_SIZE}px`,
                            width: `${CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                        }}
                        className="bg-red-500 rounded-full"
                    ></div>
                )}

                {/* Render walls */}
                {walls.map((wall, index) => (
                    <div
                        key={`wall-${index}`}
                        style={{
                            position: 'absolute',
                            top: `${wall.y * CELL_SIZE}px`,
                            left: `${wall.x * CELL_SIZE}px`,
                            width: `${CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                        }}
                        className="bg-gray-700 rounded-sm"
                    ></div>
                ))}
            </div>

            {/* Game over modal */}
            {isGameOver && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                        <div className="px-6 py-4">
                            <h3 className="text-2xl font-bold text-center">Game Over!</h3>

                            <div className="mt-4 flex flex-col space-y-4 items-center">
                                <p className="text-lg text-center">
                                    Your final score: <strong>{score}</strong>
                                </p>

                                <p className="text-md text-center text-gray-600">
                                    {score < 50
                                        ? "Keep practicing! You'll get better."
                                        : score < 100
                                            ? "Well done! Can you beat your score?"
                                            : "Amazing score! You're a Snake master!"}
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 flex justify-center space-x-3">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                                onClick={initializeGame}
                            >
                                Play Again
                            </button>
                            <button
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-md transition duration-300"
                                onClick={submitScore}
                            >
                                Save Score
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameBoard;