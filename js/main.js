$(function () {
    init();
    initPath();
    initBoats();
    start();
});

function init() {
    Poseidon.$waves = $('#waves');
}

function initPath() {
    Poseidon.seaPath = new Path([
        new Point(579, 1011),
        new Point(503, 1041),
        new Point(418, 1049),
        new Point(329, 1040),
        new Point(240, 1019),
        new Point(168, 975),
        new Point(130, 901),
        new Point(134, 859),
        new Point(159, 826),
        new Point(202, 805),
        new Point(240, 790),
        new Point(405, 747),
        new Point(548, 664),
        new Point(662, 586),
        new Point(689, 543),
        new Point(689, 511),
        new Point(657, 481),
        new Point(619, 466),
        new Point(558, 401),
        new Point(543, 322),
        new Point(552, 231),
        new Point(564, 204)
    ]);
}

function initBoats() {
    var boat = new Boat(Poseidon.seaPath);
    
    Poseidon.$waves.append(boat.getBoatItem());
    
    Poseidon.boats.push(boat);
}

function start() {
    Poseidon.createWaves(4);
}
