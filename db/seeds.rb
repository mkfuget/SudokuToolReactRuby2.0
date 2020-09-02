# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puzzletypes = Puzzletype.create([
    {
        name: "Classic Easy",
        description: "Classic Sudoku Rules, each row column and square need to contain all of the numbers 1-9, thus any row, column or square cannot have two of the
        same number. Difficulty should be manageable for all users."
    },
    {
        name: "Classic Moderate",
        description:"Classic Sudoku Rules, each row column and square need to contain all of the numbers 1-9, thus any row, column or square cannot have two of the
        same number. An increased challenge for more intermediate Sudoku players."

    },
    {
        name: "Classic Hard",
        description:"Classic Sudoku Rules, each row column and square need to contain all of the numbers 1-9, thus any row, column or square cannot have two of the
        same number. Highest difficulty suitable for the most seasoned of users."

    },
    {
        name: "Cross Sudoku",
        description: "In addition to the classic sudoku rules, (each row column and square need to contain all of the numbers 1-9, thus any row, column or 
        square cannot have two of the same number) each main diagonal (top right square through bottom left square and top left square through bottom right square)
        Moderate difficulty puzzles with an additional restriction that can "

    },
    {
        name: "Miracle Sudoku",
        description: "In addition to the classic sudoku rules, (each row column and square need to contain all of the numbers 1-9, thus any row, column or 
        square cannot have two of the same number) you are prevented from placing matching numbers in any adjacent or diagonal adjacent squares, or squares that are 
        two moves away in one direction and one in another direction (like a chess knight move). Ruleset allows for a unique experience and solveable puzzles with a 
        very sparse initial board state"


    }


])

puzzles = Puzzle.create([
    {
        name: "Classic Easy 1",
        author: "MKFuget",
        difficulty: "3",
        data: "..43..2.9..5..9..1.7..6..43..6..2.8719...74...5..83...6.....1.5..35.869..4291.3..",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Easy 2",
        author: "MKFuget",
        difficulty: "3",
        data: ".4.1...5.1.7..396.52...8..........17...9.68..8.3.5.62..9..6.5436...8.7..25..971..",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Easy 3",
        author: "MKFuget",
        difficulty: "3",
        data: "6..12.384..8459.72.....6..5...264.3..7..8...694...3...31.....5..897.....5.2...19.",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Easy 4",
        author: "MKFuget",
        difficulty: "3",
        data: "4972.....1..4....5....16.9862.3...4.3..9.......1.726....2..587....6....453..97.61",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Easy 5",
        author: "MKFuget",
        difficulty: "3",
        data: "..591.3.8..94.3.6..275..1...3....2.1...82...7..6..7..4....8....64.15.7..89....42.",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Easy 6",
        author: "MKFuget",
        difficulty: "3",
        data: "1....5..738.9.....6.....48.82...1.75.4.76..2..69..2..1..5.39..4....2.1......46352",
        Puzzletype: puzzletypes.first
    },
    {
        name: "Classic Moderate 1",
        author: "MKFuget",
        difficulty: "3",
        data: "..9.6543...7...8..6..1.8.2...3.9...25.14.396.8.4...1...3.5.9..7.56.8.....7.24..9.",
        Puzzletype: puzzletypes.second
    },

    {
        name: "Classic Moderate 2",
        author: "MKFuget",
        difficulty: "3",
        data: "......6577.24..1..35...6...5...2...921.3..5...471.9..8..876..9.9..5.2.3..3..182.6",
        Puzzletype: puzzletypes.second
    },
    {
        name: "Classic Moderate 3",
        author: "MKFuget",
        difficulty: "3",
        data: "5.3.7.19......675..4719.6..4...38...95.2..3......1..72...8.4..13....186..8672...5",
        Puzzletype: puzzletypes.second
    },
    {
        name: "Classic Moderate 4",
        author: "MKFuget",
        difficulty: "3",
        data: ".6.72.9.8.84..3..17..1...659....8....71.6......2.1..34...2..7.6.3..498..215....9.",
        Puzzletype: puzzletypes.second
    },
    {
        name: "Classic Moderate 5",
        author: "MKFuget",
        difficulty: "3",
        data: "..4.83..2.51..43......9671.12.8....6.4....5..83.6.79...6.3.9.4...7...2.5.9..5.8.3",
        Puzzletype: puzzletypes.second
    },
    {
        name: "Classic Hard 1",
        author: "MKFuget",
        difficulty: "3",
        data: "....6.28.7.9..1...86.32..749...4.51...719.34...3..6..2..297....3..8..9.55......21",
        Puzzletype: puzzletypes[3]
    },
    {
        name: "Classic Hard 2",
        author: "MKFuget",
        difficulty: "3",
        data: "..43.....89.2..67.7..9...5.5....814..7..32.6.6....13.8..175.9....5.4..1298...6..5",
        Puzzletype: puzzletypes[3]
    },
    {
        name: "Classic Hard 3",
        author: "MKFuget",
        difficulty: "3",
        data: "..8.7.1..12..9..54.....3.2.6.4.1..8953.78..1...9.623...8..4.6.7..75.6...4..8....2",
        Puzzletype: puzzletypes[3]
    }


])