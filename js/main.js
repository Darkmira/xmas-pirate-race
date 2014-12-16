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
        new Point(536, 380),
        new Point(508, 474),
        new Point(549, 540),
        new Point(671, 605),
        new Point(709, 671),
        new Point(679, 720),
        new Point(560, 792),
        new Point(527, 854),
        new Point(554, 920),
        new Point(727, 1064),
        new Point(979, 1226),
        new Point(1195, 1333),
        new Point(1298, 1362),
        new Point(1474, 1317),
        new Point(1568, 1237),
        new Point(1595, 1149),
        new Point(1652, 1061),
        new Point(1716, 1073),
        new Point(1779, 1113),
        new Point(1815, 1063),
        new Point(1802, 970),
        new Point(1695, 867),
        new Point(1667, 787),
        new Point(1701, 663),
        new Point(1789, 619),
        new Point(1882, 662),
        new Point(1959, 617),
        new Point(2037, 492)
    ]);
}

function initBoats() {
    var boatImg = [
        'img/pirate-boat-1.png',
        'img/pirate-boat-2.png',
        'img/pirate-boat-4.png',
        'img/pirate-boat-3.png',
        'img/default.png'
    ];
    
    for (var i = 0; i < Config.boatsNumber; i++) {
        Poseidon.addBoat(boatImg[i]);
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
    
    setTimeout(function () {
        Persister.load();
        Persister.autoSave();
    }, 1000);
}
