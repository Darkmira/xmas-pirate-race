$(function () {
    init();
    initPath();
    initBoats();
    initUI();
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
    for (var i = 0; i < 3; i++) {
        Poseidon.addBoat('img/pirate-boat-'+[1, 2, 4][i]+'.png');
    }
}

function initUI() {
    $('#ui .team').each(function () {
        var $team = $(this);
        var $btnMore = $team.find('.more');
        var $btnLess = $team.find('.less');
        var boat = parseInt($team.data('boat'));
        
        $btnMore.click(function () {
            Score.update(boat, 1);
        });
        
        $btnLess.click(function () {
            Score.update(boat, -1);
        });
    });
}

function start() {
    Poseidon.createWaves(4);
}
