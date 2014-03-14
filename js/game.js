function Game() {
    var game = {
        application: {
            eventStack: [],
            score: 0,
            ui: {
                score: function () {
                    return $('.gameScore');
                },
                loader: {
                    object: $('.loaderWrapper'),
                    hide: function () {
                        this.object.fadeOut(1000);
                    },
                    show: function () {
                        this.object.show();
                    }
                },
                wrapper: function () {
                    return $('.appWrapper');
                },
                flips: function () {
                    return $('.front');
                }
            },
            randomize: function (min, max) {
                return Math.round(Math.random() * (max - min) + min);
            },
            startGame: function () {
                var flips = this.ui.flips(),
                    that = this;
                $(flips).each(function (index) {
                    $(this).on('click', function (event) {
                        if (that.eventStack.length < 2) {
                            that.eventStack.push($(this).parent().parent());
                            if (that.eventStack.length === 2) {
                                if ($(that.eventStack[0]).attr('class') === $(that.eventStack[1]).attr('class')) {
                                    $(that.eventStack[0]).fadeOut(1000);
                                    $(that.eventStack[1]).fadeOut(1000);
                                    that.score = that.score + 100;
                                    that.bindScore();
                                    that.eventStack = [];
                                } else {
                                    $(that.eventStack[0]).children().toggleClass('flipped');
                                    $(that.eventStack[1]).children().toggleClass('flipped');
                                    that.eventStack = [];
                                }
                            }
                        }
                    });
                });
            },
            parseGameData: function () {
                var that = this,
                    movieArray = [],
                    items = that.randomize(6, 12),
                    i;
                var JSON = $.ajax({
                    url: "words.json",
                    dataType: 'json'
                }).done(function (data) {
                    //fill random data from JSON
                    for (i = 0; i <= items; i++) {
                        movieArray[i] = data.data[that.randomize(i, items)];
                        that.ui.wrapper().append("<div class='flipWrapper tileItem " + movieArray[i].phrase + "'><div class='card'><div class='face front'></div><div class='face back'><img src=" + movieArray[i].image + "></div></div></div>");
                    }
                });
            },
            onLoadComplete: function (params) {
                var that = this;
                $(window).load(function () {
                    setTimeout(function () {
                        if (params.hideLoader) {
                            that.ui.loader.hide();
                        }
                        if (params.animateTiles) {
                            that.animateTiles();
                        }
                        if (params.start) {
                            that.startGame();
                        }
                        if (params.showScore) {
                            that.bindScore();
                        }
                    }, 1000);
                });
            },
            animateTiles: function () {
                var flips = this.ui.flips();
                $(flips).on('click', function () {
                    $(this).parent().toggleClass('flipped');
                });
            },
            bindScore: function () {
                var scoreElement = this.ui.score()[0];
                $(scoreElement).html("<p>" + this.score + "</p>");
            }
        }
    };
    return game;
}
