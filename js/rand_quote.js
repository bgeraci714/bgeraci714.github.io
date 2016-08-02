$(document).ready(function() {
    $("#getMessage").on("click", function(){
        var curQuote = "";
        var curAuthor = "";
        var jqXHR = $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("X-Mashape-Key", 'ggWzY9h8uAmshKW1P72XiRqxzc3Lp16mLG2jsnluqNcjL48CPM');
            },
            dataType: "json",
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
            success: function(data) {
                console.log("Successfully read in quote!");
            },
            complete: function(jqXHR, textStatus) {
                curQuote = jqXHR.responseJSON.quote;
                curAuthor = jqXHR.responseJSON.author;
                console.log(jqXHR.responseJSON, textStatus);

                var COLORS = ["#AB82FF","#7171C6","#CD8162","#6E8B3D", "#CDCDC1", "#DAA520"];
                var randColor = Math.floor(Math.random() * COLORS.length);

                $("body").hide().show();
                $("body").css("background-color", COLORS[randColorIndex]);
                $(".message").css("color", COLORS[randColorIndex]);

                $(".message").hide().html("\"" + curQuote + "\" <br /><br /> -" + curAuthor).fadeIn();

                $("#twitter-button").attr("href", function() {
                    var twitterQuote = curQuote.length < 115 ? curQuote.slice(0,curQuote.length) : (curQuote.slice(0, 115) + ". . .");

                    var formattedQuote = '"' +twitterQuote.split(" ").join("%20") + '"';
                    var formattedAuthor =  curAuthor.split(" ").join("%20") ;

                    return "http://twitter.com/share?text=" + formattedQuote + " - " + formattedAuthor;

                })
            }
        });
    });
});
